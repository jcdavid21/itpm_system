import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ApiConfig from '../Config/localconfigapi';
import { MdRemoveRedEye } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function DisplayTable() {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tableId } = useParams();

    const columns = [
        { name: "ID", selector: row => row.file_id, sortable: true },
        { name: "Submitted Type", selector: row => row.rp_type, sortable: true },
        { name: "Student Type", selector: row => row.student_type, sortable: true },
        { 
            name: "Submitted Date",
            selector: row => {
                const date_submitted = new Date(row.submitted_date);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                return date_submitted.toLocaleDateString(undefined, options);
            },
            sortable: true 
        },
        { 
            name: "Status",
            selector: row => {
                const statusStyles = {
                    PENDING: 'bg-cyan-800',
                    ACCEPTED: 'bg-emerald-700',
                    DECLINED: 'bg-red-700'
                };
                return statusStyles[row.rp_status] 
                    ? <div className={`${statusStyles[row.rp_status]} text-white font-medium w-24 text-center pt-1 pb-1 rounded-md p-2`}>
                        {row.rp_status}
                    </div>
                    : "";
            },
            sortable: true

        },
        {
            name: "Actions",
            cell: row => (
                <MdRemoveRedEye 
                    className='text-2xl text-blue-500 cursor-pointer' 
                    onClick={() => handleShowModal(row)}
                />
            )
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accData = JSON.parse(localStorage.getItem("accData"));
                const acc_id = accData ? accData[0].account_id : null;

                if (acc_id) {
                    const response = await axios.get(`${ApiConfig.apiURL}getPendingForms`, { params: { acc_id, status_id: tableId} });
                    setRecord(response.data || []);
                    setFilterRecords(response.data || []);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [tableId]);

    const handleFilter = (value) => {
        const newData = records.filter(row => 
            row.file_id.toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilterRecords(newData);
    };

    const handleShowModal = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
        setIsModalOpen(false);
    };

    const handleRemarkChange = (e) => {
        setSelectedRecord({ ...selectedRecord, remarks: e.target.value });
    }

    const handleUpdateRemarks = async () => {
        try {
            const response = await axios.put(`${ApiConfig.apiURL}updateRemarks`, selectedRecord);
            console.log(response.data);
            if(response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Record updated successfully.",
                    icon: "success"
                }).then((result)=>{
                    if(result){
                        const newData = records.map(record => {
                            if (record.file_id === selectedRecord.file_id) {
                                return selectedRecord;
                            }
                            return record;
                        });
                        setRecord(newData);
                        setFilterRecords(newData);
                    }
                })
                handleCloseModal();
            }
        } catch (err) {
            console.error("Error updating record:", err);
        }
    }

    return (
        <div className='container mt-10'>
            <div className='flex items-center justify-between bg-gray-500 p-4 pb-2 rounded-t-md'>
                <div className='text-white font-medium tracking-wider'>Pending Forms</div>
                <input 
                    type="text" 
                    placeholder='Search ID Number...' 
                    onChange={(e) => handleFilter(e.target.value)}
                    className='w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs' 
                />
            </div>
            {Array.isArray(filteredRecords) && (
                <DataTable
                    columns={columns}
                    data={filteredRecords}
                    fixedHeader
                    pagination
                />
            )}

            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10'>
                    <div className='bg-white p-6 rounded-md shadow-lg w-full text-start overflow-auto' style={
                        { maxWidth: '800px', maxHeight: '550px' }
                    }>
                        <h2 className='text-xl font-semibold mb-4 pb-2 border-b border-b-gray-500'>Record Details</h2>
                        <div className="font-semibold text-base">
                            Status: <span className={`p-2 rounded-md text-sm text-white ${selectedRecord.rp_status === 'PENDING' ? 'bg-cyan-700' : selectedRecord.rp_status === "ACCEPTED" ? 'bg-emerald-700' : 'bg-red-700'}`}>
                                {selectedRecord.rp_status}
                            </span>
                        </div>

                       
                        <div className='font-semibold text-sm mt-7'>Submitted Type: </div>
                        <input type="text" disabled value={selectedRecord.rp_type}
                        className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full' />
                        <div className='font-semibold text-sm mt-5'>Student Type: </div>
                        <input type="text" disabled value={selectedRecord.student_type}
                        className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full' />
                        <div className='font-semibold text-sm mt-5'>Remarks: </div>
                        <textarea className='mt-2 p-2 bg-gray-100 border border-gray-600 rounded-md text-gray-600 bg-opacity-75 w-full' rows={5} cols={5}
                        onChange={(e) => handleRemarkChange(e)}
                        disabled={tableId != 1 ? 'true' : ''}>{selectedRecord.remarks}</textarea>
                        <div>
                            <img src={require(`../../../backend/files_img/${selectedRecord.file_img}`)} alt="" className='h-full w-full object-contain' />
                        </div>
                        <div className='mt-4 flex justify-end'>
                            <button 
                                onClick={handleCloseModal} 
                                className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700'
                            >
                                Close
                            </button>
                            {tableId == 1 && (
                                <button
                                className='bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700'
                                onClick={(e) => handleUpdateRemarks()}
                            >Update</button>)}
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisplayTable;
