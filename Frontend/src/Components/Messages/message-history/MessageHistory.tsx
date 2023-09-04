import React from "react";
import "./message-history.style.css";

interface Message {
    messageBy: string;
    date: string;
    message: string;
}

interface MessageHistoryProps {
    msg: Message[] | null; // Allow msg to be null
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ msg }) => {
    if (!msg) return null; // Early return if msg is null
    console.log(msg);

    return (
        <>
            {msg.map((row, i) => (
                <div key={i} className="message-history mt-3">
                    <div className="send font-weight-bold text-secondary">
                        <div className="sender">{row.messageBy}</div>
                        <div className="date">{row.date}</div>
                    </div>
                    <div className="message">{row.message}</div>
                </div>
            ))}
        </>
    );
};

export default MessageHistory;
