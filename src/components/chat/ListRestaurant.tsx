import Searchbox from "../Searchbox"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import DataFilter from "@/types/searchbox"

const mockdata:Array<{roomid:string,name:string,img:string,msg:string,time:string}>=[{roomid:'1',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'2',name:'Momo',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'3',name:'7-11',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'4',name:'Tenya',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'',name:'Yayoi',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'}]

interface Restaurant {
    sessionId: string;
    userId: number;
  }
  
  interface ListRestaurantProps {
    setroomid: Function
    data:{roomid:string,name:string,imageUrl:string,msg:string,time:string}[]
   // Allow null as a possible value
  }

export default function ListRestaurant({ setroomid,data }: ListRestaurantProps) {
    const [Filterrestaurants, setFilterRestaurants] = useState([]);
    console.log('test pass data : ',data);

    
    return(
    
        <div className="w-full h-full flex flex-col gap-3">
            <div className="px-3">
                <Searchbox data={data} filter={setFilterRestaurants}></Searchbox>
            </div>
            
            <div className="w-full overflow-x-auto">
                {
                    Filterrestaurants.map((data:DataFilter)=>(
                        <div  key={data.roomid} className=" hover:bg-slate-100 p-3 flex gap-2" onClick={()=>{
                            setroomid(data.roomid)
                        }}> 
                            <div className="w-1/6  flex items-center ">
                                
                                <Image
                                src={ data.imageUrl ||'/img/user/user1.png'  }
                                alt="Product Picture"
                                width={60}
                                height={60}
                                className="h-full object-contain rounded-full flex items-center "
                                    />
                    
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <h1 className="w-full line-clamp-1 text-redrice-yellow">{data.name}</h1>
                                <h1 className="w-full line-clamp-1 text-slate-300 bold">{data.msg}</h1>
                            </div>
                            <div className="w-1/6 flex flex-col items-start">
                                <h1 className="  text-slate-300 bold">{data.time}</h1>
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
    
}

