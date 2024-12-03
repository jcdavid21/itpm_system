import React from 'react'
import Navigation  from './Navbar.jsx';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import ApiConfig from '../Config/localconfigapi.jsx';

function Testimonials() {

    const [feedbacks, setFeedback] = useState([]);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get(`${ApiConfig.apiURL}fetchTest`);

                if(response.status === 200){
                    setFeedback(response.data);
                }else{
                    console.log("Error status");
                }
            }catch(err){
                console.error("Error: ", err);
            }
        }
        fetchData();
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(title && name && message){
                const response = await axios.post(`${ApiConfig.apiURL}submitTest`, {title, name, message});
                if(response.status === 200){
                    Swal.fire({
                        title: "Submitted!",
                        text: "Clic OK to refresh the page",
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "/testimonials"
                        }
                    })
                }else{
                    console.log("Error status");
                }
            }else{
                Swal.fire({
                    title: "Please complete the form!",
                    text: "Please make sure the data are filled",
                    icon: "warning"
                });
            }
        }catch(err){
            console.error("Err: ", err);
        }

    }

    return (
        <div className='h-full'>
            <div className='pt-16 h-96'>
                    <img src={require("../imgs/test.avif")} className="object-cover object-center" alt="" />
                </div>
            <Navigation />
            <div className='h-full mt-10 text-start'>
                <div className='pl-4 pr-4'>
                    <div className='md:grid grid-cols-2 mb-20'>
                        <div className='flex justify-center'>
                            <div className='mb-6 max-w-screen-sm'>
                                <h1 className='text-center
                                font-heading mb-4 font-bold tracking-tight text-red-700 text-3xl sm:text-5xl
                                '>
                                Testimonials</h1>
                                <p className='font-light leading-7 text-center md:pl-20 md:pr-20'>
                                    Dive into our collection of testimonials from students, faculty, and alumni 
                                    to gain insights into the impact of our programs, faculty, and facilities. 
                                    Hear firsthand stories of success, growth, and 
                                    accomplishment that highlight the vibrant spirit of our college 
                                    community.
                                </p>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit} className='grid grid-cols-1 w-full max-w-screen-sm gap-4'>
                                <div className='grid grid-cols-1'>
                                    <label htmlFor="" className='text-sm font-light'>Title<span className='text-red-700'>*</span></label>
                                    <input type="text"  
                                    className='border border-gray-500 rounded-md
                                    text-sm p-2'
                                    placeholder='Enter your Title'
                                    onChange={(e)=> setTitle(e.target.value)}/>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <label htmlFor="" className='text-sm font-light'>Name<span className='text-red-700'>*</span></label>
                                    <input type="text"  
                                    className='border border-gray-500 rounded-md
                                    text-sm p-2'
                                    placeholder='Enter your Name'
                                    onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className='grid grid-cols-1'>
                                    <label htmlFor="" className='text-sm font-light'>Message<span className='text-red-700'>*</span></label>
                                    <textarea name="" id="" cols="30" rows="10" 
                                    className='border border-gray-500 rounded-md p-2'
                                    placeholder='Enter your Message'
                                    onChange={(e)=>setMessage(e.target.value)}></textarea>
                                </div>
                                <button
                                className='mt-4 bg-red-800 text-white
                                p-2 pl-7 pr-7 rounded-md text-lg font-medium tracking-wider
                                hover:bg-red-700 cursor-pointer'>SUBMIT</button>
                            </form>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                    <div className='grid grid-cols-1 gap-7 md:grid md:grid-cols-2 lg:grid-cols-3
                    max-w-screen-xl'>
                        {feedbacks.map((feedback, index)=>(
                            <div key={index} className='shadow-lg bg-gray-50 p-4 rounded-md flex flex-col gap-3'>
                                <h1 className='text-lg font-medium pb-2 border-b border-b-gray-500'>
                                    {feedback.test_title}
                                </h1>
                                    <p className='text-sm font-light'>
                                        "{feedback.test_feedback}”
                                    </p>
                                    <p className='font-medium'>{feedback.test_name}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Testimonials