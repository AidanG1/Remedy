export type Button = {
    text: string,
    user_send?: string,
    hyperlink?: string,
    next_step?: number
}

export type Message = {
    sender: 'user' | 'bot',
    text: string,
    timestamp: number,
    buttons: Button[]
}

