'use client';
import ListRestaurant from '@/components/chat/ListRestaurant';
import ChatPanel from '@/components/chat/ChatPanel';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { getUserById } from '@/lib/auth';
import { getOneRestaurant } from '@/lib/restaurant';
import { CustomSocketOptions } from '@/types/chat';
import { sessionRoom } from '@/types/chat';
import { Socket } from 'socket.io-client';
import { getme } from '@/lib/auth';



import dayjs from 'dayjs';

interface Message {
    id: string;
    msg: string;
    senderId: string;
    createdAt: string;
    updatedAt: string;
}

interface Noti {
    fromUserId: string;
    message: string;
    timeStamp: number;
}


export default function Chat() {
    const [chatData, setChatData] = useState<{
        imageUrl: string;
        name: string;
    }>({ imageUrl: '', name: '' });

    const handleRoomSelected = (restaurantData: {
        imageUrl: string;
        name: string;
    }) => {
        setChatData(restaurantData);
    };

    // State
    // Room ID we are currently in
    const [roomID, setRoomID] = useState<string>('');
    // Room that we are currently in
    const [selectedRoom, setSelectedRoom] = useState<sessionRoom | null>(null);
    // List of rooms
    const [RoomList, setRoomList] = useState<sessionRoom[]>([]);

    // Socket Connection
    const [socket, setSocket] = useState<Socket | null>(null);

    // Message List
    const [messageList, setMessageList] = useState<string[]>([]);

  
  const [historyMessage, setHistoryMessage] = useState<any[]>([]);

    const { data: session } = useSession();
    const token = session?.user.token;
    const role = session?.user.role;

    const [userId, setuserId] = useState('');
    const [readyChat, setreadyChat] = useState(false);

    console.log('user id : ', userId);
    useEffect(() => {
        const fetchUsers = async () => {
            if (token) {
                const user = await getme(token);
                setuserId(user.ID);
                console.log('test id from user : ', user);
            }
        };
        fetchUsers();
    }, []);

    const handleGetHistory = async (sessionId: string, socket: Socket) => {
        socket.emit('chat history', sessionId);
    };

    const handleReceiveHistory = (history: any) => {
        console.log(history);
        setHistoryMessage(history);
    };
    const handleNotification = (message: string) => {
        console.log('receive notification', message);
    };

    const handleRoomChange = (roomid: string) => {
        setRoomID(roomid);
    };

    const handleRoomList = (roomList: sessionRoom[]) => {
        setRoomList(roomList);
    };

    const handleSocket = (socket: Socket) => {
        setSocket(socket);
        console.log('Connect to the socket');
    };

    const handleConnection = () => {
        console.log('Connecting to socket successfully!');
        setreadyChat(true);
    };

    const handleSession = (roomList: any) => {
        console.log(roomList);
        setRoomList(roomList);
    };

    const handleReceiveMessage = (message: any) => {
        console.log('Received message:', message);
        const newMessageList = messageList;
        newMessageList.push(message);
        setMessageList(newMessageList);
      const newMessage = {
            id: '',
            msg: message.message as string,
            senderId: message.fromUserId as string,
            createdAt: dayjs(new Date(message.timeStamp)).format(
                'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
            ),
            updatedAt: dayjs(new Date(message.timeStamp)).format(
                'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
            ),
        };
            setHistoryMessage((prevHistory) => [...prevHistory, newMessage]);
    };


    const handleDisconnect = () => {
        console.log('Disconnected from socket');
        setreadyChat(false);
    };

    const handleError = (error: unknown) => {
        console.log('error:', error);
    };

    const handleGetRestaurant = async (id: string) => {
        if (!token) return;
        const data = await getOneRestaurant(id, token);
        return data;
    };

    const handleJoin = (sessionId: string, socket: Socket) => {
        console.log(sessionId);
        socket.emit('join chat', sessionId);
        handleGetHistory(sessionId, socket);
        setMessageList([]);
    };

    const handleSendMessage = (
        sessionId: string,
        message: string,
        socket: Socket
    ) => {
        const messageRequest = {
            sessionId: sessionId,
            message: message,
        };

        socket.emit('send message', messageRequest);

        console.log(message);
    };

    useEffect(() => {
        // let socket;

        if (!socket) {
            if (process.env.NEXT_PUBLIC_SOCKET_URL) {
                const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
                    transports: ['websocket'],
                    auth: {
                        token: token,
                    },
                });
                handleSocket(socket);
            } else {
                console.error(
                    'SOCKET_URL environment variable is not defined.'
                );
            }
        }

        if (!socket) return;

        socket.on('connect', handleConnection);
        socket.on('session', handleSession);
        socket.on('receive message', handleReceiveMessage);
        socket.on('chat history', handleReceiveHistory);
        socket.on('error', handleError);
        socket.on('notification', handleNotification);
      socket.emit('get my session');


        socket.on('disconnect', handleDisconnect);
    }, [socket]);

    return (
        <main className="w-full h-[calc(100%-96px)] flex">
            <div
                className={`sm:w-1/3 h-[100%] sm:border-t sm:border-r border-slate-300 pt-5 w-[100%] ${roomID !== '' ? 'hidden sm:inline-block' : 'sm:inline-block'}`}
            >
                <ListRestaurant
                    setroomid={setRoomID}
                    data={RoomList}
                    handleJoin={handleJoin}
                    socket={socket}
                    setMessageList={setMessageList}
                    readyChat={readyChat}
                    onRoomSelected={handleRoomSelected}
                ></ListRestaurant>
            </div>
            <div
                className={`sm:w-2/3 h-[100%] sm:border-t border-slate-300 w-[100%] ${roomID !== '' ? 'inline-block ' : 'hidden sm:hidden'} `}
            >
                <ChatPanel
                    setroomid={setRoomID}
                    sessionId={roomID}
                    handleSendMessage={handleSendMessage}
                    socket={socket}
                    messageList={messageList}
                    chatData={chatData}
                    handleGetHistory={handleGetHistory}
                    historyMessage={historyMessage}
                    userId={userId}
                    readyChat={readyChat}
                ></ChatPanel>
            </div>
        </main>
    );
}
