import React from 'react'
import SidebarAd from './SidebarAd';
import { useState, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { IoRemoveCircle } from "react-icons/io5";
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';

function Config() {

    const [showModal, setShowModal] = useState(false);
    const [reportTypes, setReportTypes] = useState([]);
    const [personalData, setPersonalData] = useState([]);
    const [newData, setNewData] = useState('');

    useEffect(()=>{
        try{
            if(JSON.parse(localStorage.getItem('adminData'))){
                const accData = JSON.parse(localStorage.getItem('adminData'));
                setPersonalData(accData);
            }else if(JSON.parse(localStorage.getItem('registrarData'))){
                const accData = JSON.parse(localStorage.getItem('registrarData'));
                setPersonalData(accData);
            }


            const formData = async ()=>{
                const response = await axios.get(`${ApiConfig.apiURL}reportTypes`);
                setReportTypes(response.data);
            }
            formData();
        }catch(err){
            console.error("Error: ", err);
        }
    },[])

    const getPersonalData = ()=>{
        if(personalData.length > 0){
            const data = {
                account_id: personalData[0].account_id,
                full_name: personalData[0].full_name
            }
            return data;
        }
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {account_id, full_name} = getPersonalData();
            console.log(newData);
            if(newData && account_id){
                const response = await axios.post(`${ApiConfig.apiURL}addlist`, {account_id, full_name, newData});
                if(response.status === 200){
                    Swal.fire({
                        title: `Successfully Added!`,
                        text: "The option successfully added in the list.",
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "/config";
                        }
                    })
                }
            }else{
                Swal.fire({
                    title: `Empty Field!`,
                    text: "Please complete the form.",
                    icon: "warning"
                })
            }
        }catch(err){
            console.error("Error: ", err);
        }
    }

    const handleRemove = async (rp_id)=>{
        Swal.fire({
            title: `Are you sure?`,
            text: "This option will remove from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result)=>{
            if(result.isConfirmed){
                const {account_id, full_name} = getPersonalData();
                const deleteData = async ()=>{
                    const response = await axios.put(`${ApiConfig.apiURL}removelist`, {rp_id, account_id, full_name})
                    if(response.status === 200){
                        Swal.fire({
                            title: "Success!",
                            text: "The option successfully deleted in the list.",
                            icon: "success"
                          }).then((result)=>{
                            if(result.isConfirmed){
                                window.location.href = "/config"
                            }
                          })
                    }
                }
                deleteData();
            }
          })
    }

    return (
        <div className='xl:ml-64'>
            <SidebarAd />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-xl w-full'>
                    <div className='text-start text-2xl pb-2 font-medium 
                        border-b border-b-300 mb-5'>
                        Config Data List
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='max-w-screen-lg w-full'>
                            <div className='flex items-center justify-end'>
                                <button onClick={()=>setShowModal(true)}
                                className='flex items-center gap-1 bg-red-700 pt-3 pb-3 pl-6 pr-6
                                rounded-md text-white font-semibold hover:bg-red-600'>
                                <IoIosAddCircle />ADD</button>
                            </div>
                            <div className='text-start mt-5 border border-gray-500 rounded-md overflow-hidden'>
                                <div className='text-red-700 font-medium
                                p-2 border-b border-b-gray-500 text-xl bg-gray-100'>List of Credentials</div>
                                <div className='grid grid-cols-3 gap-3 p-2 mt-3 text-sm 
                                md:text-base'>
                                {reportTypes.map((rp, index)=>(
                                    <div key={index}
                                    defaultValue={rp.rp_id}
                                    className='text-gray-600 border p-2 border-gray-300
                                    flex items-center justify-between'>{rp.rp_type}
                                    <IoRemoveCircle className='text-red-700 cursor-pointer'
                                    onClick={()=> handleRemove(rp.rp_id)}/></div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <>
    {showModal && (
        <>
          <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">Config List</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                    <IoClose className='text-2xl' />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-4">
                        <div className='text-red-700 text-sm font-medium text-start
                        pb-2 border-b border-b-red-700 w-max'>
                            Add List 
                        </div>
                        <div className="col-span-2 flex-grow">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-start text-gray-900">Name</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" 
                            placeholder='Input the name here...'
                            onChange={(e)=>setNewData(e.target.value)} />
                        </div>
                        
                        <div>
                            <button className='bg-red-700 text-white tracking-wider font-medium
                            p-2 pl-6 pr-6 rounded-md hover:bg-red-600'>ADD
                            </button>
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
        </div>
    )
}

export default Config