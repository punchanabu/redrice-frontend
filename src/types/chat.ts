import { ManagerOptions, SocketOptions } from "socket.io-client";

interface CustomSocketOptions extends ManagerOptions, SocketOptions {
    auth: { 
        token:string
    }
}

interface sessionRoom {
    sessionId: string;
    userId?: number;
    restaurantId?: number;
    name?: string;
}

interface ListData {
    roomid: string;
    name: string;
    imageUrl: string;
    msg: string;
    time: string;
}


export type { CustomSocketOptions, sessionRoom, ListData }