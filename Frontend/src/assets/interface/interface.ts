interface HistoryItem {
    date: string;
    message: string;
    messageBy: string; // Assuming it can only be one of these two values
}

export interface Ticket {
    id: number;
    subject: string;
    status: string;
    addedAt: string;
    history?: HistoryItem[];
}
