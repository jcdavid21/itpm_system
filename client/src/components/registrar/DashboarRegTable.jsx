import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';

function DashboardRegTable() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refNum, setRefNum] = useState('')
    const [imgReceipt, setImgReceipt] = useState('');
    const [claimDate, setClaimDate] = useState('');

    const columns1 = [
        {
            name: "Ref. Number",
            selector: row => row.payment_refnum,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.full_name,
            sortable: true
        },
        {
            name: "Shirt",
            selector: row => row.fcms_shirt,
            sortable: true
        },
        {
            name: "Size",
            selector: row => row.fcms_size,
            sortable: true
        },
        {
            name: "Status",
            selector: row => <div className='bg-cyan-800 max-w-24 text-white font-medium pt-1 pb-1 rounded-md p-2'>{row.rp_status}</div>,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <FaRegEdit 
            className='text-2xl text-blue-500 cursor-pointer' 
            onClick={() => handleShowModal(row)} />
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const response = await axios.get(`${ApiConfig.apiURL}pendingShirt`);
                
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.payment_refnum === row.payment_refnum);
        if (index !== -1) {
            setRefNum(records[index].payment_refnum);
            setImgReceipt(records[index].img_receipt);
            setShowModal(true);
            
        } else {
            console.error("Row index not found");
        }
    };

    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.payment_refnum.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(claimDate && refNum){
                const response = await axios.put(`${ApiConfig.apiURL}updateStatusFcms`, {refNum, claimDate});

                if(response.status === 200){
                    Swal.fire({
                        title: "Success",
                        text: "The item is ready to claim.",
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = '/dashboardfcms';
                        }
                    })
                }
            }else{
                Swal.fire({
                    title: "Select Date!",
                    text: "Please set a date to claim",
                    icon: "warning"
                })
            }
        }catch(err){
            console.error("Err: ", err);
        }
    }

    return (
        <div className='container mt-12 pl-4 pr-4'>
            <div className='flex items-center justify-center'>
                <div className='max-w-screen-xl w-full'>
                    <div className='flex items-center justify-between bg-gray-600 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>All Pending Merch</div>
                        <input type="text" placeholder='Search Reference Number...' onChange={(e) => handleFilter(e.target.value)}
                        className='w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs' />
                    </div>
                    <DataTable
                        columns={columns1}
                        data={filteredRecords}
                        fixedHeader
                        pagination
                    >
                    </DataTable>
                </div>
            </div>

    <>
      {showModal && (
        <>
           <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                    <IoClose className='text-2xl' />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-4">
                        <div className='text-red-700 text-sm font-medium text-start
                        pb-2 border-b border-b-red-700 w-max'>
                            Reference Number: {refNum}
                        </div>
                        
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label htmlFor="date"
                            className='text-sm font-light'>
                                Set Claim Date 
                                <span className='text-red-700'>*</span>
                            </label>
                            <input type="date" 
                            className='border border-gray-500 w-full
                            p-2 text-sm pt-1 pb-1 rounded-md'
                            onChange={(e)=>setClaimDate(e.target.value)}/>
                        </div>

                        {/* <div className='max-h-96 overflow-auto'>
                            <div className='text-start mb-2
                            font-light border-b border-b-gray-400'>Receipt</div>
                            <img src={require(`../backend/receipts/${imgReceipt}`)} alt="" />
                        </div> */}

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

export default DashboardRegTable