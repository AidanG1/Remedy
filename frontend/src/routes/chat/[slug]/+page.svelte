<script lang="ts">
    import { page } from '$app/stores';
    import { supabase } from '$lib/db';
    import { messages } from '$lib/Stores/stores';
    import type { Message } from '$lib/Utils/types';
    import Chat from '../../Chat.svelte'
    import UserSend from '../../UserSend.svelte';

    const chat = $page.params.slug;

    let message: string = '';

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

    supabase.from('messages').on('INSERT', (new_chat: supabaseChat) => {
        $messages = [
            ...$messages,
            {
                sender: new_chat.sender,
                text: new_chat.text,
                timestamp: new Date(new_chat.created_at),
            },
        ];
        }
    ).subscribe();

    const send_user_message = (message: string) => {
        supabase
            .from('messages')
            .insert([
                {
                    chat: chat,
                    sender: 'person',
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
<UserSend {send_user_message} />