<script lang="ts">
    import { flow, send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';
    import { send_user_message } from '$lib/Utils/utils';

    if ($messages.length == 0) {
        send_flow(0);
    }
</script>

<div class="w-full h-5/6 flex flex-col">
    {#each $messages as message}
    <div class="w-full  my-1">
        <div class="max-w-5/6 h-min w-fit rounded-lg p-2 border border-secondary { (message.sender==='bot' || message.sender === 'person') ? '' : 'float-right'}">
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