import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiMessageSquare } from 'react-icons/bi';
import Searchbox from '../Searchbox';
import { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { getOneRestaurant } from '@/lib/restaurant';
import { getUserById } from '@/lib/auth';
import DataFilter from '@/types/searchbox';
import { sessionRoom } from '@/types/chat';
import { FaUserAlt } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';

interface ListRestaurantProps {
    setroomid: Function;
    data: DataFilter[] | sessionRoom[];
    handleJoin: (sessionId: any, socket: any) => void;
    socket: Socket | null;
    setMessageList: (newMessageList: any) => void;
    readyChat: boolean;
    onRoomSelected: (restaurantData: {
        imageUrl: string;
        name: string;
    }) => void;
}

export default function ListRestaurant({
    setroomid,
    data,
    handleJoin,
    socket,
    setMessageList,
    onRoomSelected,
    readyChat,
}: ListRestaurantProps) {
    const [restaurantsDetails, setRestaurantsDetails] = useState<any[]>([]);
    const [usersDetails, setUsersDetails] = useState<any[]>([]);
    const [chatData, setChatData] = useState<{
        imageUrl: string;
        name: string;
    }>({ imageUrl: '', name: '' });

    const { data: session } = useSession();
    const token = session?.user.token;

    useEffect(() => {
        const fetchDetails = async () => {
            if (token) {
                const promises = data.map(async (item: any) => {
                    try {
                        if (item.restaurantId) {
                            // This is intentional dont change its a miscommunicate from backend
                            const fetchedUser = await getUserById(
                                token,
                                item.restaurantId
                            );
                            const fetchedRestaurant = await getOneRestaurant(
                                fetchedUser.restaurant_id,
                                token
                            );
                            console.log(fetchedRestaurant);
                            return { ...item, details: fetchedRestaurant };
                        } else if (item.userId) {
                            const fetchedUser = await getUserById(
                                token,
                                item.userId
                            );
                            return { ...item, details: fetchedUser };
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching details for item:`,
                            error
                        );
                        return { ...item, details: null };
                    }
                });

                const itemsWithDetails = await Promise.all(promises);
                const restaurants = itemsWithDetails.filter(
                    (item) => item.restaurantId
                );
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

    const handleRoomSelected = (restaurant: {
        imageUrl: string;
        name: string;
    }) => {
        // Update chatData state with restaurant details
        onRoomSelected(restaurant);
    };

    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="px-3 flex gap-1 sm:max-xl:gap-0">
                <div className="w-[100%]">
                    <Searchbox
                        data={data as DataFilter[]}
                        filter={handleFilterChange}
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto">

                {!readyChat && (
                    <div className="flex justify-center">
                        <CircularProgress />
                    </div>
                )}

                {restaurantsDetails.map((restaurant) => (
                    <div
                        key={restaurant.sessionId}
                        className="hover:bg-slate-100 p-3 flex gap-2 cursor-pointer"
                        onClick={() => {
                            handleRoomClick(restaurant.sessionId),
                                handleRoomSelected({
                                    imageUrl:
                                        restaurant.details?.imageUrl || '',
                                    name: restaurant.details?.name || '',
                                });
                        }}
                    >
                        <div className="w-1/6 flex items-center">
                            {restaurant.details?.imageUrl ? (
                                <Image
                                    src={
                                        restaurant.details?.imageUrl ||
                                        '/img/user/user1.png'
                                    }
                                    alt="Restaurant Image"
                                    width={60}
                                    height={60}
                                    sizes="90"
                                    className="h-full object-contain rounded-full flex items-center"
                                />
                            ) : (
                                <div className="relative bg-stone-200 rounded-full bg-grey-200 border-4 border-stone-300 hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                                    <FaUserAlt color="grey" />
                                </div>
                            )}
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
                            <h1 className="text-slate-300 bold">
                                {restaurant.details?.time || 'N/A'}
                            </h1>
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
                                imageUrl:
                                    user.details?.imageUrl ||
                                    '/img/user/user1.png',
                                name: user.details?.name || 'Unknown',
                            });
                        }}
                    >
                        <div className="w-1/6 flex items-center">
                            <Image
                                alt="User Image"
                                width={60}
                                height={60}
                                sizes="90"
                                src={
                                    user.details?.imageUrl ||
                                    '/img/user/user1.png'
                                }
                                className="h-full object-contain rounded-full flex items-center"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col">
                            <h1 className="w-full line-clamp-1 text-redrice-yellow">
                                {user.details?.name || 'Unknown'}
                            </h1>
                            <h1 className="w-full line-clamp-1 text-slate-300 bold">
                                Start a Conversation
                            </h1>
                        </div>
                        <div className="w-1/6 flex flex-col items-start">
                            <h1 className="text-slate-300 bold">
                                {user.details?.time || 'N/A'}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
