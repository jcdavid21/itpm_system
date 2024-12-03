import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineLocalMall } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import ApiConfig from '../../Config/localconfigapi';

function CardFcms() {
    const [totalPurchased, setTotalPurchase] = useState('');
    const [totalFcms, setTotalFcms] = useState('');
    const [totalCcs, setTotalCcs] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiConfig.apiURL}overAllFcms`);
                const { overall, fcms, ccs } = response.data;
    
                setTotalPurchase(overall)
                setTotalFcms(fcms)
                setTotalCcs(ccs);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

  return (
    <div className='flex items-center justify-center'>
        <div className='max-w-screen-lg w-full xl:max-w-screen-2xl xl:overflow-auto overflow-x-scroll mt-4'>
        <div className='flex gap-4 p-4'>
            <div className='shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full'>
                <div className='flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400'>
                    <MdOutlineLocalMall className='text-xl' />
                    <div>Overall</div>
                </div>
                <div className='flex items-center justify-center h-full'>
                    <div className='text-5xl font-medium text-gray-700 mb-10'>
                        {totalPurchased ? totalPurchased : "0"}
                    </div>
                </div>
            </div>

            <div className='shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full'>
                <div className='flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400'>
                    <IoShirt className='text-xl' />
                    <div>FCMS Shirt</div>
                </div>
                <div className='flex items-center justify-center h-full'>
                    <div className='text-5xl font-medium text-gray-700 mb-10'>
                        {totalFcms ? totalFcms : "0"}
                    </div>
                </div>
            </div>

            <div className='shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full'>
                <div className='flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400'>
                    <IoShirt className='text-xl' />
                    <div>CCS Shirt</div>
                </div>
                <div className='flex items-center justify-center h-full'>
                    <div className='text-5xl font-medium text-gray-700 mb-10'>
                        {totalCcs ? totalCcs : "0"}
                    </div>
                </div>
            </div>

        </div>
        </div>
    </div>
  );
}

export default CardFcms