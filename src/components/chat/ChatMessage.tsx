'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { motion } from 'framer-motion';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Message {
  fromUserId: string;
  message: string;
  timeStamp: string;
}

const ChatMessage = ({ message, isSender, timeStamp }: { message: string; isSender: boolean; timeStamp: string }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);


  const formattedTimestamp = dayjs(timeStamp).utc().tz('Asia/Bangkok').format('D MMM YYYY HH:mm');

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2 relative items-center`}>
      {isSender && (
        <motion.div
        className={`text-sm text-gray-500 rounded-full h-[50%] px-2 py-0 relative bg-gray-700 opacity-100 flex justify-center items-center ${
          showTimestamp ? 'inline-block' : 'hidden'
        } -left-[10px] `}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTimestamp ? 1 : 0 }}
        transition={{ duration: 1, delay: showTimestamp ? 2 : 0.1 }} // Adjusted transition for sudden disappearance
      >
        <h1 className="leading-1 text-white">{formattedTimestamp}</h1>
      </motion.div>
      )}
      
      <div
        className={`tablet:max-w-1/2 max-w-[70%] rounded-lg p-3 flex ${
          isSender ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
        onMouseEnter={() => setShowTimestamp(true)}
        onMouseLeave={() => setShowTimestamp(false)}
      >
        <div className={`${isSender ? 'text-white' : 'text-gray-800'} cursor-default`}>{message}</div>
      </div>

      {!isSender && (
        <motion.div
        className={`text-sm text-gray-500 rounded-full h-[50%] px-2 py-0 relative bg-gray-700 opacity-100 flex justify-center items-center ${
          showTimestamp ? 'inline-block' : 'hidden'
        } left-[10px] `}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTimestamp ? 1 : 0 }}
        transition={{ duration: 1, delay: showTimestamp ? 2 : 0.1 }} // Adjusted transition for sudden disappearance
      >
        <h1 className="leading-1 text-white">{formattedTimestamp}</h1>
      </motion.div>
      )}
      


    </div>
  );
};

export default ChatMessage;