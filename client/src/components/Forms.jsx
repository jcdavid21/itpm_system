import React, { useState, useEffect } from 'react';
import Navigation from './Navbar.jsx';
import { MdOutlinePermIdentity, MdOutlineSchool, MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import ApiConfig from '../Config/localconfigapi.jsx';

function Forms() {
    const [accData, setAccData] = useState([]);
    const [choices, setChoices] = useState([]);
    const [requirements, setRequirements] = useState({
        credential: '',
        studentType: '',
        file: '',
        message: ''
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('accData')) || [];
        console.log("Acc Data:", data); // Debugging line
        setAccData(Array.isArray(data) ? data : []);  // Ensure accData is an array

        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiConfig.apiURL}choices`);
                console.log("Choices Data:", response.data); // Debugging line
                setChoices(Array.isArray(response.data) ? response.data : []);  // Ensure choices is an array
            } catch (err) {
                console.error("Error fetching choices: ", err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (id === 'file') {
            setRequirements((prev) => ({ ...prev, [id]: files[0] }));
        } else {
            setRequirements((prev) => ({ ...prev, [id]: value }));
        }
    
        // Log the updated requirements state after each change
        setTimeout(() => console.log("Updated Requirements:", requirements), 0);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log("Requirements:", requirements); // Debugging line
            // Check if all fields are filled out
            if (requirements.credential === '' || requirements.studentType === '' || requirements.file === '') {
                Swal.fire({
                    title: "Warning",
                    text: "Please fill out all fields.",
                    icon: "warning"
                });
                return;
            }
            
            // Validate file type
            const file = requirements.file;
            const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!validFileTypes.includes(file.type)) {
                Swal.fire({
                    title: "Invalid File Type",
                    text: "Only JPG, JPEG, and PNG files are allowed.",
                    icon: "error"
                });
                return;
            }
        
            // Validate file size (e.g., minimum 200KB for quality check)
            const minFileSize = 200 * 1024; // 200KB
            if (file.size < minFileSize) {
                Swal.fire({
                    title: "Low Quality Image",
                    text: "Image file size is too small. Please upload a higher quality image.",
                    icon: "error"
                });
                return;
            }
        
            // Validate image resolution (e.g., at least 800x600) using a Promise to handle the asynchronous check
            const checkImageResolution = () => {
                return new Promise((resolve, reject) => {
                    const image = new Image();
                    image.src = URL.createObjectURL(file);
                    image.onload = () => {
                        if (image.width >= 800 && image.height >= 600) {
                            resolve(true); // Passes resolution check
                        } else {
                            reject("Image resolution is too low. Please upload an image of at least 800x600 pixels.");
                        }
                    };
                    image.onerror = () => reject("Failed to load image for resolution check.");
                });
            };
        
            try {
                await checkImageResolution(); // Ensure the resolution check passes before proceeding
            } catch (error) {
                Swal.fire({
                    title: "Low Quality Image",
                    text: error,
                    icon: "error"
                });
                return;
            }
    
            // Prepare FormData if all checks are passed
            const formData = new FormData();
            formData.append('file', file);
            formData.append('credential', requirements.credential);
            formData.append('studentType', requirements.studentType);
            formData.append('message', requirements.message);
            formData.append('acc_id', accData[0].account_id);

                        // Log each key-value pair in FormData for debugging
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
                        
            // Submit the form data to the server
            const check_ifAlreadySubmitted = await axios.get(`${ApiConfig.apiURL}checkIfAlreadySubmitted`, {params: {account_id: accData[0].account_id, credential: requirements.credential}});

            if(check_ifAlreadySubmitted.data.length > 0){
                Swal.fire({
                    title: "Submission Failed",
                    text: "You have already submitted this form.",
                    icon: "error"
                });
                return;
            }

            const response = await axios.post(`${ApiConfig.apiURL}submitForm`, formData);
            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Form submitted successfully.",
                    icon: "success"
                }).then((result) => {
                    if (result) {
                        window.location.href = '/forms';
                    }
                });
            }else{
                Swal.fire({
                    title: "Submission Failed",
                    text: "There was an error submitting the form. Please try again.",
                    icon: "error"
                });
            }
        } catch (err) {
            console.error("Error: ", err);
            Swal.fire({
                title: "Submission Failed",
                text: "There was an error submitting the form. Please try again.",
                icon: "error"
            });
        }
    };
    
    

    return (
        <div className='bg-gray-50'>
            <Navigation />
            <Sidebar />
            <div className='flex items-center justify-center h-full pt-32 pb-14'>
                <div className='max-w-screen-md 2xl:max-w-screen-lg p-4 rounded-md ml-3 mr-3 w-full md:w-max lg:w-full flex flex-col items-center justify-center'>
                    {
                        Array.isArray(accData) && accData.length > 0 ? (
                            accData.map((data, index) => {
                                const { full_name, acc_role, birthdate, acc_email } = data;
                                const date = new Date(birthdate);
                                const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                                return (
                                    <div key={index} className='container border border-gray-500 p-4 rounded-md ml-3 mr-3 w-full'>
                                        <h1 className='text-start mb-5 text-lg tracking-wide font-medium text-red-700 pb-1 border-b-2 border-red-800 w-max md:text-2xl'>Form</h1>
                                        <form onSubmit={(e)=>handleSubmit(e)} className='overflow-auto' style={{ maxHeight: "600px" }}>
                                            <div className='grid grid-cols-2 flex-wrap gap-1'>
                                                <div className='flex gap-x-2 text-red-800 font-medium items-center border border-gray-500 p-1 pl-3 pr-3 text-sm rounded-md truncate md:text-base'>
                                                    <MdOutlinePermIdentity />
                                                    <div className='truncate'>{full_name}</div>
                                                </div>
                                                <div className='flex flex-wrap gap-x-2 text-red-800 font-medium items-center border border-gray-500 p-1 pl-3 pr-3 text-sm rounded-md md:text-base'>
                                                    <MdOutlineSchool />
                                                    <div>{acc_role}</div>
                                                </div>
                                                <div className='flex flex-wrap gap-x-2 text-red-800 font-medium items-center border border-gray-500 p-1 pl-3 pr-3 text-sm rounded-md md:text-base'>
                                                    <MdOutlineDateRange />
                                                    <div>{fullDate}</div>
                                                </div>
                                                <div className='flex gap-x-2 text-red-800 font-medium items-center border border-gray-500 p-1 pl-3 pr-3 text-sm rounded-md truncate md:text-base'>
                                                    <MdOutlineEmail />
                                                    <div className='truncate'>{acc_email}</div>
                                                </div>
                                            </div>
                                            <select name="credential" id="credential" className='w-full pt-2 pb-2 mt-2 rounded-md border border-gray-500 text-red-800'
                                                onChange={handleChange}>
                                                <option value=''>Select Credential Type</option>
                                                {
                                                    Array.isArray(choices) && choices.length > 0 ? (
                                                        choices.map((choice, index) => (
                                                            <option key={index} value={choice.rp_id}>{choice.rp_type}</option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No choices available</option>
                                                    )
                                                }
                                            </select>

                                            <select name="studentType" id="studentType" className='w-full pt-2 pb-2 mt-2 rounded-md border border-gray-500 text-red-800'
                                            onChange={(e)=>handleChange(e)}>
                                                <option value=''>Select Student Type</option>
                                                <option value='New Student'>New Student</option>
                                                <option value='Old Student'>Old Student</option>
                                            </select>
                                            <input type="file" id="file" name="file"
                                            className='w-full pt-2'
                                            onChange={(e)=>handleChange(e)} />
                                            <textarea name="message" id="message" cols="30" rows="8" placeholder='Add your remarks here.'
                                                className='border border-gray-500 w-full mt-3 rounded-md p-2'
                                                onChange={(e)=>handleChange(e)}>
                                            </textarea>
                                            <div className='flex justify-start'>
                                                <button type='submit' className='mt-4 bg-red-800 text-white p-2 pl-7 pr-7 rounded-md text-lg font-medium tracking-wider hover:bg-red-700 cursor-pointer'>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No account data available.</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Forms;
