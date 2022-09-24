<script lang="ts">
    import { flow, send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';

    if ($messages.length == 0) {
        send_flow(0);
    }
</script>

<div class="grid w-full">
    {#each $messages as message}
        {#if message.sender === 'bot'}
        <div class="flex w-8/12 rounded">
            {message.text}
        </div>
        {:else}
        <div class="flex-row-reverse w-8/12 rounded">
            {message.text}
        </div>
        {/if}
    {/each}
</div>
