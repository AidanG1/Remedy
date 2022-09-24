<script lang="ts">
	import { supabase } from '$lib/db';
    import { onMount } from 'svelte';

    let active_chat: any = '';

    onMount(() => {
        fetch(
            '/chat/all/user_type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem('id')
                })
            }
        ).then(res => res.json()).then(data => {
            localStorage.setItem('user_type', data.user_type);
        });

        supabase.from(`chats:chat_type=eq.${localStorage.getItem('user_type')}`)
            .on('INSERT', (new_chat) => {
                console.log(new_chat);
                if (new_chat.new.chat_type === localStorage.getItem('user_type')) {
                    active_chat = new_chat.new;
                }
            })
            .subscribe();
    });
</script>

{#if active_chat}
<h1><a href="/chat/{active_chat.id}">Chat request for {active_chat.chat_type}</a></h1>
{:else}
<h1>No chat requests since log in</h1>
{/if}