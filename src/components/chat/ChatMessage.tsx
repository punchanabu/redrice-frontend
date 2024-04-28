'use client';
import React from 'react';

const ChatMessage = ({
    message,
    isSender,
}: {
    message: string;
    isSender: boolean;
}) => {
    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs mx-2 my-1 px-2 rounded-2xl ${isSender ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
            >
                <p className="p-2">{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;