'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Message {
    fromUserId: string;
    message: string;
    timeStamp: string;
}

const ChatMessage = ({
    message,
    isSender,
    timeStamp,
}: {
    message: string;
    isSender: boolean;
    timeStamp: string;
}) => {
    const [show, setshow] = useState(false);

    return (
        <div
            className={`flex  ${isSender ? 'justify-end ' : 'justify-start'} mb-2 relative items-center`}
        >
            <div
                className={`tablet:max-w-1/2 max-w-[70%] rounded-xl px-4 py-2 flex ${isSender ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                onMouseOver={() => {
                    setshow(false);
                }}
                onMouseOut={() => {
                    setshow(false);
                }}
                onMouseLeave={() => {
                    setshow(true);
                }}
            >
                <div
                    className={`  ${isSender ? ' text-white ' : ' text-gray-800 '} cursor-default`}
                >
                    {message}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;