import React from 'react'
import DataTable from 'react-data-table-component';
import { MdRemoveRedEye } from "react-icons/md";
import { useState, useEffect } from 'react';
import axios from 'axios'
import ApiConfig from '../../Config/localconfigapi';

function ReportHistorySuccess() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const columns1 = [
        {
            name: "Ref. Number",
            selector: row => row.ref_number,
            sortable: true
        },
        {
            name: "Report Type",
            selector: row => row.rp_type,
            sortable: true
        },
        {
            name: "Report Option",
            selector: row => row.rp_option,
            sortable: true
        },
        {
            name: "Submitted Date",
            selector: row => new Date(row.report_date).toLocaleDateString(),
            sortable: true
        },
        {
            name: "Status",
            selector: row => <div className='bg-emerald-600 text-white font-medium pt-1 pb-1 rounded-md p-2'>{row.rp_status}</div>,
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
                const response = await axios.get(`${ApiConfig.apiURL}reportSuccessHistoryAdmin`);
                
                setRecord(response.data);
                setFilterRecords(response.data);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])


    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.ref_number === row.ref_number);
        if (index !== -1) {
            const context = records[index].report_msg
            setMessage(context);
            setShowModal(true);
            
        } else {
            console.error("Row index not found");
        }
    };

    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.ref_number.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterRecords(newData);
    };

    return (
        <>
            <div className='flex items-center justify-center mt-10 p-4'>
              <div className='max-w-screen-xl w-full'>
                  <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>Report Success History</div>
                  <div className='flex items-center justify-between bg-green-700 p-4 pb-2 rounded-t-md'>
                      <div className='text-white font-medium tracking-wider'>SUCCESS FORM</div>
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
        </>
    )
}

export default ReportHistorySuccess