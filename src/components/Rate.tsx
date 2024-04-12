'use client';

import { Rating } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import RatingChart from './RatingChart';

export function Rate() {
    // setup rating
    //const [average, setAverage] = useState<number | null>(4.5);

    const reviews = [
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 5,
            comment: 'อร่อยไม่ซ้ำ จำสูตรไม่ได้',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 3,
            comment: 'รสชาติเยี่ยม',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 2,
            comment: 'คุ้มค่า',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 5,
            comment: 'อร่อยไม่ซ้ำ จำสูตรไม่ได้',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 3,
            comment: 'รสชาติเยี่ยม',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 4,
            comment: 'คุ้มค่า',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 5,
            comment: 'อร่อยไม่ซ้ำ จำสูตรไม่ได้',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 3,
            comment: 'รสชาติเยี่ยม',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 2,
            comment: 'คุ้มค่า',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 5,
            comment: 'อร่อยไม่ซ้ำ จำสูตรไม่ได้',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 3,
            comment: 'รสชาติเยี่ยม',
        },
        {
            userName: 'Jorpor eiei',
            profilePic: '/img/profile.svg',
            rating: 1,
            comment: 'คุ้มค่า',
        },

    ];



    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    
    const averageRating = (sum / reviews.length).toFixed(1);
    
    const rate5 = reviews.filter((review) => review.rating === 5).length/ reviews.length*100;
    const rate4 = reviews.filter((review) => review.rating === 4).length/ reviews.length*100;
    const rate3 = reviews.filter((review) => review.rating === 3).length/ reviews.length*100;
    const rate2 = reviews.filter((review) => review.rating === 2).length/ reviews.length*100;
    const rate1 = reviews.filter((review) => review.rating === 1).length/ reviews.length*100;
    
    console.log(rate5);


    const ratingData = [
        { label: '5', percentage: rate5 },
        { label: '4', percentage: rate4 },
        { label: '3', percentage: rate3 },
        { label: '2', percentage: rate2 },
        { label: '1', percentage: rate1 },
    ];


    return (
        <div className="rounded-[1rem] p-5 md:p-10 w-full lg:w-1/2 shadow-lg border-2 my-6">
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
                    {reviews.map((review, index) => (
                        <>
                            <div
                                key={index}
                                className="flex items-center border-b-2"
                            >
                                <Image
                                    src={review.profilePic}
                                    alt={`Profile picture of ${review.userName}`}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded-full"
                                />
                                <div className="flex flex-col mx-4 my-4">
                                    <h4>{review.userName}</h4>
                                    <Rating
                                        size="small"
                                        value={review.rating}
                                        readOnly
                                    />

                                    <h4 className="pt-3">{review.comment}</h4>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}