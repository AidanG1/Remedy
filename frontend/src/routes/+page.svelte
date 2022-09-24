<script lang="ts">
    import { flow, send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';

    if ($messages.length == 0) {
        send_flow(0);
    }

    const send_user_message = (message: string) => {
        $messages = [...$messages, { sender: 'user', text: message, timestamp: new Date() }];
    }

    let message: string = '';
</script>

<div class="w-full h-5/6 flex flex-col">
    {#each $messages as message}
    <div class="w-full  my-1">
        <div class="max-w-5/6 h-min w-fit rounded-lg p-2 border border-secondary {message.sender==='bot' ? '' : 'float-right'}">
            {message.text}
            {#if 'buttons' in message}
                <div>
                    {#each message.buttons !== undefined ? message.buttons : [] as button}
                        <button class="btn btn-primary m-1" 
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
<div>
    <input type="text" bind:value={message} placeholder="Type a message..." class="input input-bordered input-primary w-5/6" />
    <button class="btn btn-primary " on:click={() => {
        send_user_message(message);
        message = '';
    }}>Send</button>
</div>