<script lang="ts">
    import { send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';
    import { send_user_message } from '$lib/Utils/utils';
    import { slide } from 'svelte/transition';

    let chatDiv: HTMLElement;

    const scrollToBottom = (messages: any) => {
        if (chatDiv) {
            window.setTimeout(() => {
                chatDiv.scrollTo({
                    top: chatDiv.scrollHeight,
                    behavior: "smooth"
                });
            }, 500);
        }
    }

    $: {
        scrollToBottom($messages);
    }
</script>

<div class="w-full max-h-[80%] h-[80%] overflow-y-auto flex flex-col px-2" bind:this={chatDiv}>
    {#each $messages as message}
    <div class="w-full my-0.5" in:slide>
        <div class="max-w-5/6 h-min w-fit {
            (message.sender === 'bot') ? 'rounded-sm' : 'rounded-full'} p-2 px-3 border drop-shadow-md {
            (message.sender === 'bot' || message.sender === 'person')
                ? 'bg-base-300'
                : 'bg-primary float-right'}">
            <span class="{ message.sender == 'user' ? 'text-primary-content' : '' }">{message.text}</span>
            {#if 'buttons' in message}
                <div>
                    {#each message.buttons !== undefined ? message.buttons : [] as button}
                        <button class="btn btn-accent m-1" 
                        on:click={() => {
                            if (button.hyperlink !== undefined) {
                                window.open(button.hyperlink, '_blank');
                            } else {      
                                if (button.user_send !== undefined) {
                                    send_user_message(button.user_send);
                                } 
                                if (button.next !== undefined) {
                                    send_flow(button.next);
                                }
                            }
                        }}>
                        {button.text}
                        {#if button.hyperlink}
                            <img src="/link.svg" class="ml-2 w-6" alt="link icon">
                        {/if}
                    </button>
                    {/each}
                </div>
            {/if}
        </div></div>
    {/each}
</div>
