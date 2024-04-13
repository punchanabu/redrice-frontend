'use client';
import React from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { useSession } from 'next-auth/react';
import { getAllRestaurant } from '@/lib/restaurant';
import Restaurant from '@/types/restaurant';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import DataFilter from '@/types/searchbox';
import RestaurantCardReload from './RestaurantCardReload';
const Restaurants = ({setRes,Data}:{setRes:Function,Data:Array<DataFilter>}) => {
    const { data: session } = useSession();
    const [restaurants, setRestaurants] = useState([]);
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
    setRes(restaurants)
    if (!session) {
        return (
            <div className="h-[700px] flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="mt-5 md:mt-14 h-2/3 max-h-[550px] overflow-x-scroll ring-2 ring-slate-200 rounded-xl p-5 flex flex-row">
            {restaurants?.length>0 ? (Data?.map((res: DataFilter) => ( 
                <RestaurantCard
                    key={res.ID}
                    name={res.name}
                    imageUrl={res.imageUrl}
                    ID={res.ID}
                    openTime={res.openTime}
                    closeTime={res.closeTime}
                />
            )))
            :<>
                {[...Array(Data?.length || 4)].map((_, index) => ( // Adjust the number of placeholders
            <RestaurantCardReload key={index} ID={''}/> // Implement a skeleton component for visual representation, if desired
          ))}
                </>}
            
        </div>
    );
};

export default Restaurants;
