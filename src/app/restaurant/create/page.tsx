import React from 'react';
import BackBtn from '@/components/adminmanage/backbtn';
import { mockRestaurant } from '@/mock/restaurant';
import Image from 'next/image';

const CreateReservationPage = () => {
    const restaurantData = mockRestaurant;
    return (
        <div>
            <header className="flex items-center">
                <BackBtn></BackBtn>
                <h2 className="font-semibold text-2xl">
                    Book a Table at {restaurantData.name}
                </h2>
            </header>
            <main className="px-44 py-10 flex space-x-16">
                <section className="w-1/2">
                    <div className="w-[527px] h-[384px] flex items-center justify-center rounded-2xl bg-gray-200 cursor-pointer">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            + upload image
                        </h2>
                    </div>
                </section>
                <section className="rounded-lg p-12 space-y-40 w-1/2 text-lg shadow-lg">
                    <div className="space-y-4">
                        {/* Restaurant Name input field */}
                        <div>
                            <label
                                htmlFor="restaurantName"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Restaurant Name
                            </label>
                            <input
                                type="text"
                                id="restaurantName"
                                name="restaurantName"
                                placeholder="e.g. Mo-Mo-Paradise"
                                className="bg-gray-50 border-2 font-light text-md border-gray-500 text-gray-900 rounded-2xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Address input field */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="eg. Lu Lu พระรามได้ (ไทยดี) สาขา CentralWorld (ชั้น 7) 7th Fl., 999/9 Rama I Road, Pathumwan, Pathumwan, Bangkok 10330, Thailand"
                                className="bg-gray-50 border-2 font-light text-md border-gray-500 text-gray-900 rounded-2xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            ></textarea>
                        </div>
                        {/* Telephone input field */}
                        <div>
                            <label
                                htmlFor="telephone"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Telephone
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                placeholder="e.g. 0922698678"
                                className="bg-gray-50 border-2 font-light text-md border-gray-500 text-gray-900 rounded-2xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Open Time input field */}
                        <div>
                            <label
                                htmlFor="openTime"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Open Time
                            </label>
                            <input
                                type="time"
                                id="openTime"
                                name="openTime"
                                placeholder="e.g. 13:00"
                                className="bg-gray-50 border-2 font-light text-md border-gray-500 text-gray-900 rounded-2xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Close Time input field */}
                        <div>
                            <label
                                htmlFor="closeTime"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Close Time
                            </label>
                            <input
                                type="time"
                                id="closeTime"
                                name="closeTime"
                                placeholder="e.g. 2:00 am"
                                className="bg-gray-50 border-2 font-light text-md border-gray-500 text-gray-900 rounded-2xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>
                    </div>
                    <button className="bg-redrice-yellow px-5 py-3 text-white font-semibold rounded-3xl text-xl w-1/2">
                        Create Restaurant
                    </button>
                </section>
            </main>
        </div>
    );
};

export default CreateReservationPage;
