import { useEffect, useState } from "react";
import { getUserById } from "@/lib/auth";
import { getOneRestaurant } from "@/lib/restaurant";
import { IoMdSend } from 'react-icons/io';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import { useRef } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { CustomSocketOptions } from '@/types/chat';
import { Socket } from 'socket.io-client';
import ChatMessage from './ChatMessage';
import { FaUserAlt } from "react-icons/fa";

interface Message {
    fromUserId: string;
    message: string;
    timeStamp: string;
}

interface ChatPanelProps {
    setroomid: Function;
    sessionId: string;
    handleSendMessage: (
        sessionId: string,
        message: string,
        socket: Socket
    ) => void;
    socket: Socket | null;
    messageList: Message[] | string[];
    chatData: { imageUrl: string, name: string };
}

export default function ChatPanel({ setroomid, sessionId, handleSendMessage, socket, messageList, chatData  }: ChatPanelProps) {

    const [styleState, setStyleState] = useState(true) 
    const [reservationState] = useState<boolean>(styleState);
    const [message, setMessage] = useState('');
    // TODO: remove this
    const [image, setImage] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const getBackgroundColor = () => {
        switch (reservationState) {
            case false:
                return 'bg-redrice-red';
            case true:
                return 'bg-redrice-green';
            default:
                return 'bg-gray-800';
        }
    };

    const sendMessage = () => {
        if (message == '' || !socket) {
            return;
        }
        setMessage('');
        handleSendMessage(sessionId, message, socket);
        handleMessageSend();
    };

    // punch fix
    // create useState for keep new message
    const [messages, setMessages] = useState([
        { text: 'Hello!', isSender: false },
        { text: 'Hi there!', isSender: true },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleMessageSend = () => {
        console.log('use handle message send');
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, isSender: true }]);
            setNewMessage('');
        }
    };
    //
    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="h-20 w-full border-b border-slate-300 flex p-1 px-3 items-center gap-4 tablet:gap-6">
                <IoIosArrowBack
                    className="text-3xl text-white bg-slate-500 p-1 rounded-full sm:hidden hover:bg-slate-300"
                    onClick={() => setroomid()}
                ></IoIosArrowBack>
                {chatData.imageUrl? (
                    <Image
                    src={chatData.imageUrl }
                    alt="Product Picture"
                    width={60}
                    height={60}
                    className="h-full object-contain rounded-full flex items-center "
                    />
                ) : (
                    <div className="m-5 relative rounded-full bg-stone-200 border-stone-300 border-4 border-black hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                        <FaUserAlt color = "grey"/>
                    </div>
                )}

                <h1 className="text-md sm:text-2xl semi-bold">{chatData.name || 'unknown'}</h1>
                <div
                    className={`w-[10px] h-[10px] rounded-full ${getBackgroundColor()} ${styleState ? 'animate-ping' : ''} `}
                ></div>
                {!styleState ? (
                    <div className="text-md text-slate-500 relative -left-[1%]">
                        จะรีบติดต่อกลับทันที
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* punch fix */}
            <div className="w-full h-[calc(100%-136px)] py-2 px-4 overflow-y-auto">
                {messageList.map((message, index) => (
                    <div
                        key={index}
                    >
                        {typeof message === 'string' ? (
                            <div>{message}</div>
                        ) : (
                            <>
                                <div className="font-bold">
                                    {message.fromUserId}
                                </div>
                                {/* <div>{message.message}</div> */}
                                <ChatMessage
                                    key={index}
                                    message={message.message}
                                    isSender={true}
                                />
                                <div className="text-sm text-gray-500">
                                    {message.timeStamp}
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {/* {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg.text}
                        isSender={msg.isSender}
                    />
                ))} */}
            </div>
            {/*  */}
            <div className="h-10 w-[98%] wborder-slate-300 flex items-center justify-between gap-2 p-1 pr-5 rounded-full bg-slate-100 mr-10 absolute left-[1%] bottom-[2%]">
                <textarea
                    id="textarea"
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setNewMessage(event.target.value);
                    }}
                    placeholder="Write Something"
                    className="w-[90%] h-full text-md text-slate-300 bg-slate-100 rounded-lg outline-none focus:text-black px-6 py-1 resize-none overflow-x-auto self-end"
                />
                {selectedImage && (
                    <div className="mt-2">
                        <Image
                            src={selectedImage}
                            alt="Selected Image Preview"
                            width={30}
                            height={30}
                        />
                        {/* Add buttons or actions for the selected image (optional) */}
                    </div>
                )}
                <div className="w-[10%] flex items-center justify-end gap-2">
                    <IoMdSend className="text-2xl text-redrice-blue hover:text-sky-800" onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
}
