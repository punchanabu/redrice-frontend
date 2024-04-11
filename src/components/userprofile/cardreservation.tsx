'use client'
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
export default function CardReservation({
    id,
    name,
    time,
    picture,
}: {
    id: string;
    name: string;
    time: string;
    picture: string;
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0); 

    const openForm = () => {
        setIsOpen(true);
    };

    const closeForm = () => {
        setIsOpen(false);
        setReviewText('');
    };

    const handleReviewSubmit = () => {
        // Perform actions here when submitting review text
        console.log('Submitted review:', reviewText);
        // Close the form after submitting (optional)
        closeForm();
    };


    var createAt =new Date(time)
    console.log(time)
    const hour =(parseInt(time.split('T')[1].split(':')[0])+7)%24
    const minute =parseInt(time.split('T')[1].split(':')[1])
    const newDate = ("00"+hour.toString()).slice(-2)+":"+("00"+minute.toString()).slice(-2)
    return (
        <div className="h-[15%] w-[90%] rounded-lg shadow-md m-1 flex flex-row hover:bg-slate-100">
            <div className="w-[45px] h-[45px] relative rounded-lg  p-5 m-5 ml-5 mr-5  self-center ">
                <Image
                    src={picture}
                    alt="Product Picture"
                    fill={true}
                    className="object-cover rounded-lg "
                />
            </div>
            
            <div className="w-[20%]  m-3  self-center text-sm">{name}</div>

            <div className="w-[100%] relative right-0 m-3 self-center flex flex-row justify-end text-sm ml-3">
                <div className="flex flex-row">
                    <button className="bg-blue-500 text-white rounded-2xl px-3 py-1 mr-3" onClick={openForm}>
                        Review
                    </button>
                    <div className="w-[95%] m-1 self-center flex flex-row text-sm justify-end text-center">
                        <h1 className="mr-5">{newDate}</h1>
                        <h1 className="">{time.split('T')[0]}</h1>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg relative">
                        {/* Close button (X) */}
                        <button
                            className="absolute top-2 right-2 rounded-full text-red-500 hover:bg-red-300"
                            onClick={closeForm}
                        >
                            <AiOutlineCloseCircle size={20} /> {/* Adjust size as needed */}
                        </button>
                        
                        {/* Name centered at the top */}
                        <h2 className="text-2xl font-bold mb-4 text-center">{name}</h2>
                        
                        {/* Rating component */}
                        <div className="mb-4 text-center">
                            <Rating
                                rating={rating}
                                onClick={(value) => setRating(value)}
                                required
                                className="inline-block"
                            />
                        </div>
                        
                        {/* Review textarea */}
                        <textarea
                            rows="4"
                            cols="50"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        ></textarea>
                        
                        {/* Submit button */}
                        <button
                            onClick={handleReviewSubmit}
                            className="bg-green-500 text-white rounded-3xl px-4 py-2 block mx-auto"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
}
