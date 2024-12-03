import React from 'react'
import '../styles/general.css'
import login from '../imgs/login.png';
import Navigation  from './Navbar.jsx';
import logo1 from '../imgs/Corazon/logo.png'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ApiConfig from '../Config/localconfigapi';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const verify = await axios.get(`${ApiConfig.apiURL}accountCheck`, {params: {email, password}});
            console.log(verify.data[0]);
                if(verify.data.length > 0){
                    if(verify.data[0].account_status_id === 1){
                        const response = await axios.get(`${ApiConfig.apiURL}login`, {params: {email, password}});
                        if(response.data.length > 0){
                            Swal.fire({
                                title: "Success",
                                text: "Welcome to Escuela De Corazon",
                                icon: "success"
                              }).then((result)=>{
                                if(result){
                                    if(response.data[0].acc_role_id === 1){
                                        localStorage.setItem('accData', JSON.stringify(response.data));
                                        localStorage.setItem('isLoggedIn', JSON.stringify(true));
                                        window.location.href ="/forms";
                                    }else if(response.data[0].acc_role_id ===  2){
                                        localStorage.setItem('adminData', JSON.stringify(response.data))
                                        localStorage.setItem('isLoggedInAdmin', JSON.stringify(true));
                                        window.location.href ="/dashboard";
                                    }else{
                                        localStorage.setItem('registrarData', JSON.stringify(response.data))
                                        localStorage.setItem('isLoggedInReg', JSON.stringify(true));
                                        window.location.href ="/dashboard";
                                    }
                                }
                              })
                        }
                    }else{
                        Swal.fire({
                            title: "Deactivated!",
                            text: "This account is currently deactivated!",
                            icon: "warning"
                        })
                    }
                }else{
                    Swal.fire({
                        title: "Invalid Email or Password",
                        text: "Make sure to enter the valid email and password!",
                        icon: "warning"
                    })
                } 
        }catch(error){
            console.log("Error: ", error);
        }
    }

    return (
        <div className=' overflow-hidden bg-gray-50 h-screen'>
            <Navigation />
            <section className='flex items-center justify-center h-full w-full'>
                <div className='max-w-screen-lg w-full pl-8 pr-8'>
                    <div className='rounded-md bg-white border border-gray-400
                    md:flex overflow-hidden'>
                        <div className=' p-4 flex-1'>
                            <div className='flex items-center gap-24'>
                                <h1 className='text-start font-medium tracking-wider text-2xl text-red-700 border-b-2 border-red-700 w-max pb-1'>
                                    Log In
                                </h1>
                                <div className=' h-20 w-20 md:h-28 md:w-28'>
                                    <img src={logo1} alt="" />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className='mt-7'>
                                <div className='flex flex-col items-start gap-2'>
                                    <label htmlFor="" className='text-sm text-gray-950 tracking-widest font-light'>Email
                                    <span className='text-red-700 font-bold'>*</span></label>
                                    <input type="email" name="email" id="email" placeholder='Enter your email'
                                    className=' md:max-w-96 w-full p-2 text-sm rounded-md border border-gray-400'
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col items-start gap-2 mt-6'>
                                    <label htmlFor="" className='text-sm text-gray-950 tracking-widest font-light'>Password
                                    <span className='text-red-700 font-bold'>*</span></label>
                                    <input type="password" name="password" id="password" placeholder='Enter your password'
                                    className='md:max-w-96 w-full  p-2 text-sm rounded-md border border-gray-400'
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}/>
                                </div>

                                <div className='flex items-start mt-8'>
                                    <button type='submit' className='rounded-md bg-red-700 text-white font-medium
                                    tracking-widest pl-6 pr-6 pt-2 pb-2 hover:bg-red-800'>
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className='hidden md:block flex-1 border-l border-gray-200'>
                            <img src={login} alt="" />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    
    )
}

export default Login    


