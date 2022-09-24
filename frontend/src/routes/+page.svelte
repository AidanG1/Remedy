<script lang="ts">
    import { flow, send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';

    if ($messages.length == 0) {
        send_flow(0);
    }

    const send_user_message = (message: string) => {
        $messages = [...$messages, { sender: 'user', text: message, timestamp: new Date() }];
    }
</script>

<div class="grid w-full">
    {#each $messages as message}
        <div class="max-w-8/12 w-full rounded-lg p-2 border border-secondary {message.sender==='bot' ? 'flex' : 'flex-row-reverse'}">
            {message.text}
            {#if 'buttons' in message}
                <div>
                    {#each message.buttons !== undefined ? message.buttons : [] as button}
                        <button class="btn btn-primary m-1" 
                        on:click={() => {
                            if (button.hyperlink !== undefined) {
                                window.open(button.hyperlink, '_blank');
                            } else {       
                                if (button.next !== undefined) {
                                    send_flow(button.next);
                                }
                                if (button.user_send !== undefined) {
                                    send_user_message(button.user_send);
                                }
                            }
                        }}>
                        {button.text}
                    </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
</div>
