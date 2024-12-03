import React, { useState, useEffect} from 'react';
import axios from 'axios';
import SidebarAd from './SidebarAd';
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';

function CreateAccount() {

    const [formData, setFormData] = useState({
        studentId: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        contact: '',
        birthdate: '',
        gender: '',
        account_id: '',
        full_name: ''
    });

    useEffect(()=>{
        let accData = [];
        if(JSON.parse(localStorage.getItem('adminData'))){
            accData = JSON.parse(localStorage.getItem('adminData'));
        }else if(JSON.parse(localStorage.getItem('registrarData'))){
            accData = JSON.parse(localStorage.getItem('registrarData'));
        }
        const {account_id, full_name} = accData[0]

        formData.account_id = account_id
        formData.full_name = full_name
    }, [])

    const validateInput = (e) => {
        const input = e.target;
        const sanitizedValue = input.value.replace(/\D/g, ''); // Remove non-digit characters
        input.value = sanitizedValue; // Update the input value
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let providedEmail = '';
    
            const {
                studentId,
                email,
                username,
                password,
                confirmPassword,
                role,
                firstName,
                middleName,
                lastName,
                address,
                contact,
                birthdate,
                gender,
            } = formData;
    
            // Function to calculate age
            const calculateAge = (birthdate) => {
                const today = new Date();
                const birthDate = new Date(birthdate);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();
                if (
                    monthDifference < 0 ||
                    (monthDifference === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--;
                }
                return age;
            };
    
            // Prompt for email confirmation
            const emailConfirmation = await Swal.fire({
                title: "Provide the student's email",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Confirm",
                showLoaderOnConfirm: true,
                preConfirm: (inputValue) => {
                    if (!inputValue) {
                        Swal.showValidationMessage("Please enter an email!");
                    }
                    return inputValue;
                },
            });
    
            if (!emailConfirmation.isConfirmed) {
                return; // Stop the process if email confirmation is canceled
            }
    
            providedEmail = emailConfirmation.value;
    
            // Confirm email correctness
            const confirmEmail = await Swal.fire({
                title: `Student email: ${providedEmail}`,
                text: "Please make sure the email is correct",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Proceed",
                cancelButtonText: "Cancel",
            });
    
            if (!confirmEmail.isConfirmed) {
                return; // Stop the process if email confirmation is canceled
            }
    
            // Show a spinner before starting the submission
            Swal.fire({
                title: "Submitting...",
                text: "Please wait while we process your request.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
    
            // Proceed with form validation and submission
            if (
                studentId &&
                email &&
                username &&
                password &&
                confirmPassword &&
                role &&
                firstName &&
                lastName &&
                address &&
                contact &&
                birthdate &&
                gender
            ) {
                if (contact.length === 11) {
                    if (password === confirmPassword) {
                        const age = calculateAge(birthdate);
                        if (age >= 12) {
                            // Include the confirmed email in formData
                            const updatedFormData = { ...formData, providedEmail: providedEmail };
    
                            const response = await axios.post(`${ApiConfig.apiURL}create-account`, updatedFormData);
    
                            Swal.close(); // Turn off the spinner after the response
                            
                            if (response.status === 200) {
                                Swal.fire({
                                    title: "Account Created!",
                                    text: "Account created successfully",
                                    icon: "success",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = "/createaccount";
                                    }
                                });
                            } else if (response.status === 299) {
                                Swal.fire({
                                    title: "Email or Student ID already exists!",
                                    text: "Please make sure the Email or Student ID are unique.",
                                    icon: "warning",
                                });
                            }
                        } else {
                            Swal.fire({
                                title: "Invalid Birthdate",
                                text: "Age must be at least 12 years old.",
                                icon: "warning",
                            });
                        }
                    } else {
                        Swal.fire({
                            title: "Invalid Password",
                            text: "Make sure your password is correct",
                            icon: "warning",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Invalid Contact",
                        text: "Contact number should be 11 digits",
                        icon: "warning",
                    });
                }
            } else {
                Swal.fire({
                    title: "Incomplete Fields!",
                    text: "Please make sure all fields are filled",
                    icon: "warning",
                });
            }
        } catch (error) {
            console.error("Error creating account:", error);
            Swal.close(); // Ensure the spinner is turned off in case of an error
            Swal.fire({
                title: "Error",
                text: "There was an error while creating the account. Please try again later.",
                icon: "error",
            });
        }
    };
    

    
    return (
        <div className='xl:ml-64 xl:h-screen'>
            <SidebarAd />
            <div className='flex items-center justify-center p-4 h-full'>
                <div className='max-w-screen-xl w-full'>
                    <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>
                        Create Account
                    </div>
                    <div className='border border-gray-500 rounded-md p-4'>
                        <form onSubmit={handleSubmit}>

                            <div className='mb-4'>
                                <div className='border-b border-b-red-700 pb-2 mb-4
                                text-red-700 font-medium text-lg md:text-2xl'>
                                    Account Details
                                </div>
                                <div className='flex flex-col gap-3 mb-4 md:grid md:grid-cols-2
                                xl:grid-cols-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="studentId" className='font-light text-sm text-start mb-1'>
                                            Student ID
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="text" id='studentId' placeholder='Type Student ID'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.studentId}
                                        onChange={handleChange}
                                         />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="email" className='font-light text-sm text-start mb-1'>
                                            Email
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="email" id='email' placeholder='Type Email'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="username" className='font-light text-sm text-start mb-1'>
                                            Username 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="text" id='username' placeholder='Type Username'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.username}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="password" className='font-light text-sm text-start mb-1'>
                                            Password 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="password" id='password' placeholder='Type Password'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.password}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="confirmPassword" className='font-light text-sm text-start mb-1'>
                                            Confirm Password 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="password" id='confirmPassword' placeholder='Confirm Password'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.confirmPassword}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="role" className='font-light text-sm text-start mb-1'>
                                            Account Role
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <select name="role" id="role" className='border border-gray-500 p-2 text-sm rounded-lg'
                                        onChange={handleChange} >
                                            <option defaultValue="" selected disabled>Select Role...</option>
                                            <option value="1">Student</option>
                                            <option value="2">Admission</option>
                                            <option value="3">Registrar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-7'>
                                <div className='border-b border-b-red-700 pb-2 mb-4
                                text-red-700 font-medium text-lg md:text-2xl'>Personal Details</div>
                                <div className='flex flex-col gap-3 mb-4 md:grid md:grid-cols-2
                                xl:grid-cols-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="firstName" className='font-light text-sm text-start mb-1'>
                                            First name 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="text" id='firstName' placeholder='Type First Name'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.firstName}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="middleName" className='font-light text-sm text-start mb-1'>
                                            Middle name
                                        </label>
                                        <input type="text" id='middleName' placeholder='Type Middle Name'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.middleName}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="lastName" className='font-light text-sm text-start mb-1'>
                                            Last name 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="text" id='lastName' placeholder='Type Last Name'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.lastName}
                                        onChange={handleChange} />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3 mb-4 md:grid md:grid-cols-2'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="address" className='font-light text-sm text-start mb-1'>
                                            Address 
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="text" id='address' placeholder='Type Address'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.address}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="contact" className='font-light text-sm text-start mb-1'>
                                            Contact
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        
                                        <input type="text" id='contact' placeholder='Type Contact Number'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        onInput={(e)=>validateInput(e)} pattern="\d*"
                                        maxLength={11} 
                                        value={formData.contact}
                                        onChange={handleChange}/>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="birthdate" className='font-light text-sm text-start mb-1'>
                                            Birthdate
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <input type="date" id='birthdate'
                                        className='border border-gray-500 p-2 text-sm rounded-lg'
                                        value={formData.birthdate}
                                        onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="gender" className='font-light text-sm text-start mb-1'>
                                            Gender
                                            <span className='text-red-600 text-base'>*</span>
                                        </label>
                                        <select name="gender" id="gender" className='border border-gray-500 p-2 text-sm rounded-lg'
                                        onChange={handleChange}>
                                            <option defaultValue="" selected disabled>Select Gender...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <button className='bg-red-700 text-white p-2 pl-8 pr-8 rounded-md
                                 font-medium tracking-wider hover:bg-red-600'>
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount