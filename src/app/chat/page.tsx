'use client'
import ListRestaurant from "@/components/chat/ListRestaurant"
import ChatPanel from "@/components/chat/ChatPanel"
import { useState,useEffect } from "react"
import io from 'socket.io-client';
import { useSession } from "next-auth/react";
import { getUserById } from "@/lib/auth";
import { getOneRestaurant } from "@/lib/restaurant";
import { CustomSocketOptions } from "@/types/chat";
import { sessionRoom } from "@/types/chat";
import { Socket } from "socket.io-client";
export default function Chat() {    
    
    // State 
    // Room ID we are currently in
    const [roomID, setRoomID] = useState<string>("");
    // Room that we are currently in 
    const [selectedRoom, setSelectedRoom] = useState<sessionRoom | null>(null);
    // List of rooms
    const [RoomList, setRoomList] = useState<sessionRoom[]>([]);
    
    // Socket Connection
    const [socket, setSocket] = useState<Socket| null>(null);

    // Message List
    const [messageList, setMessageList] = useState<string[]>([])

    const { data: session } = useSession();
    const token = session?.user.token;
    const role = session?.user.role;
    

    const handleRoomChange = (roomid: string) => {
        setRoomID(roomid);
    };

    const handleRoomList = (roomList: sessionRoom[]) => {
        setRoomList(roomList);
    };

    const handleSocket = (socket: Socket) => {
        setSocket(socket);
        console.log('Connect to the socket');
    }

    const handleConnection = () => {
        console.log('Connecting to socket successfully!');
    }

    const handleSession = (roomList: any) => {
        console.log(roomList);
        setRoomList(roomList)
    } 
    
    const handleReceiveMessage = (message: any) => {
        console.log('Received message:', message);
        const newMessageList = messageList;
        newMessageList.push(message);
        setMessageList(newMessageList)
    }   

    const handleDisconnect = () => {
        console.log("Disconnected from socket");
    }

    const handleError = (error: unknown) => {
        console.log("error:", error)
    }

    const handleGetRestaurant = async (id: string) => {
        if (!token) return
        const data = await getOneRestaurant(id, token)
        return data;
    }

    const handleJoin = (sessionId: string, socket: Socket) => {
        console.log(sessionId);
        socket.emit("join chat", sessionId);
        setMessageList([])
    }

    const handleSendMessage = (sessionId: string, message: string, socket: Socket) => {
        
        const messageRequest = {
            sessionId: sessionId,
            message: message
        }

        socket.emit("send message", messageRequest)
        console.log(message);
    }

    useEffect(() => {
        if (!socket) {
            const socket = io('https://redrice-chat.onrender.com', {
                transports: ["websocket"],
                auth: {
                    token: token,
                },
            });
            handleSocket(socket);
        }

        if (!socket) return;

        socket.on('connect', handleConnection);
        socket.on('session', handleSession);
        socket.on('receive message', handleReceiveMessage)
        socket.on('error', handleError)
        socket.emit('get my session', handleReceiveMessage);
        socket.on('disconnect', handleDisconnect)
    }, [socket]);
     

    
    return (
        
        <main className="w-full h-[calc(100%-96px)] flex">
            <div className={`sm:w-1/3 h-[100%] sm:border-t sm:border-r border-slate-300 pt-5 w-[100%] ${roomID!==''?'hidden sm:inline-block':'sm:inline-block'}`}>
                <ListRestaurant  setroomid={setRoomID} data = {RoomList} handleJoin ={handleJoin} socket={socket} setMessageList = {setMessageList}></ListRestaurant>
            </div>
            <div className={`sm:w-2/3 h-[100%] sm:border-t border-slate-300 w-[100%] ${roomID!==''?'inline-block ':'hidden sm:hidden'} `}>
                <ChatPanel setroomid={setRoomID} sessionId= {roomID} handleSendMessage={handleSendMessage} socket={socket} messageList = {messageList}></ChatPanel>
            </div>
        </main>
  )
}