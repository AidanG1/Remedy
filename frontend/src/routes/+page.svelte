<script lang="ts">
    import Chat from './Chat.svelte'
    import { send_user_message } from '$lib/Utils/utils';

    let message: string = '';
</script>

<Chat />
<div>
    <input type="text" bind:value={message} placeholder="Type a message..." class="input input-bordered input-primary w-5/6" />
    <button class="btn btn-primary " on:click={() => {
        send_user_message(message);
        message = '';
    }}>Send</button>
</div>