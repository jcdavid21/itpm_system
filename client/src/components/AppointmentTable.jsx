import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ApiConfig from '../Config/localconfigapi';
import { MdRemoveRedEye } from 'react-icons/md';
import Swal from 'sweetalert2';

function DisplayTable({statusId}) {
    const [records, setRecord] = useState([]);
    const [filteredRecords, setFilterRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Utility function to convert military time to standard time
    const convertTo12HourFormat = (militaryTime) => {
        const [hour, minute] = militaryTime.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM/PM
        return `${standardHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    const formattedDate = (date_submitted) => {
        const date = new Date(date_submitted);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const columns = [
        { name: "Reference ID.", selector: row => row.apt_id, sortable: true },
        { name: "Submitted Type", selector: row => row.rp_type, sortable: true },
        { 
            name: "Appointed Date",
            selector: row => {
                const date_submitted = new Date(row.apt_date);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                return date_submitted.toLocaleDateString(undefined, options);
            },
            sortable: true 
        },
        // Update the column definition
        {
            name: "Appointed Time",
            selector: row => convertTo12HourFormat(row.apt_time),
            sortable: true
        },
        { 
            name: "Status",
            selector: row => {
                const statusStyles = {
                    PENDING: 'bg-cyan-800',
                    COMPLETED: 'bg-emerald-700',
                    CANCELLED: 'bg-red-700'
                };
                return statusStyles[row.status_name] 
                    ? <div className={`${statusStyles[row.status_name]} text-white font-medium w-24 text-center pt-1 pb-1 rounded-md p-2`}>
                        {row.status_name}
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
                    const response = await axios.get(`${ApiConfig.apiURL}getAppointments`, { params: { acc_id, status_id: statusId  } });
                    setRecord(response.data || []);
                    setFilterRecords(response.data || []);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [statusId]);

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


    return (
        <div className='container mt-5 w-full'>
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
                            Status: <span className={`p-2 rounded-md text-sm text-white ${selectedRecord.status_name === 'PENDING' ? 'bg-cyan-700' : selectedRecord.status_name === "ACCEPTED" ? 'bg-emerald-700' : 'bg-red-700'}`}>
                                {selectedRecord.status_name}
                            </span>
                        </div>

                       
                        <div className='font-semibold text-sm mt-7'>File you need to submit: </div>
                        <input type="text" disabled value={selectedRecord.rp_type}
                        className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full' />
                        <div className='font-semibold text-sm mt-5'>Submitted Date: </div>
                        <input type="text" disabled value={formattedDate(selectedRecord.submitted_date)}
                        className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full' />
                        <div className='font-semibold text-sm mt-5'>Admission Remarks: </div>
                        <textarea className='mt-2 p-2 bg-gray-100 border border-gray-600 rounded-md text-gray-600 bg-opacity-75 w-full' rows={5} cols={5}
                        onChange={(e) => handleRemarkChange(e)}
                        disabled>{selectedRecord.apt_remarks}</textarea>
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
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisplayTable;
