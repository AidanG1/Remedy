<script lang="ts">
    import { encode, decode } from 'uint8-to-b64';
    import { page } from '$app/stores';
    import { supabase } from '$lib/db';
    import { default_message, messages } from '$lib/Stores/stores';
    import type { Message } from '$lib/Utils/types';
    import { createEcdhKey, exportKey, decryptMessage, encryptMessage, deriveSharedKey } from '$lib/Utils/crypto';
	import type { SupabaseRealtimePayload } from '@supabase/supabase-js';
    import Chat from '../../Chat.svelte'
    import UserSend from '../../UserSend.svelte';
	import Jitsi from './Jitsi.svelte';
	import { onMount } from 'svelte';

    const chat = $page.params.slug;

    let sent_messages: Message[] = [];
    let sharedKey: string | null | undefined;
    let sharedKeyUnencoded: CryptoKey;

    type supabaseChat = {
        id: string,
        text: string,
        ciphertext: string,
        iv: string,
        message: string,
        sender: string,
        created_at: string
    }

    let didError = false;

    const decrypt = async (message: supabaseChat) => {
        const plaintextBytes = await decryptMessage(
            sharedKeyUnencoded,
            decode(message.ciphertext),
            decode(message.iv),
        );
        return new TextDecoder().decode(plaintextBytes);
    };

    onMount(async () => {
        const id = localStorage.getItem('uuid') ?? 'unknown';
        let keypair: CryptoKeyPair;
        let publicKeyUnencoded: CryptoKey, privateKeyUnencoded: CryptoKey;
        let public_key = localStorage.getItem('public_key');
        let private_key = localStorage.getItem('private_key');
        if (public_key === null || private_key === null) {
            keypair = await createEcdhKey();
            publicKeyUnencoded = keypair.publicKey;
            privateKeyUnencoded = keypair.privateKey;

            public_key = encode(await exportKey(keypair.publicKey));
            private_key = JSON.stringify(
                (await window.crypto.subtle.exportKey('jwk', keypair.privateKey))
            );
            localStorage.setItem('public_key', public_key);
            localStorage.setItem('private_key', private_key);
        } else {
            publicKeyUnencoded = await window.crypto.subtle.importKey(
                'raw', decode(public_key),
                { name: 'ECDH', namedCurve: 'P-384'},
                true, ['deriveKey']
            );
            privateKeyUnencoded = await window.crypto.subtle.importKey(
                'jwk', JSON.parse(private_key),
                { name: 'ECDH', namedCurve: 'P-384'},
                true, ['deriveKey']
            );
        }

        let { data, error } = await supabase
            .from('chats')
            .select('member_one, member_two')
            .eq('id', chat)
            .single();
        if (error) {
            console.log(error);
            return;
        }

        const userInChat = [data.member_one, data.member_two].includes(id);
        if (!userInChat) {
            const res = await fetch(`/chat/${chat}/join`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    chat,
                    uuid: id,
                    public_key: public_key,
                }),
            });
            data = await res.json();
            if (data.error !== undefined) {
                didError = true;
                return;
            }
        }

        const deriveAndSetSharedKey = async (data: any) => {
            if (data.members !== 2) {
                return;
            }
            const publicKeys = new Set([
                data.member_one_pubkey,
                data.member_two_pubkey,
            ]);
            publicKeys.delete(public_key);
            const theirPublickey = Array.from(publicKeys.values())[0];
            sharedKeyUnencoded = await deriveSharedKey(
                privateKeyUnencoded,
                await window.crypto.subtle.importKey(
                    'raw',
                    decode(theirPublickey),
                    { name: 'ECDH', namedCurve: 'P-384' },
                    true,
                    ['deriveKey'],
                ),
            );
            sharedKey = encode(await exportKey(sharedKeyUnencoded))
            localStorage.setItem('shared_key', sharedKey);
        };

        sharedKey = localStorage.getItem('shared_key');
        if (sharedKey === null) {
            const res = await supabase
                .from('chats')
                .select('members, member_one_pubkey, member_two_pubkey')
                .eq('id', chat)
                .single();
            if (res.data.members < 2) {
                supabase
                    .from('chats')
                    .on('UPDATE', (payload) => deriveAndSetSharedKey(payload.new))
                    .subscribe();
            } else {
                await deriveAndSetSharedKey(res.data);
            }
        } else {
            sharedKeyUnencoded = await window.crypto.subtle.importKey(
                'raw', decode(sharedKey),
                { name: 'AES-GCM', length: 256 },
                true,
                ['encrypt', 'decrypt'],
            );
        }
    
        supabase
            .from('messages')
            .select('*')
            .eq('chat', chat)
            .then(async ({ data, error }) => {
                // behold this unholy combination of thens and awaits
                if (error) {
                    console.log(error);
                } else {
                    sent_messages = await Promise.all(
                        data.map(async (message: supabaseChat) => {
                            return {
                                sender: message.sender,
                                text: await decrypt(message),
                                timestamp: new Date(message.created_at),
                            };
                        })
                    );
                    $messages = [...$messages, ...sent_messages];
                }
            });
    
        supabase.from(`messages:chat=eq.${chat}`)
            .on('INSERT', async (new_message: SupabaseRealtimePayload<supabaseChat>) => {
                console.log(new_message);
                $messages = [
                    ...$messages,
                    {
                        sender: new_message.new.sender,
                        text: await decrypt(new_message.new),
                        timestamp: new Date(new_message.new.created_at),
                    },
                ];
                }
            )
            .subscribe();
    });

    const send_user_message = async (message: string) => {
        if (sharedKey === undefined || sharedKey === null) {
            throw new Error('no shared key yet');
        }

        const messageBytes = new TextEncoder().encode(message);
        const [ciphertext, iv] = await encryptMessage(sharedKeyUnencoded, messageBytes);
        const ciphertextEncoded = encode(ciphertext);
        const ivEncoded = encode(iv);

        const id = localStorage.getItem('uuid') ?? 'unknown';

        fetch(`/chat/${chat}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat: chat,
                uuid: id,
                ciphertext: ciphertextEncoded,
                iv: ivEncoded,
            })
        });
    }

    let meeting: boolean = false;
</script>

{#if !didError}
<div class="flex justify-center">
    <h1 class="mr-2">You are chatting with a verified user</h1>
    <button on:click={() => {meeting = true; send_user_message('Joining the encrypted meeting!')}} class="btn btn-primary">Start encrypted voice or video call</button>
</div>
{#if meeting}
<div class="flex justify-center mt-2 absolute top-4 right-4">
    <Jitsi chat_id={chat} />
</div>
{/if}
<Chat />
{#if $default_message}
<button class="btn btn-outline" on:click={()=>{send_user_message($default_message); $default_message=''}}>{$default_message}</button>
{/if}
<UserSend {send_user_message} />
{:else}
<div>something went wrong</div>
{/if}