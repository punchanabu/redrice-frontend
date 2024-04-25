'use client'
import { IoMdSend } from "react-icons/io";
import Image from "next/image";
import {  useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { CustomSocketOptions } from "@/types/chat";


export default function ChatPanel({setroomid}:{setroomid:Function}){
    const state=true
    const [reservationState] = useState<boolean>(state);
    const [message, setMessage] = useState("");
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
    const { data: session } = useSession();
    const token = session?.user.token;
    const socket = io('https://redrice-chat.onrender.com', {
        transports: ["websocket"],
        auth: {
            token:token,
          },
      } as unknown as CustomSocketOptions);

    const send = ()=>{
        if (message.trim() !== "") {

            // connect socket.io
            socket.emit('send message', message);

            setMessage("");
          } 
    }
    
    
    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    
    //     if (!file) {
    //       return; // Handle no file selected case (optional)
    //     }
    
    //     // Validate image file type and size (optional)
    //     if (!file.type.startsWith("image/")) {
    //       console.warn("Invalid file type. Please select an image.");
    //       return;
    //     }
    
    //     // Handle image preview or upload logic here
    //     const reader = new FileReader();
    //     reader.onload = (e) => setSelectedImage(e.target.result);
    //     reader.readAsDataURL(file);
    //   };

    const textareaRef = useRef(null);

    

    
    
        

    return(
        <div className="w-full h-full flex flex-col relative">
            <div className="h-20 w-full border-b border-slate-300 flex p-1 px-3 items-center gap-4 tablet:gap-6">
            <IoIosArrowBack className="text-3xl text-white bg-slate-500 p-1 rounded-full sm:hidden hover:bg-slate-300" onClick={()=>{setroomid('')}}></IoIosArrowBack>
            <Image
            src={ '/img/user/user1.png'}
            alt="Product Picture"
            width={60}
            height={60}
            className="h-full object-contain rounded-full flex items-center "
                />
             
            
            <h1 className="text-md sm:text-2xl semi-bold">{'Pizza Hutz  1150'}</h1>   
            <div className={`w-[10px] h-[10px] rounded-full ${getBackgroundColor()} ${state? 'animate-ping':''} `}></div> 
            {
                !state?<div className="text-md text-slate-500 relative -left-[1%]">จะรีบติดต่อกลับทันที</div>:''
            }                          
            </div>
            <div className="w-full h-[calc(100%-136px)] py-2 px-4">
                <div className="w-full h-full overflow-x-auto flex flex-col items-center gap-3">
                    <h1 className="text-md text-slate-300">9 Apr 2024</h1>
                    <div className="w-full  flex gap-2 justify-start sender">
                        <Image
                        src={ '/img/user/user1.png'}
                        alt="Product Picture"
                        width={35}
                        height={35}
                        className="object-contain rounded-full  "
                        /> 
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-end receiver">
                        
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-start sender">
                        <Image
                        src={ '/img/user/user1.png'}
                        alt="Product Picture"
                        width={35}
                        height={35}
                        className="object-contain rounded-full  "
                        /> 
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-end receiver">
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam perspiciatis in, totam eos aut cumque nostrum consequatur adipisci beatae hic fugit aliquid, eaque, veritatis optio eligendi deserunt aspernatur officiis quas. </h1>
                    </div>

                    <div className="w-full  flex gap-2 justify-start sender">
                        <Image
                        src={ '/img/user/user1.png'}
                        alt="Product Picture"
                        width={35}
                        height={35}
                        className="object-contain rounded-full  "
                        /> 
                        <h1 className="tablet:w-1/2 w-[70%] bg-slate-100 rounded-lg p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, laudantium itaque suscipit mollitia pariatur vero vel alias voluptas consequatur minima magni, corporis provident corrupti fugiat quos aperiam voluptatum laboriosam rerum.</h1>
                    </div>

                </div>
                
            </div>
            <div className="h-10 w-[98%] wborder-slate-300 flex items-center justify-between gap-2 p-1 pr-5 rounded-full bg-slate-100 mr-10 absolute left-[1%] bottom-[2%]">
                <textarea id="textarea" value={message} onChange={(event) => {setMessage(event.target.value);}} placeholder="Write Something" className="w-[90%] h-full text-md text-slate-300 bg-slate-100 rounded-lg outline-none focus:text-black px-6 py-1 resize-none overflow-x-auto self-end"/>
                {selectedImage && (
                    <div className="mt-2">
                    <Image src={selectedImage} alt="Selected Image Preview" width={30} height={30} />
                    {/* Add buttons or actions for the selected image (optional) */}
                    </div>
                )}
                <div className="w-[10%] flex items-center justify-end gap-2">

                    {/* <label htmlFor="image-upload">
                    <FaImage className="text-2xl text-slate-300 hover:text-slate-400 cursor-pointer" />
                    </label>
                    <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    style={{ display: "none" }} // Hide the default input element
                    /> */}
                    {/* <UploadImage onFileSelect={onFileSelect} /> */}
                    <IoMdSend  className="text-2xl text-redrice-blue hover:text-sky-800" onClick={()=>{send()}} />


                </div>
                
                
            </div>
        </div>
    )
}


