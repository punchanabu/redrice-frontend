'use client'
import { FaImage } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";


export default function ChatPanel(){
    const state=true
    const [reservationState] = useState<boolean>(state);
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
    return(
        <div className="w-full h-full flex flex-col relative">
            <div className="h-20 w-full border-b border-slate-300 flex p-1 px-3 items-center gap-6">
            <Image
            src={ '/img/user/user1.png'}
            alt="Product Picture"
            width={60}
            height={60}
            className="h-full object-contain rounded-full flex items-center "
                /> 
            <h1 className="text-2xl semi-bold">{'Pizza Hutz  1150'}</h1>   
            <div className={`w-[10px] h-[10px] rounded-full ${getBackgroundColor()} ${state? 'animate-ping':''} `}></div>                           
            </div>
            <div className="w-full h-[calc(100%-136px)] py-2 px-4">
                <div className="w-full h-full overflow-x-auto flex flex-col items-center gap-3">
                    <h1 className="text-md text-slate-300">9 Apr 2024</h1>
                    <div className="w-full  flex gap-2 justify-start">
                        <Image
                        src={ '/img/user/user1.png'}
                        alt="Product Picture"
                        width={35}
                        height={35}
                        className="object-contain rounded-full  "
                        /> 
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-end">
                        
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-start">
                        <Image
                        src={ '/img/user/user1.png'}
                        alt="Product Picture"
                        width={35}
                        height={35}
                        className="object-contain rounded-full  "
                        /> 
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-end">
                        
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam perspiciatis in, totam eos aut cumque nostrum consequatur adipisci beatae hic fugit aliquid, eaque, veritatis optio eligendi deserunt aspernatur officiis quas. </h1>
                    </div>

                </div>
                
            </div>
            <div className="h-10 w-[98%] wborder-slate-300 flex items-center gap-4 p-1 rounded-full bg-slate-100 mr-10 absolute left-[1%] bottom-[2%]">
                <input type="text" placeholder="Write Something" className="w-[90%] h-full text-md text-slate-300 bg-slate-100 rounded-full indent-6 outline-none focus:text-black"/>
                <FaImage className="text-2xl text-slate-300 hover:text-slate-400"/>
                <IoMdSend  className="text-2xl text-redrice-blue hover:text-sky-800"/>
            </div>
        </div>
    )
}