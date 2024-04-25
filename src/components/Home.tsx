'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';


const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="p-20">
      <motion.div
        className="w-full min-h-[400px] flex justify-center items-center opacity-80 space-x-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="space-y-10 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-black text-6xl font-bold text-shadow opacity-100"
            variants={itemVariants}
          >
            You Eat What You Get
          </motion.h1>
          <motion.p
            className="text-gray-600 text-center text-2xl"
            variants={itemVariants}
          >
            Discover a collection of simple and delicious recipes for every occasion.
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-yellow-500 to-red-500 text-white p-5 rounded-2xl text-2xl font-bold"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/restaurant">Book a Reservation</Link>
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-20 flex justify-center space-x-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center space-y-10"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Image src = {'/img/hamburger.svg'} alt="Recipe" width={100} height={100} />
          <motion.h2
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Ease of Booking 
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center"
            variants={itemVariants}
          >
            Discover a collection of simple and delicious recipes for every occasion.
          </motion.p>
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center space-y-10"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Image src = {'/img/drumstick.svg'} alt="Drumstick" width={100} height={100} />
          <motion.h2
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Get Your Best Experience
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center"
            variants={itemVariants}
          >
            Learn helpful tips and techniques to enhance your cooking skills.
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-5xl font-bold text-center mb-10"
          variants={itemVariants}
        >
          Trusted By
        </motion.h2>
        <motion.div
          className="flex justify-center space-x-10"
          variants={itemVariants}
        >
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/microsoft.png"
              alt="Microsoft Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/momo.png"
              alt="Apple Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/suki.png"
              alt="Google Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/bitkub.jpg"
              alt="Facebook Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/bbq.jpg"
              alt="Facebook Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.div
            className="w-40 h-40 bg-white rounded-lg flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/img/logo/kub.png"
              alt="Facebook Logo"
              width={120}
              height={120}
            />
          </motion.div>
        </motion.div>
        </motion.div>
    </div>
  );
};

export default Home;