import Link from 'next/link';
import Image from 'next/image';
import { IoInformation } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';

interface CardProps {
    id: string;
    name: string;
    role: string;
    email: string;
    tel: string;
    picture?: string;
}
export default function Card({
    id,
    name,
    role,
    email,
    tel,
    picture,
}: CardProps) {
    return (
        <div className="h-auto w-full rounded-[1rem] shadow-md m-2 flex flex-row py-2 items-center justify-between p-10 border-2">
            <div className="flex flex-row items-center">
                <h1 className="mr-5 md:mr-10">{id}</h1>
                <div className="flex flex-row gap-5 md:gap-10 mr-3 md:mr-10">
                    {picture ? (
                        <Image
                        src={picture || '/img/user/user1.png'}
                        alt="Product Picture"
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                    />
                    ) : (
                        <div className="m-5 relative rounded-full bg-stone-200 border-stone-300 border-4 border-black hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                            <FaUserAlt color = "grey"/>
                        </div>
                    )}
                    <div className="flex flex-col items-center justify-center">
                        <h1>{name}</h1>
                        <h1 className="text-slate-400">{role}</h1>
                    </div>
                </div>
                <div className="hidden md:flex flex-row gap-10 lg:gap-20 items-center">
                    <h1>{email}</h1>
                    <h1>{tel}</h1>
                </div>
            </div>
            <div className='md:hidden'>
            <Link href={`../admin/manage/user/${id}`}>
                <button className='p-1 rounded-full bg-redrice-yellow hover:bg-redrice-light-yellow text-white'>
                <IoInformation />
                </button>
                    
                </Link>
            </div>
            <div className="hidden md:flex">
                <Link href={`../admin/manage/user/${id}`}>
                    <button className="block text-md font-semibold rounded-full bg-redrice-yellow hover:bg-redrice-light-yellow  px-6 py-3 shadow-sm text-white text-center">
                        view details
                    </button>
                </Link>
            </div>
        </div>
    );
}
