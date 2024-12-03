import React from 'react'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { MdRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import SidebarAd from './SidebarAd';
import ApiConfig from '../../Config/localconfigapi';

function TrailLogs() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);


    // Format dates to readable format
    const formattedDate = (date) => {
        const dateObject = new Date(date);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return dateObject.toLocaleDateString(undefined, options);
    };



    const columns1 = [
        {
            name: "User ID",
            selector: row => row.user_id,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.user_name,
            sortable: true
        },
        {
            name: "Activity Date",
            selector: row => formattedDate(row.activity_date),
            sortable: true
        },
        {
            name: "Activity",
            selector: row => row.activity
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const response = await axios.get(`${ApiConfig.apiURL}getlogs`);
                
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
            return row.user_id.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    return (
        <div className='xl:ml-64'>
            <SidebarAd />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-xl w-full'>
                    <div className='text-start text-2xl pb-2 font-medium 
                        border-b border-b-300 mb-5'>
                        Trail Logs List
                    </div>
                    <div className='flex items-center justify-between bg-gray-600 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>Trail Logs Table</div>
                        <input type="text" placeholder='Search User ID...' onChange={(e) => handleFilter(e.target.value)}
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

export default TrailLogs