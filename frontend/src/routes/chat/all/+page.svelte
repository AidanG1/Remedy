<script lang="ts">
	import { supabase } from '$lib/db';
    import { onMount } from 'svelte';

    let active_chat: string = '';

    onMount(() => {
        fetch(
            'chat/all/user_type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_type: localStorage.getItem('id')
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

<h1>Chat request for {active_chat.chat_type}</h1>