import React from 'react'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { MdRemoveRedEye } from "react-icons/md";
import Swal from 'sweetalert2';
import ApiConfig from '../Config/localconfigapi';

function Table() {
    const columns = [
        {
            name: "Ref. Number",
            selector: row => row.ref_number,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.full_name,
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
            selector: row => <div className='bg-cyan-800 text-white text-center font-medium pt-1 pb-1 rounded-md p-2'>{row.rp_status}</div>,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <MdRemoveRedEye 
            className='text-2xl text-blue-500 cursor-pointer' 
            onClick={() => handleShowModal(row)} />
        }
    ]

    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [refNumber, setRefNum] = useState('');
    const [accId, setAccId] = useState('');
    const [reportStatus, setReportStatus] = useState('');

    useEffect(()=>{
        try{
            const fetchData = async () =>{
                const accData = JSON.parse(localStorage.getItem("accData"))
                const acc_id = accData[0].account_id;
                const response = await axios.get(`${ApiConfig.apiURL}pending`, {params:{acc_id}});
                
                setRecord(response.data);
                setFilterRecords(response.data);
                setAccId(acc_id);
            }
            fetchData();
        }catch(e){
            console.error("Error: ", e);
        }
    }, [])

    console.log(reportStatus)

    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.ref_number === row.ref_number);
        if (index !== -1) {
            const context = records[index].report_msg
            const ref_num = records[index].ref_number
            const rep_status = records[index].report_status
            setRefNum(ref_num);
            setMessage(context);
            setReportStatus(rep_status);
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

    const handleUpdate = async () =>{
        try{
            if(refNumber && message){
                const response = await axios.put(`${ApiConfig.apiURL}updateMessage`, {refNumber, message, accId})
                if(response.status === 200){
                    Swal.fire({
                        title: "Message Updated!",
                        text: "Click OK to refresh the page!",
                        icon: "success"
                      }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "/forms"
                        }
                      })
                }
            }else{
                Swal.fire({
                    title: "Empty Field!",
                    text: "Make sure to fill up the field before update",
                    icon: "warning"
                  })
            }
        }catch(e){
            console.error("Error: ", e);
        }
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
      };
     

    return (
        <div className='container mt-8'>
            <div className='flex items-center justify-between bg-gray-500 p-4 pb-2 rounded-t-md'>
                <div className='text-white font-medium tracking-wider'>PENDING/ON PROCESS FORM</div>
                <input type="text" placeholder='Search Reference Number...' onChange={(e) => handleFilter(e.target.value)}
                className='w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs' />
            </div>
            <DataTable
                columns={columns}
                data={filteredRecords}
                fixedHeader
                pagination
            >
            </DataTable>

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
                {reportStatus === 5 ? <textarea
                    className="my-4 p-4 text-blueGray-500 text-lg leading-relaxed w-full"
                    cols="30"
                    rows="5"
                    value={message} // Value from state
                    onChange={handleMessageChange} // onChange handler to update state
                    disabled
                ></textarea> : 
                <textarea
                    className="my-4 p-4 text-blueGray-500 text-lg leading-relaxed w-full"
                    cols="30"
                    rows="5"
                    value={message} // Value from state
                    onChange={handleMessageChange} // onChange handler to update state
                ></textarea>}
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

                  {reportStatus !== 5 ? <>
                    <button
                    className="text-white bg-red-700 rounded-md 
                    font-bold uppercase px-6 py-2 text-sm outline-none 
                    focus:outline-none mr-1 mb-1 ease-linear transition-all 
                    duration-150 hover:bg-red-600"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button></> : <></>}
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

export default Table