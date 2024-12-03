import React, { useState, useEffect } from 'react';
import { CiUser } from "react-icons/ci";
import { AiFillPieChart } from "react-icons/ai";
import logo1 from '../../imgs/olfu-logo.png';
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { IoBagCheck, IoBagRemoveOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuAlignLeft } from "react-icons/lu";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrAnnounce } from "react-icons/gr";

function SidebarFcms() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [accData, setAccData] = useState([]);
    const [isSideOpen, setSideBar] = useState(false);
    const [isAccountOpen, setAccountOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);

    useEffect(()=>{
        const isUserLoggedIn = JSON.parse(localStorage.getItem('isLoggedInFcms')) === true;
        const accData =  JSON.parse(localStorage.getItem('fcmsData'));
        setLoggedIn(isUserLoggedIn);
        setAccData(accData);
    },[])

    const handleAccountClick = () => {
        setAccountOpen(!isAccountOpen);
    };

    const handleReportsClick = () => {
        setReportsOpen(!isReportsOpen);
    };

    const handleSideClick = ()=>{
        setSideBar(!isSideOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('isLoggedInReg');
        localStorage.removeItem('regData');
        setLoggedIn(false);
        window.location.href = "/login";
    };

    return (
        <div>
            <div className='text-4xl p-4 xl:hidden'>
                <LuAlignLeft className='cursor-pointer'
                onClick={handleSideClick} />
            </div> 
            <div className={isSideOpen ? 'z-50 fixed md:w-64 w-0 xl:left-0 -left-full top-0 bottom-0 shadow-lg xl:p-4 bg-red-900 transition-all duration-300' 
            : 'z-50 fixed top-0 bottom-0 w-64 shadow-lg md:w-64 left-0 p-4 bg-red-900 transition-all duration-300'}>
                <div className='flex justify-end text-2xl text-white xl:hidden'>
                    <IoIosCloseCircleOutline onClick={handleSideClick} 
                    className="cursor-pointer hover:bg-red-700 rounded-full" />
                </div>
                <div className='flex items-center justify-center h-20 mb-5'>
                    <img src={logo1} className="rounded-full object-contain" alt="" />
                </div>
                <div className='text-white flex flex-col gap-4 pb-2 w-full text-nowrap'>
                    <div className='flex flex-col gap-2 border-b border-b-white mb-5'>
                        <div className='flex items-center pb-4 gap-2 text-lg cursor-pointer'>
                            <CiUser className='text-xl' />
                            <div>{accData && accData.length > 0 ? accData[0].full_name : "N/A"}</div>
                        </div>
                        <div className='flex items-center pb-4 gap-2 text-lg cursor-pointer'>
                            <RiGitRepositoryPrivateLine className='text-xl' />
                            <div>FCMS</div>
                        </div>
                    </div>
                    <Link to="/dashboardfcms">
                        <div className='flex items-center pb-4 gap-2 text-lg font-medium cursor-pointer'>
                            <AiFillPieChart className='text-xl' />
                            <div>Dashboard</div>
                        </div>
                    </Link>

                    <Link to='/announcements'>
                        <div className="overflow-hidden">
                            <div className='flex items-center justify-between cursor-pointer' onClick={handleAccountClick}>
                                <div className='flex items-center pb-4 gap-2 text-lg font-medium'>
                                    <GrAnnounce className='text-xl' />
                                    <div>Announcements</div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/toclaim'>
                        <div className="overflow-hidden">
                            <div className='flex items-center justify-between cursor-pointer' onClick={handleReportsClick}>
                                <div className='flex items-center pb-4 gap-2 text-lg font-medium'>
                                    <IoBagRemoveOutline className='text-xl' />
                                    <div>To Claim Items</div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/claimeditems'>
                        <div className="overflow-hidden">
                            <div className='flex items-center justify-between cursor-pointer' onClick={handleReportsClick}>
                                <div className='flex items-center pb-4 gap-2 text-lg font-medium'>
                                    <IoBagCheck className='text-xl' />
                                    <div>Claimed Items</div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className='absolute bottom-0 text-white flex items-center pb-4 gap-2 
                text-lg font-medium cursor-pointer'
                onClick={handleLogout}>
                    <FaSignOutAlt className='text-xl' />
                    <div>Log out</div>
                </div>

            </div>
        </div>
    );
}

export default SidebarFcms