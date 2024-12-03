import React from 'react'
import { useState, useEffect } from 'react';
import Navigation from './Navbar'
import axios from 'axios';
import Footer from './Footer';
import Swal from 'sweetalert2';
import ApiConfig from '../Config/localconfigapi';

function Profile() {

  const [data, setData] = useState([])
  const [fName, setFname] = useState('');
  const [mName, setMname] = useState('');
  const [lName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentID] = useState('');
  const [address, setAddress] = useState('');
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [account_id, setAccId] = useState();

  useEffect(()=>{
    try{
      const fetchData = async ()=>{
        const accData = JSON.parse(localStorage.getItem('accData'));
        const {account_id} = accData[0]

        const response = await axios.get(`${ApiConfig.apiURL}profile`, {params: {account_id}})
        setData(response.data)
        setFname(response.data[0].first_name)
        setMname(response.data[0].middle_name)
        setLname(response.data[0].last_name)
        setEmail(response.data[0].acc_email)
        setStudentID(response.data[0].student_id)
        setAddress(response.data[0].address)
        setBday(new Date(response.data[0].birthdate).toLocaleDateString())
        setGender(response.data[0].gender)
        setContact(response.data[0].contact)
        setAccId(account_id);
      }
      fetchData();
    }catch(err){
      console.error("err: ", err);
    }
  }, [])

  const validateInput = (e) => {
    const input = e.target;
    const sanitizedValue = input.value.replace(/\D/g, ''); // Remove non-digit characters
    input.value = sanitizedValue; // Update the input value
  };

  const hanldeSubmit = async (e) =>{
    e.preventDefault();
      if(fName && lName && address && gender && contact){
        if(contact.length === 11){
          try{
            const response = await axios.put(`${ApiConfig.apiURL}updateProfile`, {fName, mName, lName, address, gender, contact, account_id})

            if(response.status === 200){
              Swal.fire({
                title: "Profile updated!",
                text: "Click OK to refresh the page.",
                icon: "success"
              }).then((result)=>{
                if(result.isConfirmed){
                  window.location.href ="/profile"
                }
              })
            }else{
              console.log("Error update");
            }
          }catch(err){
            console.error("Error: ", err)
          }
        }else{
          Swal.fire({
            title: "Invalid Contact Number",
            text: "Please make sure to input valid contact number.",
            icon: "warning"
          });
        }
      }else{
        Swal.fire({
          title: "Please complete the form!",
          text: "Please make sure the data are filled",
          icon: "warning"
        });
      }
  }

  return (
  
    <div>
      <div className='flex justify-center h-full pt-32'>
        <Navigation />
        <div className='max-w-screen-md  2xl:max-w-screen-lg
            p-4 ml-3 mr-3 w-full md:w-max lg:w-full flex flex-col items-center'>
            <div className='text-start border border-gray-500 p-4 rounded-md
            w-full'>
              <h1 className='text-red-800 font-medium text-2xl
              pb-2 border-b-2 border-b-red-800 mb-8'>Profile</h1>
              <form onSubmit={hanldeSubmit}>
                <div className='grid grid-cols-2 gap-3 mb-4'>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Email</label>
                      <div className='bg-red-600 text-start text-white pt-1 pb-1 pl-2 pr-2 text-sm font-medium
                      tracking-wider rounded-md md:pt-2 md:pb-2 md:text-base'>{email}</div>
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Student ID</label>
                      <div className='bg-red-600 text-start text-white pt-1 pb-1 pl-2 pr-2 text-sm font-medium
                      tracking-wider rounded-md md:pt-2 md:pb-2 md:text-base'>{studentId}</div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">First name <span className='text-red-700'>*</span></label>
                      <input className='border border-gray-700 rounded-md pt-1 
                      pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm' 
                      type="text"
                      defaultValue={fName}  
                      onChange={(e)=> setFname(e.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Middle name</label>
                      <input className='border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm' 
                      type="text"
                      defaultValue={mName}  
                      onChange={(e)=> setMname(e.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Last name <span className='text-red-700'>*</span></label>
                      <input className='border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm' 
                      type="text"
                      defaultValue={lName}  
                      onChange={(e)=> setLname(e.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Address <span className='text-red-700'>*</span></label>
                      <input className='border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm' 
                      type="text"
                      defaultValue={address}  
                      onChange={(e)=> setAddress(e.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Birthdate</label>
                      <input className='border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 
                      md:pt-2 md:pb-2 md:text-base text-sm outline-none cursor-auto
                      bg-gray-100' 
                      type="text"
                      defaultValue={bday}  
                      readOnly />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Gender <span className='text-red-700'>*</span></label>
                      <select name="gender" id="gender" 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} 
                        className="border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm">
                        <option value="Male" defaultValue={gender.toLocaleLowerCase() === "male" ? true : false}>Male</option>
                        <option value="Female" defaultValue={gender.toLocaleLowerCase() === "female" ? true : false}>Female</option>
                        <option value="Other" defaultValue={gender.toLocaleLowerCase() === "other" ? true : false}>Other</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-1 md:text-base text-sm font-light' htmlFor="">Contact <span className='text-red-700'>*</span></label>
                      <input className='border border-gray-700 rounded-md pt-1 pb-1 pl-2 pr-2 md:pt-2 md:pb-2 md:text-base text-sm' 
                      type="text"
                      defaultValue={contact}  
                      onChange={(e)=> setContact(e.target.value)}
                      onInput={(e)=>validateInput(e)} pattern="\d*"
                      maxLength={11} />
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <button type='submit' className='bg-red-700 text-white p-2 pl-10 pr-10
                    mt-6 rounded-full font-bold tracking-widest hover:bg-red-600'>SUBMIT</button>
                  </div>
              </form>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile