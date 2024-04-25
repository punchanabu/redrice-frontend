import React from 'react'
import Image from 'next/image';

const MockChatUIs = () => {
  return (
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
  )
}

export default MockChat