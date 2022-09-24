<script lang="ts">
    import { page } from '$app/stores';
    import { supabase } from '$lib/db';
    import { default_message, messages } from '$lib/Stores/stores';
    import type { Message } from '$lib/Utils/types';
	import type { SupabaseRealtimePayload } from '@supabase/supabase-js';
    import Chat from '../../Chat.svelte'
    import UserSend from '../../UserSend.svelte';

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

    const send_user_message = (message: string) => {
        supabase
            .from('messages')
            .insert([
                {
                    chat: chat,
                    sender: localStorage.getItem('user_type') ? 'person' : 'user',
                    text: message,
                },
            ])
            .then(({ data, error }) => {
                if (error) {
                    console.log(error);
                }
            });
    }
</script>

<Chat />
{#if $default_message}
<button class="btn btn-outline" on:click={()=>{send_user_message($default_message); $default_message=''}}>{$default_message}</button>
{/if}
<UserSend {send_user_message} />