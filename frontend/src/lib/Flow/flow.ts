import type { Button } from "$lib/Utils/types";
import { messages } from "$lib/Stores/stores";

type FlowStep = {
    text: string,
    buttons: Button[]
}

export const flow: Record<number, FlowStep> =
{
    0: {
        'text': 'Do you or anyone you know need immediate medical or psychiatric attention?',
        'buttons': [
            {
                'text': 'Yes',
                'hyperlink': 'tel:988'
            },
            {
                'text': 'No',
                'user_send': 'No',
                'next_step': 1
            }
        ]
    },
}

export const send_flow = (step: number) => {
    messages.update((messages) => {
        messages.push({
            'sender': 'bot',
            'text': flow[step].text,
            'timestamp': Date.now(),
            'buttons': flow[step].buttons
        })
        return messages
    })
}
