export interface Message {
    sender: string;
    msgAt: string;
    message: string;
}

export interface Ticket {
    _id: string;
    subject: string;
    status: string;
    openAt: string;
    conversations?: Message[];
}
