import React from 'react';
import Footer from './Footer';
import Navigation from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import ApiConfig from '../Config/localconfigapi';

function ContactUs() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(()=>{
        Aos.init({duration: 3000})
    }, [])


    const hanldeSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(name && email && message){
                const response = await axios.post(`${ApiConfig.apiURL}submitcontact`, 
                {name, email, message})

                if(response.status === 200){
                    Swal.fire({
                        title: "Submitted Successfully!",
                        text: "Click OK to refresh the page.",
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "/contact"
                        }
                    })
                }
            }else{
                Swal.fire({
                    title: "Empty field!",
                    text: "Make sure all fields are filled!",
                    icon: "warning"
                });
            }
        }catch(err){
            console.err("Error: ", err);
        }
    }

    return (
        <div>
            <div className='pt-16 h-96 relative'>
                <img src={require("../imgs/contactus.avif")} className="object-cover object-center" style={{filter: `grayscale(30%) blur(1px)`}} alt="" />
            </div>

            <Navigation />
            <section className="pt-2" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mb-4">
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                    <p className="text-base font-semibold uppercase tracking-wide text-gray-700 "
                    data-aos="fade-right">Contact</p>
                    <h2 className="font-heading mb-4 font-bold tracking-tight text-red-700 text-3xl sm:text-5xl"
                    data-aos="fade-left">Get in Touch</h2>
                    </div>
                </div>
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                    <div className="h-full pr-6">
                        <p className="mt-3 mb-12 text-base font-light md:text-lg text-gray-700 dark:text-slate-500"
                        data-aos="fade-up">
                       Our team at Escuela de Corazon of Quezon City is dedicated to supporting our students and their families. Feel free to reach out to us using the form or contact details below. We're always happy to help and look forward to connecting with you!
                        </p>
                        <ul className="mb-6 md:mb-0">
                        <li className="flex items-center text-start">
                            <div data-aos="fade-right" className="flex h-10 w-10 items-center justify-center rounded bg-red-700 text-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                            </svg>
                            </div>
                            <div className="ml-4 mb-4">
                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address</h3>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">1 Esperanza, Novaliches</p>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">Quezon City, Metro Manila</p>
                            </div>
                        </li>
                        <li className="flex items-center text-start">
                            <div data-aos="fade-right" className="flex h-10 w-10 items-center justify-center rounded bg-red-700 text-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                            </svg>
                            </div>
                            <div className="ml-4 mb-4">
                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact</h3>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">Mobile: +63 9565535401</p>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">Mail: escuela_decorazon@yahoo.com.ph</p>
                            </div>
                        </li>
                        <li className="flex items-center text-start">
                            <div data-aos="fade-right" className="flex h-10 w-10 items-center justify-center rounded bg-red-700 text-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                <path d="M12 7v5l3 3"></path>
                            </svg>
                            </div>
                            <div className="ml-4 mb-4">
                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working hours</h3>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">Monday - Friday: 08:00 - 17:00</p>
                            <p data-aos="fade-right" className="text-gray-700 dark:text-slate-500">Saturday &amp; Sunday: 08:00 - 12:00</p>
                            </div>
                        </li>
                        </ul>
                    </div>
                    <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                        <h2 data-aos="fade-left" className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                        <form id="contactForm" onSubmit={hanldeSubmit}>
                        <div className="mb-6">
                            <div className="mx-0 mb-1 sm:mb-4">
                            <div className="mx-0 mb-1 sm:mb-4">
                                <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                                <input data-aos="fade-right" type="text" id="name" autoComplete="given-name" placeholder="Your name" 
                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md 
                                dark:text-gray-700 sm:mb-0" name="name" 
                                onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className="mx-0 mb-1 sm:mb-4">
                                <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                                <input data-aos="fade-left" type="email" id="email" autoComplete="email" placeholder="Your email address" 
                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md
                                dark:text-gray-700 sm:mb-0" name="email"
                                onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            </div>
                            <div className="mx-0 mb-1 sm:mb-4">
                                <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label>
                                <textarea data-aos="fade-right" id="textarea" name="textarea" cols="30" rows="5" 
                                placeholder="Write your message..." className="mb-2 w-full rounded-md border
                                 border-gray-700 py-2 pl-2 pr-4 shadow-md dark:text-gray-700 sm:mb-0"
                                 onChange={(e)=>setMessage(e.target.value)} ></textarea>
                            </div>
                        </div>
                        <div className="text-center">
                            <button data-aos="fade-left" type="submit" className="w-full bg-red-800 text-white 
                            px-6 py-3 font-xl rounded-md sm:mb-0
                            hover:bg-red-700">Send Message</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <Footer />
            </section>
        </div>
    );
}

export default ContactUs;
