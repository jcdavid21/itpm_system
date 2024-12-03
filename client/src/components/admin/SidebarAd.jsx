import React, { useState, useEffect } from 'react';
import { CiUser } from "react-icons/ci";
import { AiFillPieChart } from "react-icons/ai";
import logo1 from '../../imgs/Corazon/logo.png';
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidUserAccount } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { AiOutlineAudit } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuAlignLeft } from "react-icons/lu";
import { FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsDatabaseAdd } from "react-icons/bs";


function SidebarAd() {
    const [accData, setAccData] = useState([]);
    const [isSideOpen, setSideBar] = useState(false);
    const [isAccountOpen, setAccountOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('adminData'))){
            const accData = JSON.parse(localStorage.getItem('adminData'));
            setAccData(accData);
        }else if(JSON.parse(localStorage.getItem('registrarData'))){
            const accData = JSON.parse(localStorage.getItem('registrarData'));
            setAccData(accData);
        }

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
        localStorage.removeItem('isLoggedInAdmin');
        localStorage.removeItem('adminData');
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
                            <div>Admin</div>
                        </div>
                    </div>
                    <Link to="/dashboard">
                        <div className='flex items-center pb-4 gap-2 text-lg font-medium cursor-pointer'>
                            <AiFillPieChart className='text-xl' />
                            <div>Dashboard</div>
                        </div>
                    </Link>

                    <div className="overflow-hidden">
                        <div className='flex items-center justify-between cursor-pointer' onClick={handleAccountClick}>
                            <div className='flex items-center pb-4 gap-2 text-lg font-medium'>
                                <BiSolidUserAccount className='text-xl' />
                                <div>Accounts</div>
                            </div>
                            {isAccountOpen ? <IoIosArrowUp className='text-lg -mt-2' /> : <IoIosArrowDown className='text-lg -mt-2' />}
                        </div>
                        {isAccountOpen && (
                            <div className='pl-7 text-start'>
                                <Link to="/accountlist">
                                    <div className='pb-4 font-medium cursor-pointer'>
                                        <div>Student List</div>
                                    </div>
                                </Link>
                                <Link to="/createaccount">
                                    <div className='pb-4 font-medium cursor-pointer'>
                                        <div>Create Account</div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="overflow-hidden">
                        <div className='flex items-center justify-between cursor-pointer' onClick={handleReportsClick}>
                            <div className='flex items-center pb-4 gap-2 text-lg font-medium'>
                                <BiSolidReport className='text-xl' />
                                <div>Requests</div>
                            </div>
                            {isReportsOpen ? <IoIosArrowUp className='text-lg -mt-2' /> : <IoIosArrowDown className='text-lg -mt-2' />}
                        </div>
                        {isReportsOpen && (
                            <div className='pl-7 text-start'>
                                <Link to='/reportlist'>
                                    <div className='pb-4 font-medium cursor-pointer'>
                                        <div>Pending Lists</div>
                                    </div>
                                </Link>
                                <Link to='/reporthistory'>
                                    <div className='pb-4 font-medium cursor-pointer'>
                                        <div>Completed Lists</div>
                                    </div>
                                </Link>
                                <Link to='/declinedReport'>
                                    <div className='pb-4 font-medium cursor-pointer'>
                                        <div>Declined Lists</div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/contactlist">
                        <div className='flex items-center pb-4 gap-2 text-lg font-medium cursor-pointer'>
                            <FaEnvelope className='text-xl' />
                            <div>Contact</div>
                        </div>
                    </Link>

                    <Link to="/config">
                        <div className='flex items-center pb-4 gap-2 text-lg font-medium cursor-pointer'>
                            <BsDatabaseAdd className='text-xl' />
                            <div>Config</div>
                        </div>
                    </Link>

                    <Link to='/trailogs'>
                        <div className='flex items-center pb-4 gap-2 text-lg font-medium cursor-pointer'>
                            <AiOutlineAudit className='text-xl' />
                            <div>Trail Logs</div>
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

export default SidebarAd;
