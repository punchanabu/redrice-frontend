'use client'
import ListRestaurant from "@/components/chat/ListRestaurant"
import ChatPanel from "@/components/chat/ChatPanel"
import { useState } from "react"
export default function Chat(){
    const [roomid,setroomid]=useState('')
    
    return (
        
        <main className="w-full h-[calc(100%-96px)] flex">
            <div className={`sm:w-1/3 h-[100%] sm:border-t sm:border-r border-slate-300 pt-5 w-[100%] ${roomid!==''?'hidden sm:inline-block':'sm:inline-block'}`}>
                <ListRestaurant  setroomid={setroomid}></ListRestaurant>
            </div>
            <div className={`sm:w-2/3 h-[100%] sm:border-t border-slate-300 ${roomid!==''?'inline-block ':'hidden sm:hidden'} `}>
                <ChatPanel setroomid={setroomid}></ChatPanel>
            </div>
        </main>
)
}