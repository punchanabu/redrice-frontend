'use client'
import Searchbox from "../Searchbox"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import DataFilter from "@/types/searchbox"
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { BiMessageSquare } from "react-icons/bi";
import { Socket } from "socket.io-client"
import { sessionRoom } from "@/types/chat";
import { useSession } from "next-auth/react"
import { getOneRestaurant } from "@/lib/restaurant"
import Restaurant from "@/types/restaurant"

const mockdata:Array<{roomid:string,name:string,img:string,msg:string,time:string}>=[{roomid:'1',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'2',name:'Momo',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'3',name:'7-11',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'4',name:'Tenya',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'',name:'Yayoi',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'}]

interface RestaurantInterface {
    sessionId: string;
    userId: number;
}
  
interface ListRestaurantProps {
    setroomid: Function;
    data: (DataFilter[] | sessionRoom[]);
    handleJoin: (sessionId: any, socket: any) => void;
    socket: Socket | null;
    setMessageList: (newMessageList: any) => void;
}

export default function ListRestaurant({ setroomid,data, handleJoin, socket, setMessageList }: ListRestaurantProps) {
    const [filterrestaurants, setFilterRestaurants] = useState([]);
    const [restaurantsDetails, setRestaurantsDetails] = useState<any[]>([]);
    const { data: session } = useSession();
    const token = session?.user.token;


    //Fetch restaurant from getOneRestaurant for using Restaurant Schema
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
          if (token && filterrestaurants.length > 0) {
            const promises = filterrestaurants.map(async (restaurant: any) => {
              try {
                const { userId } = restaurant;
                const fetchedRestaurant = await getOneRestaurant(userId.toString(), token);
                console.log(restaurant)

                return { ...restaurant, details: fetchedRestaurant };
              } catch (error) {
                console.error(`Error fetching restaurant details for userId ${restaurant.userId}:`, error);
                return { ...restaurant, details: null };
              }
            });
    
            const restaurantsWithDetails = await Promise.all(promises);
            setRestaurantsDetails(restaurantsWithDetails);
          }
        };
    
        fetchRestaurantDetails();
      }, [token, filterrestaurants]);
      

      const handleRoomClick = (sessionId: string) => {
        setroomid(sessionId);
        handleJoin(sessionId, socket);
        setMessageList([]);
      };
        
    return (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="px-3 flex gap-1 sm:max-xl:gap-0">
            <div className="w-[88%]">
              <Searchbox data={data as DataFilter[]} filter={setFilterRestaurants}></Searchbox>
            </div>
            <div className="p-0.5 text-center flex items-center relative">
              <BiMessageSquare className="text-gray-300 hover:text-gray-400 text-3xl" />
              <div className="bg-red-600 text-xs rounded-full px-1 text-white absolute top-1 left-[50%] border-2 border-white">
                {`100`}
              </div>
            </div>
          </div>
    
          <div className="w-full overflow-x-auto">
            {restaurantsDetails.map((restaurant: any) => (
              <div
                key={restaurant.sessionId}
                className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
                onClick={() => handleRoomClick(restaurant.sessionId)}
              >
                <div className="w-1/6 flex items-center">
                  <Image
                    src={restaurant.details?.imageUrl }
                    alt="Restaurant Image"
                    width={60}
                    height={60}
                    className="h-full object-contain rounded-full flex items-center"
                  />
                </div>
                <div className="w-2/3 flex flex-col">
                  <h1 className="w-full line-clamp-1 text-redrice-yellow">{restaurant.sessionId}</h1>
                  <h1 className="w-full line-clamp-1 text-slate-300 bold">
                    {restaurant.details ? restaurant.details.name : 'Unknown Restaurant'}
                  </h1>
                </div>
                <div className="w-1/6 flex flex-col items-start">
                  <h1 className="text-slate-300 bold">{restaurant.time}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    
}


{/* <div className="w-full h-full flex flex-col gap-3 ">
<div className="px-3 flex  gap-1 sm:max-xl:gap-0">
    <div className="w-[88%] ">
    <Searchbox data={data as DataFilter[]} filter={setFilterRestaurants}></Searchbox>
    </div>

        <div className=" p-0.5  text-center flex items-center relative ">
            <BiMessageSquare className="text-gray-300 hover:text-gray-400 text-3xl "></BiMessageSquare>
        <div className="bg-red-600 text-xs rounded-full px-1 text-white absolute top-1 left-[50%]  border-2 border-white ">{`100`}</div>

    </div>                
</div>

<div className="w-full overflow-x-auto">
    {
        Filterrestaurants.map((data: any)=>(
            <div>
            
                <div key={data.sessionId} className=" hover:bg-slate-100 p-3 flex gap-2" onClick={()=>{
                    setroomid(data.sessionId);
                    handleRoomClick(data.sessionId);
                    setMessageList([]);
                }}> 
                    <div className="w-1/6  flex items-center ">
                        
                        <Image
                        src={ restaurant?.imageUrl }
                        alt="Product Picture"
                        width={60}
                        height={60}
                        className="h-full object-contain rounded-full flex items-center "
                            />
            
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <h1 className="w-full line-clamp-1 text-redrice-yellow">{data.sessionId}</h1>
                        <h1 className="w-full line-clamp-1 text-slate-300 bold">{data.userId || data.restaurantId }</h1>
                    </div>
                    <div className="w-1/6 flex flex-col items-start">
                        <h1 className="  text-slate-300 bold">{data.time}</h1>
                    </div>
                    
                </div>
            </div>
        ))
    }
</div>
</div> */}

