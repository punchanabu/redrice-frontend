import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiMessageSquare } from 'react-icons/bi';
import Searchbox from '../Searchbox';
import { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { getOneRestaurant } from '@/lib/restaurant';
import { getUserById } from '@/lib/auth';
import  DataFilter from '@/types/searchbox';
import { sessionRoom } from "@/types/chat";
import { FaUserAlt } from 'react-icons/fa';

interface ListRestaurantProps {
    setroomid: Function;
    data: DataFilter[] | sessionRoom[];
    handleJoin: (sessionId: any, socket: any) => void;
    socket: Socket | null;
    setMessageList: (newMessageList: any) => void;
    onRoomSelected: (restaurantData: { imageUrl: string, name: string }) => void;
}

export default function ListRestaurant({
    setroomid,
    data,
    handleJoin,
    socket,
    setMessageList,
    onRoomSelected
}: ListRestaurantProps ) {
    const [restaurantsDetails, setRestaurantsDetails] = useState<any[]>([]);
    const [usersDetails, setUsersDetails] = useState<any[]>([]);
    const [chatData, setChatData] = useState<{ imageUrl: string, name: string }>({ imageUrl: '', name: '' });

    const { data: session } = useSession();
    const token = session?.user.token;

    useEffect(() => {
        const fetchDetails = async () => {
            if (token) {
                const promises = data.map(async (item: any) => {
                    try {
                        if (item.restaurantId) {
                            // This is intentional dont change its a miscommunicate from backend
                            const fetchedUser = await getUserById(token, item.restaurantId);
                            const fetchedRestaurant = await getOneRestaurant(fetchedUser.restaurant_id, token);
                            console.log(fetchedRestaurant);
                            return { ...item, details: fetchedRestaurant };
                        } else if (item.userId) {
                            const fetchedUser = await getUserById(token, item.userId);
                            return { ...item, details: fetchedUser };
                        }
                    } catch (error) {
                        console.error(`Error fetching details for item:`, error);
                        return { ...item, details: null };
                    }
                });

                const itemsWithDetails = await Promise.all(promises);
                const restaurants = itemsWithDetails.filter((item) => item.restaurantId);
                const users = itemsWithDetails.filter((item) => item.userId);
                setRestaurantsDetails(restaurants);
                setUsersDetails(users);
            }
        };

        fetchDetails();
    }, [token, data]);

    const handleRoomClick = (sessionId: string) => {
        setroomid(sessionId);
        handleJoin(sessionId, socket);
        setMessageList([]);
    };

    const handleFilterChange = (filteredData: any[]) => {
        const restaurants = filteredData.filter((item) => item.restaurantId);
        const users = filteredData.filter((item) => item.userId);

        setRestaurantsDetails(restaurants);
        setUsersDetails(users);
    };

    const handleRoomSelected = (restaurant: { imageUrl: string, name: string } ) => {
        // Update chatData state with restaurant details
        onRoomSelected(restaurant);
    };

    // const handleRoomOnClick = (restaurantData: { imageUrl: string, name: string }) => {
    //     onRoomSelected(restaurantData); // Emit selected restaurant data to parent component
    // };

    // restaurantsDetails.map((restaurant) => {
    //     console.log(restaurant.details?.name, restaurant.details?.imageUrl);
    //     return null; // Assuming you don't need to return a modified array
    // });

    // console.log(usersDetails + 'this is user detail')
    // console.log(restaurantsDetails + 'this is restaurant detail')
    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="px-3 flex gap-1 sm:max-xl:gap-0">
                <div className="w-[88%]">
                    {/* Render the Searchbox component and pass data and filter function */}
                    <Searchbox data={data as DataFilter[]} filter={handleFilterChange} />
                </div>
                <div className="p-0.5 text-center flex items-center relative">
                    <BiMessageSquare className="text-gray-300 hover:text-gray-400 text-3xl" />
                    <div className="bg-red-600 text-xs rounded-full px-1 text-white absolute top-1 left-[50%] border-2 border-white">
                        {`100`}
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                {/* Render restaurants or users based on filtered details */}
                {restaurantsDetails.map((restaurant) => (
                    <div
                        key={restaurant.sessionId}
                        className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
                        onClick={() => {
                            handleRoomClick(restaurant.sessionId),  
                            handleRoomSelected({
                                imageUrl: restaurant.details?.imageUrl || '',
                                name: restaurant.details?.name || ''
                            });
                        }}
                    >
                        <div className="w-1/6 flex items-center">
                            {restaurant.details?.imageUrl ? (
                            <Image
                                alt="Restaurant Image"
                                width={60}
                                height={60}
                                src={restaurant.details?.imageUrl || '/img/user/user1.png'}
                                className="h-full object-contain rounded-full flex items-center"
                            />
                            ) : 
                            <div className="relative bg-stone-200 rounded-full bg-grey-200 border-4 border-stone-300 hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                                            <FaUserAlt color='grey'/>
                            </div>} 
                        </div>
                        <div className="w-2/3 flex flex-col">
                            <h1 className="w-full line-clamp-1 text-redrice-yellow">
                                {restaurant.details?.name || 'Unknown'}
                            </h1>
                            <h1 className="w-full line-clamp-1 text-slate-300 bold">
                                Start a Conversation
                            </h1>
                        </div>
                        <div className="w-1/6 flex flex-col items-start">
                            <h1 className="text-slate-300 bold">{restaurant.details?.time || 'N/A'}</h1>
                        </div>
                    </div>
                ))}

                {usersDetails.map((user) => (
                    <div
                        key={user.sessionId}
                        className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
                        onClick={() => {
                            handleRoomClick(user.sessionId);                        
                            handleRoomSelected({
                                imageUrl: user.details?.imageUrl || '/img/user/user1.png',
                                name: user.details?.name || 'Unknown'
                            });                        
                        }}
                    >
                        <div className="w-1/6 flex items-center">
                            <Image
                                alt="User Image"
                                width={60}
                                height={60}
                                src={user.details?.imageUrl || '/img/user/user1.png'}
                                className="h-full object-contain rounded-full flex items-center"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col">
                            <h1 className="w-full line-clamp-1 text-redrice-yellow">
                                {user.details?.name || 'Unknown'}
                            </h1>
                            <h1 className="w-full line-clamp-1 text-slate-300 bold">Start a Conversation</h1>
                        </div>
                        <div className="w-1/6 flex flex-col items-start">
                            <h1 className="text-slate-300 bold">{user.details?.time || 'N/A'}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


//japan version why use filterrestaurant

// 'use client'
// import Searchbox from "../Searchbox"
// import Link from "next/link"
// import Image from "next/image"
// import { useEffect, useState } from "react"
// import DataFilter from "@/types/searchbox"
// import { AiOutlineMessage } from "react-icons/ai";
// import { FaRegMessage } from "react-icons/fa6";
// import { BiMessageSquare } from "react-icons/bi";
// import { Socket } from "socket.io-client"
// import { sessionRoom } from "@/types/chat";
// import { useSession } from "next-auth/react"
// import { getOneRestaurant } from "@/lib/restaurant"
// import Restaurant from "@/types/restaurant"
// import { getUserById } from "@/lib/auth"

// const mockdata:Array<{roomid:string,name:string,img:string,msg:string,time:string}>=[{roomid:'1',name:'Pizza Hutz  1150',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'2',name:'Momo',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'3',name:'7-11',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'4',name:'Tenya',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'},{roomid:'',name:'Yayoi',img:'',msg:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',time:'10:30 AM'}]

// interface RestaurantInterface {
//     sessionId: string;
//     userId: number;
// }
  
// interface ListRestaurantProps {
//     setroomid: Function;
//     data: (DataFilter[] | sessionRoom[]);
//     handleJoin: (sessionId: any, socket: any) => void;
//     socket: Socket | null;
//     setMessageList: (newMessageList: any) => void;
// }

// export default function ListRestaurant({ setroomid,data, handleJoin, socket, setMessageList }: ListRestaurantProps) {
//     const [filterrestaurants, setFilterRestaurants] = useState([]);
//     const [restaurantsDetails, setRestaurantsDetails] = useState<any[]>([]);
//     const { data: session } = useSession();
//     const token = session?.user.token;
      
//           useEffect(() => {
//             const fetchRestaurantDetails = async () => {
//               if (token && filterrestaurants.length > 0) {
//                 const promises = filterrestaurants.map(async (restaurant: any) => {
//                   try {
//                     const { restaurantId } = restaurant;
//                     const fetchedRestaurant = await getOneRestaurant(restaurantId.toString(), token);
//                     console.log(fetchedRestaurant)

//                     return { ...restaurant, details: fetchedRestaurant };
//                   } catch (error) {
//                     console.error(`Error fetching restaurant details for userId ${restaurant.userId}:`, error);
//                     return { ...restaurant, details: null };
//                   }
//                 });
        
//                 const restaurantsWithDetails = await Promise.all(promises);
//                 setRestaurantsDetails(restaurantsWithDetails);
//               }
//             };
        
//             fetchRestaurantDetails();
//           }, [token, filterrestaurants]);

//         const [filterUsers, setFilterUsers] = useState<any[]>([]);
//         const [usersDetails, setUsersDetails] = useState<any[]>([]);

//         useEffect(() => {
//             const fetchUserDetails = async () => {
//             console.log(token)
//             if (token) {
//                 const promises = data.map(async (user: any) => {
//                 try {
//                     const { userId } = user;
//                     console.log(userId)
//                     const fetchedUser = await getUserById( token , userId); // Assuming getOneRestaurant fetches user details
//                     console.log(fetchedUser);
        
//                     return { ...user, details: fetchedUser };
//                 } catch (error) {
//                     console.error(`Error fetching user details for userId ${user.userId}:`, error);
//                     return { ...user, details: null };
//                 }
//                 });
//                 const usersWithDetails = await Promise.all(promises);
//                 setUsersDetails(usersWithDetails);
//           }
//         };
//           fetchUserDetails();
//       }, [token, filterUsers, session]);

//       const handleRoomClick = (sessionId: string) => {
//         setroomid(sessionId);
//         handleJoin(sessionId, socket);
//         setMessageList([]);
//       };
//     //   restaurantsDetails.map((restaurant: any) =>{
//     //     console.log(restaurant.details.name)
//     //   })
        
//     return (
//         <div className="w-full h-full flex flex-col gap-3">
//           <div className="px-3 flex gap-1 sm:max-xl:gap-0">
//             <div className="w-[88%]">
//               <Searchbox data={data as DataFilter[]} filter={setFilterRestaurants || setFilterUsers}></Searchbox>
//             </div>
//             <div className="p-0.5 text-center flex items-center relative">
//               <BiMessageSquare className="text-gray-300 hover:text-gray-400 text-3xl" />
//               <div className="bg-red-600 text-xs rounded-full px-1 text-white absolute top-1 left-[50%] border-2 border-white">
//                 {`100`}
//               </div>
//             </div>
//           </div>
    
//           <div className="w-full overflow-x-auto">
//             {
//             restaurantsDetails.map((restaurant: any) => (
//               <div
//                 key={restaurant?.sessionId} 
//                 className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
//                 onClick={() => handleRoomClick(restaurant.sessionId)}
//               >
//                 <div className="w-1/6 flex items-center">
//                   <Image
//                     alt="Restaurant Image"
//                     width={60}
//                     height={60}
//                     src={restaurant?.details?.imageUrl || "/img/user/user1.png"}
//                     className="h-full object-contain rounded-full flex items-center"
//                   />
//                 </div>
//                 <div className="w-2/3 flex flex-col">
//                   <h1 className="w-full line-clamp-1 text-redrice-yellow">{restaurant?.details?.name || "user"}</h1>
//                   <h1 className="w-full line-clamp-1 text-slate-300 bold">
//                     Start a Conversation
//                   </h1>
//                 </div>
//                 <div className="w-1/6 flex flex-col items-start">
//                   <h1 className="text-slate-300 bold">{restaurant?.details?.time }</h1>
//                 </div>
//               </div>
//             ))
//             }      
//             {
//             usersDetails.map((user: any) => (
//                 <div
//                 key={user.sessionId} 
//                 className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
//                 onClick={() => handleRoomClick(user.sessionId)}
//                 >
//                 <div className="w-1/6 flex items-center">
//                     <Image
//                     alt="Restaurant Image"
//                     width={60}
//                     height={60}
//                     src={user?.details?.imageUrl || "/img/user/user1.png"}
//                     className="h-full object-contain rounded-full flex items-center"
//                     />
//                 </div>
//                 <div className="w-2/3 flex flex-col">
//                     <h1 className="w-full line-clamp-1 text-redrice-yellow">{user?.details?.name || "user"}</h1>
//                     <h1 className="w-full line-clamp-1 text-slate-300 bold">
//                     Start a Conversation
//                     </h1>
//                 </div>
//                 <div className="w-1/6 flex flex-col items-start">
//                     <h1 className="text-slate-300 bold">{user?.details?.time }</h1>
//                 </div>
//                 </div>
//             ))   
//             }
//           </div>
//         </div>
//       );
    
// }


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

