import { messages } from "$lib/Stores/stores";

export const send_user_message = (message: string) => {
    messages.update((old_messages) => {
        return [...old_messages, {
            sender: 'user',
            text: message,
            timestamp: new Date()
        }]
    })
}