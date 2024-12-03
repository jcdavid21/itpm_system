import React from 'react'
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import Navigation from './Navbar'
import axios from 'axios';
import ApiConfig from '../Config/localconfigapi';

function ResetPass() {

    const [password, setPassword] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [account_id, setAccId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accData = JSON.parse(localStorage.getItem('accData'));
                const { account_id } = accData[0];
                setAccId(account_id);

                const response = await axios.get(`${ApiConfig.apiURL}getpass`, {
                    params: { account_id } 
                });
                setPassword(response.data[0].acc_password);
            } catch (err) {
                console.log("Err: ", err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (e) =>{
        e.preventDefault();
        try{
            if(currentPass && newPass && confirmPass){
                if(currentPass === password){
                    if(newPass === confirmPass){
                        const response = await axios.put(`${ApiConfig.apiURL}updatepass`, 
                        {newPass, account_id})

                        if(response.status === 200){
                            Swal.fire({
                                title: "Password updated!",
                                text: "Click OK to refresh the page.",
                                icon: "success"
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.href = "/resetPass"
                                }
                            })
                        }
                    }else{
                        Swal.fire({
                            title: "New password does not match!",
                            text: "Make sure your new password and confirm password are match!",
                            icon: "warning"
                        });
                    }

                }else{
                    Swal.fire({
                        title: "Invalid Current Password",
                        text: "Current password does not match!",
                        icon: "warning"
                      });
                }
            }else{
                Swal.fire({
                    title: "Invalid password",
                    text: "Make sure all fields are filled!",
                    icon: "warning"
                  });
            }
        }catch(err){
            console.error("Error: ", err);
        }

    }
    

    return (
        <div>
            <div className='flex justify-center h-full pt-32'>
                <Navigation />
                <div className='max-w-screen-sm
                p-4 ml-3 mr-3 w-full flex flex-col items-center'>
                    <div className='text-start border border-gray-500 p-4 rounded-md w-full'>
                        <h1 className='text-red-800 font-medium text-2xl
                        pb-2 border-b-2 border-b-red-800 mb-8'>Reset Password</h1>
                        <form onSubmit={handleUpdate}>
                            <div className='grid grid-cols-1'>
                                <div className='flex flex-col mb-5'>
                                    <label className='mb-1 md:text-base text-sm font-light' 
                                    htmlFor="">Current Password<span className='text-red-700'>*</span> </label>
                                    <input type="password"
                                    className='border border-gray-700 rounded-md pt-1 
                                    pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm'
                                    onChange={(e)=>setCurrentPass(e.target.value)} />
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='flex flex-col'>
                                        <label className='mb-1 md:text-base text-sm font-light' 
                                        htmlFor="">New Password<span className='text-red-700'>*</span> </label>
                                        <input type="password"
                                        className='border border-gray-700 rounded-md pt-1 
                                        pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm'
                                        onChange={(e)=>setNewPass(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='mb-1 md:text-base text-sm font-light' 
                                        htmlFor="">Confirm Password<span className='text-red-700'>*</span> </label>
                                        <input type="password"
                                        className='border border-gray-700 rounded-md pt-1 
                                        pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm'
                                        onChange={(e)=>setConfirmPass(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button className='bg-red-700 text-white p-2 pl-10 pr-10
                                    mt-6 rounded-full font-bold tracking-widest hover:bg-red-600'>
                                        SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ResetPass