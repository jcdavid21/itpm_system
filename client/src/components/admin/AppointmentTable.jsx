import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ApiConfig from '../../Config/localconfigapi';
import { MdRemoveRedEye } from 'react-icons/md';
import { RxUpdate } from "react-icons/rx";
import Swal from 'sweetalert2';
import { GiCancel } from "react-icons/gi";

function AppointmentTable({ statusId }) {
    const [pendingRecords, setPendingRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newRemarks, setNewRemarks] = useState('');
    const [personalData, setPersonalData] = useState([]);

    // Convert military time to standard time
    const convertTo12HourFormat = (militaryTime) => {
        const [hour, minute] = militaryTime.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12;
        return `${standardHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    // Format dates to readable format
    const formattedDate = (date) => {
        const dateObject = new Date(date);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return dateObject.toLocaleDateString(undefined, options);
    };

    // Table column definitions
    const columns = [
        { name: "Student ID.", selector: row => row.student_id, sortable: true },
        { name: "Student Name", selector: row => row.full_name, sortable: true },
        { name: "Submitted Type", selector: row => row.rp_type, sortable: true },
        {
            name: "Appointed Date",
            selector: row => formattedDate(row.apt_date),
            sortable: true,
        },
        {
            name: "Appointed Time",
            selector: row => convertTo12HourFormat(row.apt_time),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => {
              const statusStyles = {
                PENDING: 'bg-cyan-800',
                COMPLETED: 'bg-emerald-700',
                CANCELLED: 'bg-red-700'
              };
              return (
                <div className={`${statusStyles[row.status_name]} text-white font-medium w-24 text-center pt-1 pb-1 rounded-md p-2`}>
                  {row.status_name}
                </div>
              );
            },
            sortable: true
          },
        {
            name: "Actions",
            cell: row => (
                <div className="flex gap-2">
                    <MdRemoveRedEye
                        className="text-2xl text-blue-500 cursor-pointer"
                        onClick={() => handleShowModal(row)}
                    />
                    {statusId === 1 && (
                    <>
                    <button
                        onClick={() => handleRescheduleModal(row)}
                        className="text-sm bg-cyan-500 text-white px-2 py-1 rounded hover:bg-cyan-600">
                        <RxUpdate />
                    </button>
                    <button
                        onClick={() => handleCancelAppointment(row)}
                        className="text-xl text-red-500 py-1 ">
                        <GiCancel />
                    </button>
                    </>
                    )}

                </div>
            ),
        },
    ];

    // Fetch data on component load
    useEffect(() => {
        const fetchPendingAppointments = async () => {
            try {
                if(JSON.parse(localStorage.getItem('adminData'))){
                    const accData = JSON.parse(localStorage.getItem('adminData'));
                    setPersonalData(accData);
                }else if(JSON.parse(localStorage.getItem('registrarData'))){
                    const accData = JSON.parse(localStorage.getItem('registrarData'));
                    setPersonalData(accData);
                }
                const response = await axios.get(`${ApiConfig.apiURL}getAllAppointments`, {
                    params: { status_id: statusId },
                });
                setPendingRecords(response.data || []);
                setFilteredRecords(response.data || []);
            } catch (err) {
                console.error("Error fetching pending appointments:", err);
            }
        };
        fetchPendingAppointments();
    }, [statusId]);

    const getRoleId = () => {
        if(personalData.length > 0){
            const role_id = personalData[0].acc_role_id;
            return role_id;
        }
    }

    // Handle search filtering
    const handleFilter = (value) => {
        const filtered = pendingRecords.filter(record =>
            record.student_id.toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRecords(filtered);
    };

    // Show modal with selected record details
    const handleShowModal = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedRecord(null);
        setIsModalOpen(false);
    };

    // Handle reschedule modal
    const handleRescheduleModal = (record) => {
        setSelectedRecord(record);
        setIsRescheduleOpen(true);
    };

    // Close reschedule modal
    const handleCloseReschedule = () => {
        setSelectedRecord(null);
        setNewDate('');
        setNewTime('');
        setNewRemarks('');
        setIsRescheduleOpen(false);
    };

    
    const getPersonalData = () => {
        if(personalData.length > 0){
            const data = {
                full_name: personalData[0].full_name,
                acc_id: personalData[0].acc_id,
            }
            return data;
        }
    }

    // Submit new appointment details
    const handleSubmitReschedule = async () => {
        try {
            const data = getPersonalData();
            await axios.put(`${ApiConfig.apiURL}rescheduleAppointment`, {
                apt_id: selectedRecord.apt_id,
                date: newDate,
                time: newTime,
                remarks: newRemarks,
                acc_id: data.acc_id,
                full_name: data.full_name,
            });
            Swal.fire({
                title: "Success",
                text: "Appointment rescheduled successfully.",
                icon: "success",
            }).then(() => {
                handleCloseReschedule();
                window.location.reload();
            });
        } catch (err) {
            console.error("Error rescheduling appointment:", err);
            alert("Failed to reschedule appointment.");
        }
    };

    const handleCancelAppointment = async (row) => {
        const data = getPersonalData();
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Once cancelled, you will not be able to recover this appointment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, cancel it!",
            }).then(async (result) => {
                await axios.put(`${ApiConfig.apiURL}cancelAppointment`, {
                    apt_id: row.apt_id,
                    acc_id: data.acc_id,
                    full_name: data.full_name,
                });
                Swal.fire({
                    title: "Success",
                    text: "Appointment cancelled successfully.",
                    icon: "success",
                }).then(() => {
                    handleCloseReschedule();
                    window.location.reload();
                });
            });
        } catch (err) {
            console.error("Error cancelling appointment:", err);
            alert("Failed to cancel appointment.");
        }
    }

    const handleComplete = async (row) => {
        const data = getPersonalData();

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "Once completed, you will not be able to recover this appointment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, complete it!",
            }).then(async (result) => {
                await axios.put(`${ApiConfig.apiURL}completeAppointment`, {
                    apt_id: row.apt_id,
                    account_id: data.acc_id,
                    full_name: data.full_name,
                    file_id: row.file_id,
                });
                Swal.fire({
                    title: "Success",
                    text: "Appointment completed successfully.",
                    icon: "success",
                }).then((result) => {
                    if(result){
                        window.location.reload();
                    }
                });
            });
        } catch (err) {
            console.error("Error completing appointment:", err);
            alert("Failed to complete appointment.");
        }
    }

    return (
        <div>
            <div className="container mt-5 w-full">
                <div className="flex items-center justify-between bg-cyan-700 p-4 pb-2 rounded-t-md">
                    <div className="text-white font-medium tracking-wider">{statusId === 1 ? "Pending" : statusId === 2 ? "Completed" : "Declined"} Appointments</div>
                    <input
                        type="text"
                        placeholder="Search Student ID..."
                        onChange={(e) => handleFilter(e.target.value)}
                        className="w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs"
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
                        <div
                            className='bg-white p-6 rounded-md shadow-lg w-full text-start overflow-auto'
                            style={{ maxWidth: '800px', maxHeight: '550px' }}
                        >
                            <h2 className='text-xl font-semibold mb-4 pb-2 border-b border-b-gray-500'>Record Details</h2>
                            <div className="font-semibold text-base">
                                Status: <span className={`p-2 rounded-md text-sm text-white ${statusId === 1 ? 'bg-cyan-700' : statusId === 2 ? 'bg-green-700' : 'bg-red-700'}`}>
                                    {selectedRecord.status_name}
                                </span>
                            </div>

                            <div className='font-semibold text-sm mt-7'>Name:</div>
                            <input
                                type="text"
                                disabled
                                value={selectedRecord.full_name}
                                className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full'
                            />

                            <div className='font-semibold text-sm mt-7'>File you need to submit:</div>
                            <input
                                type="text"
                                disabled
                                value={selectedRecord.rp_type}
                                className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full'
                            />
                            <div className='font-semibold text-sm mt-5'>Submitted Date:</div>
                            <input
                                type="text"
                                disabled
                                value={formattedDate(selectedRecord.submitted_date)}
                                className='mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full'
                            />
                            <div className='font-semibold text-sm mt-5'>Admission Remarks:</div>
                            <textarea
                                className='mt-2 p-2 bg-gray-100 border border-gray-600 rounded-md text-gray-600 bg-opacity-75 w-full'
                                rows={5}
                                cols={5}
                                value={selectedRecord.apt_remarks}
                                disabled
                            ></textarea>
                            <div>
                                <img
                                    src={require(`../../../../backend/files_img/${selectedRecord.file_img}`)}
                                    alt=""
                                    className='h-full w-full object-contain'
                                />
                            </div>
                            <div className='mt-4 flex justify-end gap-2'>
                                <button
                                    onClick={handleCloseModal}
                                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700'
                                >
                                    Close
                                </button>
                                {getRoleId() === 3 && statusId === 1 && (
                                    <button
                                    onClick={() => handleComplete(selectedRecord)}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                                    Complete
                                </button>)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reschedule Modal */}
                {isRescheduleOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
                        <div
                            className="bg-white p-6 rounded-md shadow-lg w-full text-start overflow-auto"
                            style={{ maxWidth: '500px', maxHeight: '400px' }}
                        >
                            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-b-gray-500">
                                Reschedule Appointment
                            </h2>
                            <div className="font-semibold text-sm mt-3">New Appointment Date:</div>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="mt-2 p-2 bg-gray-100 rounded-md w-full"
                            />
                            <div className="font-semibold text-sm mt-5">New Appointment Time:</div>
                            <input
                                type="time"
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                                className="mt-2 p-2 bg-gray-100 rounded-md w-full"
                            />
                            <div className="font-semibold text-sm mt-5">New Appointment Remarks:</div>
                            <input
                                type="text"
                                value={newRemarks}
                                onChange={(e) => setNewRemarks(e.target.value)}
                                className="mt-2 p-2 bg-gray-100 rounded-md w-full"
                            />
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    onClick={handleCloseReschedule}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmitReschedule}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Reschedule
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppointmentTable;
