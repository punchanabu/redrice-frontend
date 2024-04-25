'use client'
import { IoMdSend } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { CustomSocketOptions } from "@/types/chat";
import { Socket } from "socket.io-client";

interface ChatPanelProps {
    setroomid: () => void;
    sessionId: string;
    handleSendMessage: (sessionId: string, message: string, socket: Socket) => void;
    socket: Socket | null;
    messageList: Object[]
}
export default function ChatPanel({ setroomid, sessionId, handleSendMessage, socket, messageList }: ChatPanelProps) {

    const [styleState, setStyleState] = useState(true)
    const [reservationState] = useState<boolean>(styleState);
    const [message, setMessage] = useState("");
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
        if (message == "" || !socket) {
            return
        }
        setMessage("")
        handleSendMessage(sessionId, message, socket)
    }



    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="h-20 w-full border-b border-slate-300 flex p-1 px-3 items-center gap-4 tablet:gap-6">
                <IoIosArrowBack className="text-3xl text-white bg-slate-500 p-1 rounded-full sm:hidden hover:bg-slate-300" onClick={() => { setroomid('') }}></IoIosArrowBack>
                <Image
                    src={'/img/user/user1.png'}
                    alt="Product Picture"
                    width={60}
                    height={60}
                    className="h-full object-contain rounded-full flex items-center "
                />


                <h1 className="text-md sm:text-2xl semi-bold">{'Pizza Hutz  1150'}</h1>
                <div className={`w-[10px] h-[10px] rounded-full ${getBackgroundColor()} ${styleState ? 'animate-ping' : ''} `}></div>
                {
                    !styleState ? <div className="text-md text-slate-500 relative -left-[1%]">จะรีบติดต่อกลับทันที</div> : ''
                }
            </div>
            <div className="w-full h-[calc(100%-136px)] py-2 px-4">
                {messageList.map((message, index) => (
                    <div key={index} className="mb-4">
                        <div className="font-bold">{message.fromUserId}</div>
                        <div>{message.message}</div>
                        <div className="text-sm text-gray-500">{message.timeStamp}</div>
                    </div>
                ))}
            </div>
            <div className="h-10 w-[98%] wborder-slate-300 flex items-center justify-between gap-2 p-1 pr-5 rounded-full bg-slate-100 mr-10 absolute left-[1%] bottom-[2%]">
                <textarea id="textarea" value={message} onChange={(event) => { setMessage(event.target.value); }} placeholder="Write Something" className="w-[90%] h-full text-md text-slate-300 bg-slate-100 rounded-lg outline-none focus:text-black px-6 py-1 resize-none overflow-x-auto self-end" />
                {selectedImage && (
                    <div className="mt-2">
                        <Image src={selectedImage} alt="Selected Image Preview" width={30} height={30} />
                        {/* Add buttons or actions for the selected image (optional) */}
                    </div>
                )}
                <div className="w-[10%] flex items-center justify-end gap-2">

                    <div>

                    </div>
                    <IoMdSend className="text-2xl text-redrice-blue hover:text-sky-800" onClick={sendMessage} />
                </div>


            </div>
        </div>
    )
}


