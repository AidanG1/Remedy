interface FlowResponse {
    text: string,
    next?: number,
    page?: string
}

interface FlowStep {
    question: string,
    short: string,
    responses: FlowResponse[]
}

export const flow: Record<number, FlowStep> =
{
    0: {
        'question': 'Do you or anyone you know need immediate medical or psychiatric attention?',
        'short': 'Medical attention',
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
