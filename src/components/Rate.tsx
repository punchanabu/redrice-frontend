'use client';

import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
// const star = (0.5).toString();

export function Rate() {
    const [value1, setValue1] = React.useState<number | null>(2);
    const [value2, setValue2] = React.useState<number | null>(2);
    const [value3, setValue3] = React.useState<number | null>(2);
    const [value4, setValue4] = React.useState<number | null>(2);

    return (
        <div className="rounded-[1rem] p-5 md:p-10 w-full lg:w-1/2  shadow-lg border-2 my-6">
            <div className="flex">
                <div className="w-[30%]">
                    <h1 className="text-5xl font-semibold ps-10 py-1">4.5</h1>
                    <Rating
                        size="large"
                        name="simple-controlled"
                        value={value1}
                        onChange={(event, newValue) => {
                            setValue1(newValue);
                        }}
                    />
                </div>
                <div className="w-[2px] h-auto bg-gray-200"></div>
                <div className="w-[70%] h-auto  px-5 flex flex-col">
                    <div className="flex gap-4">
                        <label htmlFor="r5">5</label>
                        <div
                            className="rounded-full w-[100%] h-[40%] flex bg-slate-200 mt-1.5"
                            id="r5"
                        >
                            <div
                                className={'rounded-full w-[100%] h-full bg-redrice-yellow'}
                            ></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label htmlFor="r4">4</label>
                        <div
                            className="rounded-full w-[100%] h-[40%] flex bg-slate-200 mt-1.5"
                            id="r4"
                        >
                            <div
                                className={`rounded-full w-[80%] h-full bg-redrice-yellow`}
                            ></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label htmlFor="r3">3</label>
                        <div
                            className="rounded-full w-[100%] h-[40%] flex bg-slate-200 mt-1.5"
                            id="r3"
                        >
                            <div
                                className={`rounded-full w-[60%] h-full bg-redrice-yellow`}
                            ></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label htmlFor="r2">2</label>
                        <div
                            className="rounded-full w-[100%] h-[40%] flex bg-slate-200 mt-1.5"
                            id="r2"
                        >
                            <div
                                className={`rounded-full w-[40%] h-full bg-redrice-yellow`}
                            ></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label htmlFor="r1">1</label>
                        <div
                            className="rounded-full w-[100%] h-[40%] flex bg-slate-200 mt-1.5"
                            id="r1"
                        >
                            <div
                                className={`rounded-full w-[20%] h-full bg-redrice-yellow`}
                            ></div>
                        </div>
                    </div>
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
            <div className="mx-8 overflow-y-auto h-52">
                <div className="flex items-center">
                    <Image
                        src={'/img/user/user1.png'}
                        alt="Product Picture"
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                    />
                    <div className="flex flex-col mx-4 my-4">
                        <h4>Jorpor eiei</h4>
                        <Rating
                            size="small"
                            value={value2}
                            onChange={(event, newValue) => {
                                setValue2(newValue);
                            }}
                        />
                    </div>
                </div>
                <h4>อร่อยไม่ซ้ำ จำสูตรไม่ได้</h4>

                <div className="flex items-center">
                    <Image
                        src={'/img/user/user1.png'}
                        alt="Product Picture"
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                    />
                    <div className="flex flex-col mx-4 my-4">
                        <h4>Jorpor eiei</h4>
                        <Rating
                            size="small"
                            value={value3}
                            onChange={(event, newValue) => {
                                setValue3(newValue);
                            }}
                        />
                    </div>
                </div>
                <h4>อร่อยไม่ซ้ำ จำสูตรไม่ได้</h4>

                <div className="flex items-center">
                    <Image
                        src={'/img/user/user1.png'}
                        alt="Product Picture"
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                    />
                    <div className="flex flex-col mx-4 my-4">
                        <h4>Jorpor eiei</h4>
                        <Rating
                            size="small"
                            value={value4}
                            onChange={(event, newValue) => {
                                setValue4(newValue);
                            }}
                        />
                    </div>
                </div>
                <h4>อร่อยไม่ซ้ำ จำสูตรไม่ได้</h4>

            </div>
        </div>
    );
}
