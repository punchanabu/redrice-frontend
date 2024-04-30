'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { getme } from '@/lib/auth';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { Howl } from 'howler';
import { Socket, io } from 'socket.io-client';
import Notification from './Notification';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const handleNotification = (message: any) => {
        console.log('Notification: ', message);
        setNotification(message);
        setTimeout(() => {
            setShowNotification(true);
        }, 100);
    };
    const handleSocket = (socket: Socket) => {
        setSocket(socket);
        console.log('Connect to the socket');
    };

    const handleConnection = () => {
        console.log('Connecting to socket successfully!');
    };

    const handleDisconnect = () => {
        console.log('Disconnected from socket');
    };
    const sound = new Howl({
        src: ['/sound/pop.mp3'],
        volume: 0.5,
    });

    const playSound = () => {
        sound.play();
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            setLogin(true);
        }
    }, [session]);

    useEffect(() => {
        if (process.env.SOCKET_URL) {
            if (!socket) {
                const socket = io(process.env.SOCKET_URL, {
                    transports: ['websocket'],
                    auth: {
                        token: session?.user.token,
                    },
                });
                handleSocket(socket);
            }
        } else {
            console.error('SOCKET_URL environment variable is not defined.');
        }

        if (!socket) return;

        socket.on('connect', handleConnection);
        socket.on('notification', handleNotification);

        socket.on('disconnect', handleDisconnect);
    }, [socket]);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showNotification]);

    useEffect(() => {
        if (showNotification && notificationRef.current) {
            notificationRef.current.classList.add('translate-y-0');
            setTimeout(() => {
                notificationRef.current?.classList.remove('translate-y-0');
            }, 3000);
        }
    }, [showNotification]);

    const handleSignOut = async () => {
        await signOut();
        setLogin(false);
        window.location.href = '/auth/login';
    };

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.user.token) {
                const user = await getme(session.user.token);
                setUserRole(user.role);
            }
        };
        fetchUsers();
    });
    return (
        <nav className="relative">
            <div className="w-full">
                {showNotification && <Notification key={Date.now()} />}
            </div>
            <div className="mx-auto px-4 md:px-6">
                <div className="relative flex items-center justify-between h-24">
                    <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex flex-row items-center"
                                onClick={playSound}
                            >
                                <Image
                                    src={'/redrice-logo.png'}
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    className="relative"
                                />
                                <h1 className="font-bold md:text-2xl">
                                    Red Rice
                                </h1>
                            </Link>
                        </div>
                        {login ? (
                            <div className="hidden sm:block">
                                <div className="flex space-x-4 gap-3 lg:gap-6 items-center justify-center h-full">
                                    {userRole === 'admin' && (
                                        <Link
                                            href="/admin/manage"
                                            className="rounded-md text-xl lg:text-2xl font-semibold hover:text-redrice-yellow ease-in duration-300"
                                            onClick={playSound}
                                        >
                                            Management
                                        </Link>
                                    )}
                                    <Link
                                        href="/reservation"
                                        className="rounded-md text-xl lg:text-2xl font-semibold hover:text-redrice-yellow ease-in duration-300"
                                        onClick={playSound}
                                    >
                                        Reservation
                                    </Link>
                                    <Link
                                        href="/restaurant"
                                        className="rounded-md text-xl lg:text-2xl font-semibold hover:text-redrice-yellow ease-in duration-300"
                                        onClick={playSound}
                                    >
                                        Restaurant
                                    </Link>

                                    <Link href={'/chat'} onClick={playSound}>
                                        <div className="relative rounded-full hover:border-redrice-yellow p-2 text-3xl hover:text-redrice-yellow ">
                                            <AiFillMessage color="rgb(68 64 60)" />
                                        </div>
                                    </Link>

                                    <Link href={'/profile'} onClick={playSound}>
                                        <div className="relative bg-stone-200 rounded-full bg-grey-200 border-4 border-stone-300 hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                                            <FaUserAlt color="grey" />
                                        </div>
                                    </Link>
                                    <button
                                        title="Sign Out"
                                        onClick={() => {
                                            handleSignOut();
                                            playSound();
                                        }}
                                        className="rounded-lg text-xl lg:text-xl font-semibold hover:text-white bg-redrice-yellow hover:bg-redrice-light-yellow p-2 text-white"
                                    >
                                        <FiLogOut />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="font-bold text-white py-3 px-4 bg-redrice-yellow rounded-[1rem]  hover:text-black ease-in duration-300"
                                onClick={playSound}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        {login ? (
                            <button
                                onClick={toggleNavbar}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-redrice-yellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>

                                {isOpen ? (
                                    <p className="text-2xl">
                                        <IoClose />
                                    </p>
                                ) : (
                                    <p className="text-2xl">
                                        <IoMenu />
                                    </p>
                                )}
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 bg-redrice-yellow">
                        <Link
                            href="/profile"
                            className="text-white block px-3 py-2 text-base font-medium  hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                        >
                            Profile
                        </Link>
                        {userRole === 'admin' && (
                            <Link
                                href="/admin/manage"
                                className="text-white block px-3 py-2 text-base font-medium hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                            >
                                Management
                            </Link>
                        )}
                        <Link
                            href="/reservation"
                            className="text-white block px-3 py-2 text-base font-medium hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                        >
                            Reservation
                        </Link>
                        <Link
                            href="/restaurant"
                            className="text-white block px-3 py-2 text-base font-medium  hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                        >
                            Restaurant
                        </Link>
                        <Link
                            href="/chat"
                            className="text-white block px-3 py-2 text-base font-medium  hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                        >
                            Chat
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="text-white block px-3 py-2 text-base font-medium  hover:text-black hover:font-bold ease-in duration-300 border-b-2"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
