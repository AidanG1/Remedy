<script lang="ts">
	import { supabase } from '$lib/db';
    import { onMount } from 'svelte';
    import { default_message } from '$lib/Stores/stores';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';

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
            $default_message = data.default_message;
        });

        supabase.from(`chats:chat_type=eq.${localStorage.getItem('user_type')}`)
            .on('INSERT', (new_chat) => {
                console.log('new chat', new_chat);
                if (new_chat.new.chat_type === localStorage.getItem('user_type')) {
                    active_chat = new_chat.new;
                }
            })
            .subscribe();
    });
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            {#if active_chat}
                <h1 class="text-5xl font-bold" in:fly><a href="/chat/{active_chat.id}">Chat request for {active_chat.chat_type}</a></h1>
                <button class="btn btn-primary" on:click={()=>{goto(`/chat/${active_chat.id}`)}}>Chat</button>
            {:else}
                <h1 class="text-5xl font-bold">No chat requests since log in</h1>
            {/if}
        </div>
    </div>
</div>
