<script lang="ts">
    import Chat from './Chat.svelte'
    import { send_user_message } from '$lib/Utils/utils';
	import UserSend from './UserSend.svelte';
</script>

<Chat />
<UserSend {send_user_message} />