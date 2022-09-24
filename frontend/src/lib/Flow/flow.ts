interface FlowResponse {
    text: string,
    next: number
}

interface FlowStep {
    question: string,
    responses: [FlowResponse]
}

export const flow: Record<number, FlowStep> =
{
    0: {
        'question': 'Do you or anyone you know need immediate medical or psychiatric attention?',
        'responses': [
            {
                'text': 'Yes',
                'next': 2
            },
            {
                'text': 'No',
                'next': 3
            }
        ]
    },
}
