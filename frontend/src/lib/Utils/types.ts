export type Button = {
    text: string,
    user_send?: string,
    hyperlink?: string,
    next?: number
}

export type Message = {
    sender: 'user' | 'bot',
    text: string,
    timestamp: Date,
    buttons?: Button[]
}

