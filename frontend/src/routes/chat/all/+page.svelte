<script lang="ts">
	import { supabase } from '$lib/db';
    import { onMount } from 'svelte';
    import { default_message } from '$lib/Stores/stores';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';

    let active_chat: any = '';
    let isVerified = false;

    onMount(() => {
        let userType: string | null = null;

        console.log(localStorage.getItem('uuid'))
        fetch(
            '/chat/all/user_type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem('uuid')
                })
            }
        ).then(res => res.json()).then(data => {
            userType = data.user_type;
            console.log(userType);

            if (userType !== null) {
                isVerified = true;
            } else {
                return;
            }
            
            localStorage.setItem('user_type', userType);
            $default_message = data.default_message;
        });

        supabase.from(`chats:chat_type=eq.${userType}`)
            .on('INSERT', (new_chat) => {
                console.log('new chat', new_chat);
                if (new_chat.new.chat_type === userType) {
                    active_chat = new_chat.new;
                }
            })
            .subscribe();
    });
</script>

{#if isVerified}
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            {#if active_chat}
                <h1 class="text-5xl font-bold" in:fly><a href="/chat/{active_chat.id}">Chat request for {active_chat.chat_type}</a></h1>
                <button class="btn btn-primary" on:click={async () => {
                    goto(`/chat/${active_chat.id}`);
                }}>Chat</button>
            {:else}
                <h1 class="text-5xl font-bold">No chat requests since log in</h1>
            {/if}
        </div>
    </div>
</div>
{:else}
<div>unauthorized</div>
{/if}