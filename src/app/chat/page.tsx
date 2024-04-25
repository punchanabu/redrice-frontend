'use client'
import ListRestaurant from "@/components/chat/ListRestaurant"
import ChatPanel from "@/components/chat/ChatPanel"
import { useState,useEffect } from "react"
import io, { ManagerOptions, SocketOptions } from 'socket.io-client';
import { useSession } from "next-auth/react";
import { getUserById } from "@/lib/auth";
import { getOneRestaurant } from "@/lib/restaurant";
import { list } from "postcss";
interface CustomSocketOptions extends ManagerOptions, SocketOptions {

    auth: {
        token:string,
      },
}

interface ListData {
    roomid: string;
    name: string;
    imageUrl: string;
    msg: string;
    time: string;
  }

export default function Chat(){
    const [roomid,setroomid]=useState('')
    const [SessionOfSocket, setSessionOfSocket] = useState<{sessionId: string, userId?: number,restaurantId?:number}[]>([]);
    
    const { data: session } = useSession();
    const token = session?.user.token;
    const role =session?.user.role
    const [listdata, setListdata] = useState<ListData[]>([]);
    console.log('role : ',role);
    useEffect(() => {
      let isConnected = false;
        console.log('test token : ',token);
        const socket = io('https://redrice-chat.onrender.com', {
        transports: ["websocket"],
        auth: {
            token:token,
          },
      } as unknown as CustomSocketOptions);
      const connectSocket = () => {
        // Connect only if not already connected
        if (!isConnected) {
            socket.connect();
        }
    };
  
      socket.on('connect', () => {
        console.log('Connected to the server');
        socket.emit('get my session',(res: any)=>{});
       
        socket.on('session', async (session:{sessionId: string, userId?: number,restaurantId?:number}[]) => {
            // Loop through sessions for sequential data fetching

           
            setSessionOfSocket(session);
            console.log('abc :', session);
          });
            const sessionId = SessionOfSocket[0]?.sessionId;
            socket.emit('join chat', sessionId);
            socket.on('error', (error) => {
            console.error('Error occurred:', error);
            });
            
            
      
      });
      connectSocket();

    });
    useEffect(() => {
        const fetchData = async () => {
        const newListData: ListData[] = [];
          for (const { sessionId, userId, restaurantId } of SessionOfSocket) {
            try {
            console.log('id : ',restaurantId,userId,token,role)
              if (userId && token) {
                const fetchRestaurant = await getUserById(token, userId.toString());
                console.log('test data user', fetchRestaurant);
                newListData.push({
                  roomid: sessionId,
                  name: fetchRestaurant['name'],
                  imageUrl: fetchRestaurant['imageUrl'],
                  msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
                  time: '12:30 AM'
                });
              } else if ( restaurantId && token) {
                const fetchRestaurant = await getOneRestaurant(restaurantId.toString(), token);
                console.log('test data user', fetchRestaurant);
                newListData.push({
                    roomid: sessionId,
                    name: fetchRestaurant['name'],
                    imageUrl: fetchRestaurant['imageUrl'],
                    msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
                    time: '12:30 AM'
                  });
              }
            } catch (error) {
              console.error('Error fetching restaurant data:', error);
            }
          }
          setListdata(newListData);
        };
    
        fetchData();
      }, [SessionOfSocket, session?.user.role, session?.user.token]);
     

    

    console.log('abc2 :',SessionOfSocket);
    console.log('test listdata : ',listdata )
    
    return (
        
        <main className="w-full h-[calc(100%-96px)] flex">
            <div className={`sm:w-1/3 h-[100%] sm:border-t sm:border-r border-slate-300 pt-5 w-[100%] ${roomid!==''?'hidden sm:inline-block':'sm:inline-block'}`}>
                <ListRestaurant  setroomid={setroomid} data={listdata} ></ListRestaurant>
            </div>
            <div className={`sm:w-2/3 h-[100%] sm:border-t border-slate-300 ${roomid!==''?'inline-block ':'hidden sm:hidden'} `}>
                <ChatPanel setroomid={setroomid}></ChatPanel>
            </div>
        </main>
)
}