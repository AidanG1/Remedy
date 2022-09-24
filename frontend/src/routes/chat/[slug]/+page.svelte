<script lang="ts">
    import { encode, decode } from 'uint8-to-b64';
    import { page } from '$app/stores';
    import { supabase } from '$lib/db';
    import { default_message, messages } from '$lib/Stores/stores';
    import type { Message } from '$lib/Utils/types';
    import { decryptMessage, encryptMessage } from '$lib/Utils/crypto';
	import type { SupabaseRealtimePayload } from '@supabase/supabase-js';
    import Chat from '../../Chat.svelte'
    import UserSend from '../../UserSend.svelte';
	import Jisti from './Jisti.svelte';

    const chat = $page.params.slug;

    let sent_messages: Message[] = [];

    type supabaseChat = {
        id: string,
        text: string,
        message: string,
        sender: string,
        created_at: string
    }

    supabase
        .from('messages')
        .select('*')
        .eq('chat', chat)
        .then(({ data, error }) => {
            if (error) {
                console.log(error);
            } else {
                sent_messages = data.map((message: supabaseChat) => {
                    return {
                        sender: message.sender,
                        text: message.text,
                        timestamp: new Date(message.created_at),
                    };
                });
                $messages = [...$messages, ...sent_messages];
            }
        });

    supabase.from(`messages:chat=eq.${chat}`)
        .on('INSERT', (new_message: SupabaseRealtimePayload<supabaseChat>) => {
            console.log(new_message);
            $messages = [
                ...$messages,
                {
                    sender: new_message.new.sender,
                    text: new_message.new.text,
                    timestamp: new Date(new_message.new.created_at),
                },
            ];
            }
        )
        .subscribe();

    const send_user_message = async (message: string) => {
        // We're creating a key here just to make sure that we our
        // encyrption and decryption work fine.
        // Later, the key will be derived through ECDH.
        const sharedKey = await window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt'],
        );
        const messageBytes = new TextEncoder().encode(message);
        const [ciphertext, iv] = await encryptMessage(sharedKey, messageBytes);
        const ciphertextEncoded = encode(ciphertext);
        const ivEncoded = encode(iv);

        console.log(ciphertext, iv);
        console.log(ciphertextEncoded, ivEncoded);
        
        const ciphertextDecoded = decode(ciphertextEncoded);
        const ivDecoded = decode(ivEncoded);
        const decryptedMessage = await decryptMessage(sharedKey, ciphertextDecoded, ivDecoded);
        
        console.log('decrypted', new TextDecoder().decode(decryptedMessage));

        const id = localStorage.getItem('uuid') ?? 'unknown';

        fetch(`/chat/${chat}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat: chat,
                uuid: id,
                text: message,
            })
        });
    }

    let meeting: boolean = false;
</script>

<div class="flex justify-center">
    <h1 class="mr-2">You are chatting with a verified user</h1>
    <button on:click={() => {meeting = true; send_user_message('Joining the encrypted meeting!')}} class="btn btn-primary">Start encrypted voice or video call</button>
</div>
{#if meeting}
<div class="flex justify-center mt-2 absolute top-4 right-4">
    <Jisti chat_id={chat} />
</div>
{/if}
<Chat />
{#if $default_message}
<button class="btn btn-outline" on:click={()=>{send_user_message($default_message); $default_message=''}}>{$default_message}</button>
{/if}
<UserSend {send_user_message} />