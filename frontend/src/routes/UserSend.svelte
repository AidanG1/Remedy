<script lang="ts">
    export let send_user_message: (message: string) => void;

    let message: string = '';
</script>

<div class="border-t-secondary border-t content-center">
    <div class="mt-1 w-full flex justify-center ">
    <input type="text" bind:value={message} placeholder="Type a message..." class="input input-bordered input-primary w-5/6" />
    <button class="btn btn-primary ml-2" on:click={() => {
        send_user_message(message);
        message = '';
    }}>Send</button>
    </div>
</div>