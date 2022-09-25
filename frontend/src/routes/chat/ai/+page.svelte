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
            prompt: `In the voice of a therapist: match ${prompt} to one of the options: long-term distress, short-term stress, suicidal ideation, clinical services, wellbeing advising, queer, women`,
            temperature: 0,
            max_tokens: 50,
        });
    }

    const send_user_message = async (message: string) => {
        await getResponse(message);
        console.log(response);
        messages.update((old_messages) => {
            return [...old_messages, {
                sender: 'user',
                text: message,
                timestamp: new Date()
            }, {
                sender: 'bot',
                text: response.data.choices[0].text,
                timestamp: new Date()
            }];
        })
    }

    messages.update((old_messages) => {
            return [...old_messages,{
                sender: 'bot',
                text: 'How are you feeling?',
                timestamp: new Date()
            }];
        })
</script>

<Chat />
<UserSend {send_user_message} />