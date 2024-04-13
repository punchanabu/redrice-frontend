'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { getme } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';



const RestaurantCardReload = ({
    ID,

}:{ID:any}) => {
    const [userRole, setUserRole] = useState('');

    const { data: session } = useSession();

    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.user.token) {
                const user = await getme(session.user.token);
                setUserRole(user.role);
            }
        };
        fetchUsers();
    }, [session]);

    

    if (!session) {
        return (
            <div className="h-[700px] flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div
            key={ID}
            className="flex p-2 border-2 rounded-xl mx-2 w-1/2 flex-col shadow-md px-0 gap-1"
            style={{ minWidth: '300px', maxWidth: '600px' }}
        >
            <div className="py-2 w-full h-[300px] animate-pulse bg-slate-100 rounded-xl">
                
            </div>

            <div className="mx-4 flex flex-col justify-between h-full gap-1 ">
                
                    <h1 className="text-2xl font-semibold min-h-6 animate-pulse bg-slate-100 rounded-full"></h1>
                    <p className="min-h-6 text-md text-slate-500 animate-pulse bg-slate-100 rounded-full">
                        
                    </p>
                
                <div className="mt-auto mb-4 flex justify-between items-center">
                    <Rating name="read-only" value={5} readOnly className='animate-pulse '/>
                    <div className="space-x-1 items-center flex justify-center">
                        <button className="px-4 py-1 bg-redrice-yellow hover:bg-redrice-light-yellow text-white font-semibold rounded-md animate-pulse ">
                                Detail
                        </button>
                        {userRole === 'admin' && (
                            <div>
                                <Link href={`/restaurant/update/${ID}`}>
                                    <button className="rounded-full p-1 bg-redrice-blue text-white hover:bg-blue-400">
                                        <MdEdit />
                                    </button>
                                </Link>
                                <button
                                    className="rounded-full p-1 bg-redrice-red text-white hover:bg-red-400"
                                 
                                >
                                    <RiDeleteBin5Fill />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCardReload;
