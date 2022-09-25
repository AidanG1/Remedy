<script lang="ts">
    import Chat from './Chat.svelte'
    import { send_user_message } from '$lib/Utils/utils';
	import UserSend from './UserSend.svelte';
    import { send_flow } from '$lib/Flow/flow';
    import { messages } from '$lib/Stores/stores';

    if ($messages.length == 0) {
        send_flow(0);
    }
</script>

<Chat />
<div class="fixed bottom-0 w-full">
    <UserSend {send_user_message} />
</div>