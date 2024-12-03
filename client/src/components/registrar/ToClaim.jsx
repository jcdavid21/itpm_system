import React from 'react'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';
import SidebarFcms from './SidebarFcms';
import { CiCircleCheck } from "react-icons/ci";

function ToClaim() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);

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
            name: "Claim Date",
            selector: row => {
                return row.fcms_appointment  === null ? "N/A" : new Date(row.fcms_appointment).toLocaleDateString();
            },
            sortable: true
        },
        {
            name: "Status",
            selector: row => <div className='bg-red-700 max-w-24 text-white font-medium pt-1 pb-1 rounded-md p-2'>{row.rp_status}</div>,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <CiCircleCheck 
            className='text-3xl text-green-700 cursor-pointer' 
            onClick={() => handleRefNum(row)} />
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const response = await axios.get(`${ApiConfig.apiURL}toClaimShirt`);
                
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleRefNum = (row) => {
        const index = records.findIndex(record => record.payment_refnum === row.payment_refnum);
        if (index !== -1) {
            const refNum = records[index].payment_refnum;
            Swal.fire({
                title: "Are you sure?",
                text: "The status will update into CLAIMED",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!"
            }).then((result)=>{
                if(result.isConfirmed){
                    handleSubmit(refNum);
                }
            })
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

    const handleSubmit = async (refNum)=>{
        try{
            if(refNum){
                const response = await axios.put(`${ApiConfig.apiURL}updateToConfirmed`, {refNum})

                if(response.status === 200){
                    Swal.fire({
                        title: "Status Updated!",
                        text: "The status updated to CLAIMED",
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = '/toclaim'
                        }
                    })
                }
            }else{
                Swal.fire({
                    title: "No Reference Number!",
                    text: "",
                    icon: "warning"
                })
            }
        }catch(err){
            console.error("Err: ", err);
        }
    }

    return (
        <div className='xl:ml-64'>
            <SidebarFcms />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-xl w-full'>
                <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>To Claim Orders List</div>
                    <div className='flex items-center justify-between bg-gray-600 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>To Claim</div>
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
        </div>
    )
}

export default ToClaim