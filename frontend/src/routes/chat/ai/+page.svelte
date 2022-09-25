<script lang="ts">
    import Chat from "../../Chat.svelte";
    import UserSend from "../../UserSend.svelte";
    import { messages } from "$lib/Stores/stores";
    import { Configuration, OpenAIApi } from "openai";
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let response: any = '';

    async function getResponse(prompt: string) {
        response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Give brief mental health advice to: ${prompt}`,
            temperature: 1,
            max_tokens: 50,
        });
    }

    const send_user_message = async (message: string) => {
        console.log(response);

        messages.update((old_messages) => {
            return [...old_messages, {
                sender: 'user',
                text: message,
                timestamp: new Date()
            }];
        })

        await getResponse(message);

        messages.update((old_messages) => {
            return [...old_messages, {
                sender: 'bot',
                text: response.data.choices[0].text + " ...",
                timestamp: new Date()
            }];
        })
    }
</script>

<Chat />
<UserSend {send_user_message} />
