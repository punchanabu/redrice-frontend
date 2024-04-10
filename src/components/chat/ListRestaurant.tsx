import Searchbox from "../Searchbox"
import Link from "next/link"
import Image from "next/image"


const mockdata:Array<{roomid:string,name:string,img:string,msg:string,time:string}>=[{roomid:'1',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'2',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'3',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'4',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'}]


export default function ListRestaurant({setroomid}:{setroomid:Function}) {

    return(
    
        <div className="w-full h-full flex flex-col gap-3">
            <div className="px-3">
                <Searchbox></Searchbox>
            </div>
            
            <div className="w-full overflow-x-auto">
                {
                    mockdata.map((item)=>(
                        <div  key={item.roomid} className=" hover:bg-slate-100 p-3 flex gap-2" onClick={()=>{
                            setroomid(item.roomid)
                        }}> 
                            <div className="w-1/6  flex items-center ">
                                
                                <Image
                                src={ '/img/user/user1.png'}
                                alt="Product Picture"
                                width={60}
                                height={60}
                                className="h-full object-contain rounded-full flex items-center "
                                    />
                              
                            
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <h1 className="w-full line-clamp-1 text-redrice-yellow">{item.name}</h1>
                                <h1 className="w-full line-clamp-1 text-slate-300 bold">{item.msg}</h1>
                            </div>
                            <div className="w-1/6 flex flex-col items-start">
                                <h1 className="  text-slate-300 bold">{item.time}</h1>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
    
}

