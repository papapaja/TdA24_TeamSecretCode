export type ProfileData = {
    id: string,
    name: string,
    picture: string,
    email: string
}

export type ChannelData = {
    id: string,
    name: string,
    messages: MessageData[]
}

export type MessageData = {
    id: string,
    content: string,
    createdAt: string,
    edited: boolean,
    sender: SenderData
}

export type SenderData = {
    id: string,
    name: string,
    picture: string
}