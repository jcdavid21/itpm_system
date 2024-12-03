import React from 'react'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

function DeactAcc() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
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
                <div className='text-2xl text-red-500 cursor-pointer'
                onClick={()=> handleShowModal(row)} ><MdOutlineSettingsBackupRestore /></div>
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
                const response = await axios.get(`${ApiConfig.apiURL}allDeactivated`);
                
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
            const account_id_row = records[index].account_id
            Swal.fire({
                title: "Are you sure?",
                text: "This account will reactivate",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, reactivate it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  const updateStatus = async ()=>{
                    const response = await axios.put(`${ApiConfig.apiURL}reactivate`, {account_id_row, account_id, full_name});
                    if(response.status === 200){
                        Swal.fire({
                            title: "Account Reactivated!",
                            text: "Account has been Reactivated Successfully.",
                            icon: "success"
                          }).then((result)=>{
                            if(result.isConfirmed){
                                window.location.href = '/accountlist'
                            }
                          })
                    }
                  }
                  updateStatus();
                }
              });
            
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


    return (
        <div className='mt-10'>
            <div className='flex items-center justify-between bg-red-700 p-4 pb-2 rounded-t-md'>
                <div className='text-white font-medium tracking-wider'>Account Deactivated</div>
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
        </div>
    )
}

export default DeactAcc