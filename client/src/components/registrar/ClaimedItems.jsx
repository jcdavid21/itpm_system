import React from 'react'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiConfig from '../../Config/localconfigapi';
import SidebarFcms from './SidebarFcms';

function ClaimedItems() {
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
            name: "Claimed Date",
            selector: row => {
                return row.fcms_appointment  === null ? "N/A" : new Date(row.fcms_appointment).toLocaleDateString();
            },
            sortable: true
        },
        {
            name: "Status",
            selector: row => <div className='bg-green-700 max-w-24 text-white font-medium pt-1 pb-1 rounded-md p-2'>{row.rp_status}</div>,
            sortable: true
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const response = await axios.get(`${ApiConfig.apiURL}claimedShirtAdmin`);
                
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.payment_refnum.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    return (
        <div className='xl:ml-64'>
            <SidebarFcms />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-xl w-full'>
                <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>CLAIMED LIST</div>
                    <div className='flex items-center justify-between bg-green-700 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>Claimed Items Table</div>
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

export default ClaimedItems