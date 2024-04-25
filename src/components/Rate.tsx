'use client';

import { Rating } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import RatingChart from './RatingChart';
import { useSession } from 'next-auth/react';
import { getAllComments } from '@/lib/getComments';
import { useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface Comment {
    restaurantId: number;
    rating: number;
    myComment: string;
    user: {
        name: string;
    };
    // restaurant: {
    //     imageUrl: string;
    // };
}
export function Rate({ restaurantId }: { restaurantId: number }) {
    // setup rating
    const [comments, setComments] = useState<any | null>([]);
    const [sum, setSum] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [rate5, setRate5] = useState(0);
    const [rate4, setRate4] = useState(0);
    const [rate3, setRate3] = useState(0);
    const [rate2, setRate2] = useState(0);
    const [rate1, setRate1] = useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchComments = async () => {
            if (session?.user.token) {
                const fetchedComments = await getAllComments(session.user.token, restaurantId);
                setComments(fetchedComments);
            }
        };
        
        if (session?.user.token) {
            fetchComments();
        }
    }, [session?.user.token]);

    useEffect(() => {
        if (!comments) return;

        const totalCount = comments.length;
        let sum = 0;
        const ratingCounts = [0, 0, 0, 0, 0];

        comments.forEach((comment: Comment) => {
            sum += comment.rating;
            const rating = Math.floor(comment.rating); //ปัดเศษ
            ratingCounts[rating - 1]++;
        });

        setSum(sum);
        const averageRating = (sum / totalCount).toFixed(1);
        setAverageRating(Number(averageRating));

        for (let i = 0; i < 5; i++) {
            const rate = (ratingCounts[i] / totalCount) * 100;
            switch (i) {
                case 0:
                    setRate1(rate);
                    break;
                case 1:
                    setRate2(rate);
                    break;
                case 2:
                    setRate3(rate);
                    break;
                case 3:
                    setRate4(rate);
                    break;
                case 4:
                    setRate5(rate);
                    break;
                default:
                    break;
            }
        }
    }, [comments]);

    const ratingData = [
        { label: '5', percentage: rate5 },
        { label: '4', percentage: rate4 },
        { label: '3', percentage: rate3 },
        { label: '2', percentage: rate2 },
        { label: '1', percentage: rate1 },
    ];
    console.log(rate5)
    console.log(rate4)
    console.log(rate3)
    console.log(rate2)
    console.log(rate1)
    return (
        <div className="rounded-[1rem] p-5 md:p-10 w-full shadow-lg border-2 my-3">
            <div className="flex flex-wrap space-y-4 md:space-y-0">
                <div className="w-full md:w-1/4 flex flex-col justify-center items-center md:pr-5">
                    <h1 className="text-5xl font-semibold text-center">
                        {Number(averageRating)}
                    </h1>
                    <Rating
                        name="read-only"
                        value={Number(averageRating)}
                        precision={0.5}
                        readOnly
                    />
                </div>

                <div className="border-t-2 md:border-t-0 md:border-s-2 w-full md:w-3/4 h-auto pt-5 md:pt-0 md:px-5 flex flex-col justify-center">
                    <RatingChart data={ratingData} />
                </div>
            </div>

            <div className="flex space-x-4 mb-5">
                <button className="bg-redrice-green hover:bg-green-600 px-5 py-1 text-white font-semibold rounded-3xl text-xl w-auto mt-8">
                    Latest
                </button>
                <button className="bg-redrice-green hover:bg-green-600 px-5 py-1 text-white font-semibold rounded-3xl text-xl w-auto mt-8">
                    Text Review
                </button>
            </div>

            <div className="mx-2 overflow-y-auto h-52">
                <div className="">
                    {comments.map((review: Comment, index: number) => (
                        <>
                            <div
                                key={index}
                                className="flex items-center border-b-2"
                            >
                                {/* <Image
                                    src={review.restaurant.imageUrl}
                                    alt={`Profile picture of ${review.user.name}`}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded-full"
                                /> */}

                                <FaUserAlt className="text-2xl mr-4 ml-2" />
                                <div className="flex flex-col mx-4 my-4">
                                    <h4>{review.user.name}</h4>
                                    <Rating
                                        size="small"
                                        value={review.rating}
                                        readOnly
                                    />
                                    <h4 className="pt-3">{review.myComment}</h4>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}