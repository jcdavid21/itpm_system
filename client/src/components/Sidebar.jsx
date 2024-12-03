import React, { useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { LuFileCheck } from "react-icons/lu";
import { RiChatDeleteLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sidebarItems = [
        { title: 'Forms', icon: <MdOutlineDashboard />, path: "/forms" },
        { title: 'Appointment', icon: <PiShoppingBagOpenBold />, path: "/appointment" },
        { title: 'Pending Forms', icon: <MdOutlinePendingActions />, path: `/table/${1}` },
        { title: 'Accepted Forms', icon: <LuFileCheck />, path: `/table/${2}` },
        { title: 'Declined Forms', icon: <RiChatDeleteLine />, path: `/table/${3}` },
        { title: 'Help', icon: <IoIosHelpCircleOutline />, path: "/help" }
    ];

    return (
        <div>
            {/* Mobile Sidebar */}
            <div className='xl:hidden xl:pointer-events-none z-10'>
                {!isOpen && (
                    <div className='absolute top-24 left-0 ml-4 text-2xl'>
                        <FaArrowRight onClick={toggleSidebar} className='cursor-pointer' />
                    </div>
                )}
                <div className={isOpen ? 'bg-red-900 fixed left-0 top-16 bottom-0 w-60 z-50 duration-500' : 'duration-500 fixed -left-full'}>
                    <div className='text-white flex justify-end mt-3 mr-4 mb-10 text-2xl'>
                        <IoMdCloseCircle onClick={toggleSidebar} className='hover:text-red-600 duration-100 cursor-pointer' />
                    </div>
                    <div className={isOpen ? 'block' : 'hidden'}>
                        {sidebarItems.map((item, index) => (
                            <Link key={index} to={item.path}>
                                <div className={`p-5 flex items-center font-medium text-lg cursor-pointer
                                    border-none hover:bg-white hover:text-red-700 duration-0 text-white 
                                    ${location.pathname === item.path ? 'bg-red-600 ' : 'bg-red-900'}`}>
                                    {item.icon}
                                    <span className='ml-2'>{item.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className='z-10 max-xl:hidden max-xl:pointer-events-none fixed left-0 top-0 bottom-0 mt-16 bg-red-900 w-60'>
                <div className='pt-7'>
                    {sidebarItems.map((item, index) => (
                        <Link key={index} to={item.path}>
                            <div className={`p-5 pl-6 flex items-center font-medium text-lg cursor-pointer 
                                border-none hover:bg-white hover:text-red-700 duration-0 text-white 
                                ${location.pathname === item.path ? 'bg-red-600 ' : 'bg-red-900'}`}>
                                {item.icon}
                                <span className='ml-2'>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
