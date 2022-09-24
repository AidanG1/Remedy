type Button = {
    text: string,
    user_send?: string,
    hyperlink?: string,
}

export type Message = {
    sender: 'user' | 'bot',
    text: string,
    timestamp: number,
    buttons: Button[]
}

