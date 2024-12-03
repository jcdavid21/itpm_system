import React from 'react'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { MdRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import ApiConfig from '../../Config/localconfigapi';


function ContactsTable() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const columns1 = [
        {
            name: "ID",
            selector: row => row.contact_refnum,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.contact_name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.contact_email,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <MdRemoveRedEye 
            className='text-2xl text-blue-500 cursor-pointer' 
            onClick={() => handleShowModal(row)} />
        }
    ]

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const response = await axios.get(`${ApiConfig.apiURL}getcontacts`);
                
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.contact_refnum === row.contact_refnum);
        if (index !== -1) {
            const context = records[index].contact_message
            setMessage(context);
            setShowModal(true);
            
        } else {
            console.error("Row index not found");
        }
    };

    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.contact_refnum.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    return (
        <div className='container mt-12 pl-4 pr-4'>
            <div className='flex items-center justify-center'>
                <div className='max-w-screen-xl w-full'>
                    <div className='flex items-center justify-between bg-gray-600 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>Contact Reports</div>
                        <input type="text" placeholder='Search ID...' onChange={(e) => handleFilter(e.target.value)}
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
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto max-w-3xl w-full pl-2 pr-2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Report Message
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto w-full">
                <textarea
                    className="my-4 p-4 text-blueGray-500 text-lg leading-relaxed w-full"
                    cols="30"
                    rows="5"
                    value={message} // Value from state
                    readOnly
                ></textarea>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
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

export default ContactsTable