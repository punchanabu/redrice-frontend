import Searchbox from '../Searchbox';
import Link from 'next/link';
import Image from 'next/image';
import DataFilter from '@/types/searchbox';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaRegMessage } from 'react-icons/fa6';
import { BiMessageSquare } from 'react-icons/bi';
import { Socket } from 'socket.io-client';
import { sessionRoom } from '@/types/chat';
import { getAllRestaurant } from '@/lib/restaurant';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getusers } from '@/lib/auth';

const mockdata: Array<{
    roomid: string;
    name: string;
    img: string;
    msg: string;
    time: string;
}> = [
    {
        roomid: '1',
        name: 'Pizza Hutz  1150',
        img: '',
        msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
        time: '10:30 AM',
    },
    {
        roomid: '2',
        name: 'Momo',
        img: '',
        msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
        time: '10:30 AM',
    },
    {
        roomid: '3',
        name: '7-11',
        img: '',
        msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
        time: '10:30 AM',
    },
    {
        roomid: '4',
        name: 'Tenya',
        img: '',
        msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
        time: '10:30 AM',
    },
    {
        roomid: '',
        name: 'Yayoi',
        img: '',
        msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, laboriosam.',
        time: '10:30 AM',
    },
];

interface Restaurant {
    sessionId: string;
    userId: number;
}

interface ListRestaurantProps {
    setroomid: Function;
    data: DataFilter[] | sessionRoom[];
    handleJoin: (sessionId: any, socket: any) => void;
    socket: Socket | null;
    setMessageList: (newMessageList: any) => void;
    setChatData: (chatData: { imageUrl: string, name: string }) => void;
}

export default function ListRestaurant({
    setroomid,
    data,
    handleJoin,
    socket,
    setMessageList,
    setChatData
}: ListRestaurantProps) {
    const handleRestaurantClick = (imageUrl: string, name: string) => {
        setChatData({ imageUrl, name });
    }
    const [Filterrestaurants, setFilterRestaurants] = useState([]);
    const { data: session } = useSession();
    const [restaurants, setRestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchRestaurants = async () => {
            if (session?.user.token) {
                const fetchedRestaurants = await getAllRestaurant(
                    session.user.token
                );
                setRestaurants(fetchedRestaurants);
            }
        };
        fetchRestaurants();
    }, [session]);
    //get all users
    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.user.token) {
                const fetchUsers = await getusers(
                    session.user.token
                );
                setUsers(fetchUsers);
            }
        };
        fetchUsers();
    }, [session]);
    //console.log('users', users);
    //console.log('session', session);
    //create empty array of array to store imgurl and id and name

    const imgurl: any[] = [];
    const id: any[] = [];
    const name: any[] = [];

    //create empty array to store user.name and user.id and user.role
    const username: any[] = [];
    const userid: any[] = [];
    const userrole: any[] = [];
    //store imgurl and id in array
    restaurants.map((data: any) => {
        imgurl.push(data.imageUrl);
        id.push(data.ID);
        name.push(data.name);
    });
    //console.log('restaurants', restaurants)
    //store user.name and user.id in array
    users.map((data: any) => {
        username.push(data.name);
        userid.push(data.ID);
        userrole.push(data.role);
    });
    console.log('userssss', users);

    //create new array of object with imgurl and id
    const newdata = restaurants.map((data: any, index: number) => {
        return {
            imageUrl: imgurl[index],
            ID: id[index],
            name: name[index],
        };
    });
    //create new array of object with user.name and user.id
    const newdatauser = users.map((data: any, index: number) => {
        return {
            name: username[index],
            id: userid[index],
            role: userrole[index],
        };
    });
    console.log('newdata', newdata); //user
    console.log('newdatauser', newdatauser); //restaurant
    console.log('filter', Filterrestaurants);

    //add imageUrl and name that have same ID with restaurantID in Filterrestaurants
    //console log first userId of Filterrestaurants
    console.log('Filterrestaurantssss', (Filterrestaurants[0] as any)?.userId);
    //match Filterrestaurants[0] as any)?.userId with id of newdatauser and console log role of that user
    console.log(
        'role',
        newdatauser.find(
            (data: any) => data.id === (Filterrestaurants[0] as any)?.userId
        )?.role
    );
    if (newdatauser.find(
        (data: any) => data.id === (Filterrestaurants[0] as any)?.userId
    )?.role ==='user'){
        console.log()
    }

    const dataFilter = Filterrestaurants.map((data: any, index: number) => {
        return {
            ...data,
            imageUrl: newdata[index]?.imageUrl || '/img/user/user1.png',
            name: newdata[index]?.name || 'No name',
        };
    });
    //console.log('dataFilter', dataFilter);
    const handleRoomClick = (session: string) => {
        handleJoin(session, socket);
    };

    return (
        <div className="w-full h-full flex flex-col gap-3 ">
            <div className="px-3 flex  gap-1 sm:max-xl:gap-0">
                <div className="w-[88%] ">
                    <Searchbox
                        data={data as DataFilter[]}
                        filter={setFilterRestaurants}
                    ></Searchbox>
                </div>

                <div className=" p-0.5  text-center flex items-center relative ">
                    <BiMessageSquare className="text-gray-300 hover:text-gray-400 text-3xl "></BiMessageSquare>
                    <div className="bg-red-600 text-xs rounded-full px-1 text-white absolute top-1 left-[50%]  border-2 border-white ">{`100`}</div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                {dataFilter.map((data: any) => (
                    <div
                        key={data.sessionId}
                        className=" hover:bg-slate-100 p-3 flex gap-2"
                        onClick={() => {
                            setroomid(data.sessionId);
                            handleRoomClick(data.sessionId);
                            setMessageList([]);
                            handleRestaurantClick(data.imageUrl, data.name);
                        }}
                    >
                        <div className="w-1/6  flex items-center ">
                            <Image
                                src={data.imageUrl || '/img/user/user1.png'}
                                alt="Product Picture"
                                width={60}
                                height={60}
                                className="h-full object-contain rounded-full flex items-center "
                            />
                        </div>
                        <div className="w-2/3 flex flex-col">
                            <h1 className="w-full line-clamp-1 text-redrice-yellow">
                                {data.name}
                            </h1>
                            <h1 className="w-full line-clamp-1 text-slate-300 bold">
                                let start conversation
                            </h1>
                        </div>
                        <div className="w-1/6 flex flex-col items-start">
                            <h1 className="  text-slate-300 bold">
                                {data.time}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
