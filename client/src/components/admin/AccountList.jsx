import React from 'react'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoClose } from "react-icons/io5";
import SidebarAd from './SidebarAd';
import { FcCancel } from "react-icons/fc";
import ApiConfig from '../../Config/localconfigapi';
import DeactAcc from './DeactAcc';

function AccountList() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [accId, setAccId] = useState('');
    const [selectedData, setSelectedData] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [middle_name, setMidName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact]= useState('');
    const [newPass, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [account_id, setAccountId] = useState('');
    const [full_name, setFullName] = useState('');

    const columns1 = [
        {
            name: "Student ID",
            selector: row => row.student_id,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.acc_email,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.full_name,
            sortable: true
        },
        {
            name: "Role",
            selector: row => <div className='bg-cyan-800 text-white p-1 pl-2 pr-2 w-16 rounded-md'>{row.acc_role}</div>,
            sortable: true
        },
        {
            name: "Address",
            selector: row => row.address,
            sortable: true
        },
        {
            name: "Contact",
            selector: row => row.contact,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <div className='flex items-center gap-1'>
                <FaRegEdit 
                className='text-2xl text-blue-500 cursor-pointer' 
                onClick={() => handleShowModal(row)} />
                <div className='text-2xl text-red-500 cursor-pointer'
                onClick={()=> handleDeact(row)} ><FcCancel /></div>
            </div>
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                let accData = [];
                if(JSON.parse(localStorage.getItem('adminData'))){
                    accData = JSON.parse(localStorage.getItem('adminData'));
                }else if(JSON.parse(localStorage.getItem('registrarData'))){
                    accData = JSON.parse(localStorage.getItem('registrarData'));
                }
                const {account_id, full_name} = accData[0]
                const response = await axios.get(`${ApiConfig.apiURL}allAccounts`);
                
                setAccountId(account_id);
                setFullName(full_name);
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.account_id === row.account_id);
        if (index !== -1) {
            const account_id = records[index].account_id
            setFirstName(records[index].first_name);
            setMidName(records[index].middle_name);
            setLastName(records[index].last_name);
            setAddress(records[index].address);
            setContact(records[index].contact);
            setSelectedData(records[index]);
            setAccId(account_id);
            setShowModal(true);
            
        } else {
            console.error("Row index not found");
        }
    };

    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.student_id.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    const handleDeact = (row)=>{
        try{
            const account_id_row = row.account_id;
            Swal.fire({
                title: `Are you sure?`,
                text: "This account will deactivate",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, deactivate it!"
            }).then((result)=>{
                if (result.isConfirmed) {
                    const updateData = async ()=>{
                        const response = await axios.put(`${ApiConfig.apiURL}deactivate`, {account_id_row, account_id, full_name});
                        if(response.status === 200){
                            Swal.fire({
                                title: "Deactivated!",
                                text: "Account has been deactivated.",
                                icon: "success"
                              }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.href = "/accountlist";
                                }
                              })
                        }
                    }
                    updateData()
                }
            })
        }catch(err){
            console.error("Error: ", err);
        }
    }

    const hanldeSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(first_name && last_name && address && contact && accId){
                if(contact.length === 11){
                    if(newPass && confirmPass){
                        if(newPass === confirmPass){
                            const responseAcc = await axios.put(`${ApiConfig.apiURL}updateUserAccount`, 
                            {first_name, middle_name,last_name, address, contact, accId, account_id, full_name});
                            const responsePass =  await axios.put(`${ApiConfig.apiURL}updatepassAdmin`, {newPass,  accId, account_id, full_name});

                            if(responseAcc.status === 200 && responsePass.status === 200){
                                Swal.fire({
                                    title: "Profile updated!",
                                    text: "Click OK to refresh the page.",
                                    icon: "success"
                                  }).then((result)=>{
                                    if(result.isConfirmed){
                                      window.location.href ="/accountlist"
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
                    }else if(newPass ===  '' && confirmPass === ''){
                        const response = await axios.put(`${ApiConfig.apiURL}updateUserAccount`, 
                        {first_name, middle_name,last_name, address, contact, accId, account_id, full_name});

                        if(response.status === 200){
                            Swal.fire({
                                title: "Profile updated!",
                                text: "Click OK to refresh the page.",
                                icon: "success"
                              }).then((result)=>{
                                if(result.isConfirmed){
                                  window.location.href ="/accountlist"
                                }
                              })
                        }
                    }else if(newPass === '' || confirmPass === ''){
                        Swal.fire({
                            title: "Empty password field!",
                            text: "Make sure to filled both password to update.",
                            icon: "warning"
                        });
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


        }catch(err){
            console.error("Error: ", err);
        }
    }
    
    return (
        <div className='xl:ml-64'>
            <SidebarAd />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-xl w-full'>
                    <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>Account list</div>
                    <div className='flex items-center justify-between bg-gray-600 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>List of Accounts</div>
                        <input type="text" placeholder='Search Student ID...' onChange={(e) => handleFilter(e.target.value)}
                        className='w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs' />
                    </div>
                    <DataTable
                        columns={columns1}
                        data={filteredRecords}
                        fixedHeader
                        pagination
                    >
                    </DataTable>
                    <DeactAcc />
                </div>
            </div>

    <>
    {showModal && (
        <>
          <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">Update Account</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                    <IoClose className='text-2xl' />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4" onSubmit={hanldeSubmit}>
                    <div className="mb-4 flex flex-col gap-4">
                        <div className='text-red-700 text-sm font-medium text-start
                        pb-2 border-b border-b-red-700 w-max'>
                            Student ID: {selectedData.student_id}
                        </div>
                        <div className='flex gap-2'>
                            <div className="col-span-2 flex-grow">
                                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-start text-gray-900">First name</label>
                                <input type="text" id="fname" className="bg-gray-50 border border-gray-300 
                                text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                block w-full p-2.5" placeholder="Type first name"
                                defaultValue={selectedData.first_name} 
                                onChange={(e)=>setFirstName(e.target.value)} />
                            </div>

                            <div className="col-span-2 flex-grow">
                                <label htmlFor="mname" className="block mb-2 text-sm font-medium text-start text-gray-900">Middle name</label>
                                <input type="text" id="mname" className="bg-gray-50 border border-gray-300 
                                text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                block w-full p-2.5" placeholder="Type middle name"
                                defaultValue={selectedData.middle_name} 
                                onChange={(e)=>setMidName(e.target.value)} />
                            </div>
                        </div>
                        
                        <div className="col-span-2 flex-grow">
                            <label htmlFor="lname" className="block mb-2 text-sm font-medium text-start text-gray-900">Last name</label>
                            <input type="text" id="lname" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" placeholder="Type middle name"
                            defaultValue={selectedData.last_name} 
                            onChange={(e)=>setLastName(e.target.value)} />
                        </div>

                        <div className="col-span-2 flex-grow">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-start text-gray-900">Address</label>
                            <input type="text" id="address" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" placeholder="Type address"
                            defaultValue={selectedData.address} 
                            onChange={(e)=>setAddress(e.target.value)} />
                        </div>

                        <div className="col-span-2 flex-grow">
                            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-start text-gray-900">Contact</label>
                            <input type="text" id="contact" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" placeholder="Type address"
                            defaultValue={selectedData.contact} 
                            onChange={(e)=>setContact(e.target.value)} />
                        </div>

                        <div className="col-span-2 flex-grow">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-start text-gray-900">New password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" placeholder="Type new password" 
                            onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="col-span-2 flex-grow">
                            <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-start text-gray-900">Confirm password</label>
                            <input type="password" id="confirm" className="bg-gray-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" placeholder="Confirm new password" 
                            onChange={(e)=>setConfirmPass(e.target.value)} />
                        </div>

                        <div>
                            <button className='bg-red-700 text-white tracking-wider font-semibold
                            p-2 pl-6 pr-6 rounded-md hover:bg-red-600'>SUBMIT
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

export default AccountList