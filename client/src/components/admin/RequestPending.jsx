import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { MdRemoveRedEye } from 'react-icons/md';
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';
import { GiCancel } from "react-icons/gi";

function RequestPending({ status_id }) {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalData, setPersonalData] = useState([]);

  // States for appointment modal
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    remarks: '',
  });

  const columns = [
    { name: 'Student ID', selector: row => row.student_id, sortable: true },
    { name: 'Student Name', selector: row => row.full_name, sortable: true },
    { name: 'Submitted Type', selector: row => row.rp_type, sortable: true },
    { name: 'Student Type', selector: row => row.student_type, sortable: true },
    {
      name: 'Submitted Date',
      selector: row => {
        const dateSubmitted = new Date(row.submitted_date);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return dateSubmitted.toLocaleDateString(undefined, options);
      },
      sortable: true
    },
    {
      name: 'Status',
      selector: row => {
        const statusStyles = {
          PENDING: 'bg-cyan-800',
          ACCEPTED: 'bg-emerald-700',
          DECLINED: 'bg-red-700'
        };
        return (
          <div className={`${statusStyles[row.rp_status]} text-white font-medium w-24 text-center pt-1 pb-1 rounded-md p-2`}>
            {row.rp_status}
          </div>
        );
      },
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex items-center'>
          <MdRemoveRedEye
          className="text-2xl text-blue-500 cursor-pointer"
          onClick={() => handleShowModal(row)}
          />
          {status_id === 1 && (
            <GiCancel 
            className='text-xl text-red-500 cursor-pointer ml-2'
            onClick={() => handleCancel(row.file_id)}
          />)}
        </div>
    
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(JSON.parse(localStorage.getItem('adminData'))){
          const accData = JSON.parse(localStorage.getItem('adminData'));
          setPersonalData(accData);
        }else if(JSON.parse(localStorage.getItem('registrarData'))){
          const accData = JSON.parse(localStorage.getItem('registrarData'));
          setPersonalData(accData);
        }

        const response = await axios.get(`${ApiConfig.apiURL}getAllPendingForms`, { params: { status_id } });
        setRecords(response.data || []);
        setFilteredRecords(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Failed to fetch data. Please try again later.', 'error');
      }
    };
    fetchData();
  }, [status_id]);

  const handleFilter = value => {
    const newData = records.filter(row =>
      row.student_id.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(newData);
  };

  const handleShowModal = record => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  const handleRemarkChange = e => {
    setSelectedRecord({ ...selectedRecord, remarks: e.target.value });
  };

  const getPersonalData = () => {
    if(personalData.length > 0){
      const data = {
        full_name: personalData[0].full_name,
        acc_id: personalData[0].account_id
      }

      return data;
    }
 }

  const handleUpdateRemarks = async () => {
    if (!selectedRecord || !selectedRecord.file_id) return;

    try {
      // Open the appointment modal after updating remarks
      setIsAppointmentModalOpen(true);

    } catch (error) {
      console.error('Error updating remarks:', error);
      Swal.fire('Error', 'Failed to update remarks. Please try again.', 'error');
    }
  };

  const handleAppointmentChange = e => {
    setAppointmentDetails({ ...appointmentDetails, [e.target.name]: e.target.value });
  };

  const handleSetAppointment = async () => {
    // Check if the date is in the past
    const selectedDate = new Date(appointmentDetails.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to 00:00:00 for comparison
  
    if (selectedDate < currentDate) {
      Swal.fire('Warning', 'Appointment cannot be set for past dates.', 'warning');
      return;
    }
  
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.remarks) {
      Swal.fire('Error', 'Please fill in all appointment details.', 'error');
      return;
    }
  
    try {
      const data = getPersonalData();
      const response = await axios.post(`${ApiConfig.apiURL}setAppointment`, null, {
        params: {
          file_id: selectedRecord.file_id,
          date: appointmentDetails.date,
          time: appointmentDetails.time,
          remarks: appointmentDetails.remarks,
          full_name: data.full_name,
          acc_id: data.acc_id
        }
      });
      
      
      if (response.status === 200) {
        Swal.fire('Success', 'Appointment set successfully!', 'success').then((result) => {
            if(result){
                window.location.reload(); // Reload the page to reflect changes
            }
        })
        handleCloseModal(); // Close the record details modal
        
      } else if (response.status === 299) {
        Swal.fire('Info', 'Appointment already set for this record.', 'info');
      }
  
      setIsAppointmentModalOpen(false); // Close the appointment modal
    } catch (error) {
      console.error('Error setting appointment:', error);
      Swal.fire('Error', 'Failed to set appointment. Please try again.', 'error');
    }
  };

  const handleCancel = async (file_id) => {
    try {
      const data = getPersonalData();
      Swal.fire({
        title: 'Are you sure?',
        text: "You are about to cancel this form. This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.post(`${ApiConfig.apiURL}cancelForm`, null, {
            params: {
              file_id,
              full_name: data.full_name,
              acc_id: data.acc_id
            }
          });

          if (response.status === 200) {
            Swal.fire('Success', 'Form cancelled successfully!', 'success').then((result) => {
              if(result){
                  window.location.reload(); // Reload the page to reflect changes
              }
          })
          } else {
            Swal.fire('Error', 'Failed to cancel form. Please try again.', 'error');
          }
        }
      });

    } catch (error) {
      console.error('Error cancelling form:', error);
      Swal.fire('Error', 'Failed to cancel form. Please try again.', 'error');
    }
  }
  

  return (
    <div>
      <div className="container mt-10">
        <div className="flex items-center justify-between bg-gray-500 p-4 pb-2 rounded-t-md">
          <div className="text-white font-medium tracking-wider">{status_id === 1 ? "Pending" : status_id === 2 ? "Completed" : "Declined"} Forms</div>
          <input
            type="text"
            placeholder="Search Student ID..."
            onChange={e => handleFilter(e.target.value)}
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

        {/* Record Details Modal */}
        {isModalOpen && selectedRecord && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-md shadow-lg w-full text-start overflow-auto" style={{ maxWidth: '800px', maxHeight: '550px' }}>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-b-gray-500">Record Details</h2>
              <div className="font-semibold text-base">
                Status: <span className={`p-2 rounded-md text-sm text-white ${status_id === 1 ? 'bg-cyan-700' : status_id === 2 ? 'bg-green-700' : 'bg-red-700'}`}>{selectedRecord.rp_status}</span>
              </div>
              <div className="font-semibold text-sm mt-7">Submitted Type: </div>
              <input
                type="text"
                disabled
                value={selectedRecord.rp_type}
                className="mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full"
              />
              <div className="font-semibold text-sm mt-5">Student Type: </div>
              <input
                type="text"
                disabled
                value={selectedRecord.student_type}
                className="mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full"
              />
              <div className="font-semibold text-sm mt-5">Remarks: </div>
              <textarea
                className="mt-2 p-2 bg-gray-100 border border-gray-600 rounded-md text-gray-600 bg-opacity-75 w-full"
                rows={5}
                value={selectedRecord.remarks || ''}
                onChange={handleRemarkChange}
                disabled
              ></textarea>
              <div className="mt-5">
                <img
                  src={require(`../../../../backend/files_img/${selectedRecord.file_img}`)}
                  alt="File"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Close
                </button>
                {status_id === 1 && (
                  <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700"
                  onClick={handleUpdateRemarks}
                >
                  Set Appointment
                </button>)}
              </div>
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        {isAppointmentModalOpen && selectedRecord && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-md shadow-lg w-full text-start overflow-auto" style={{ maxWidth: '600px' }}>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-b-gray-500">Set Appointment</h2>
              <div className="font-semibold text-sm mt-4">Appointment Date:</div>
              <input
                type="date"
                name="date"
                value={appointmentDetails.date}
                onChange={handleAppointmentChange}
                className="mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full"
              />
              <div className="font-semibold text-sm mt-4">Appointment Time:</div>
              <input
                type="time"
                name="time"
                value={appointmentDetails.time}
                onChange={handleAppointmentChange}
                className="mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full"
              />
              <div className="font-semibold text-sm mt-4">Remarks:</div>
              <input
                type="text"
                name="remarks"
                value={appointmentDetails.remarks}
                onChange={handleAppointmentChange}
                className="mt-2 p-2 bg-gray-200 rounded-md text-gray-600 bg-opacity-75 w-full"
              />
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700"
                  onClick={handleSetAppointment}
                >
                  Save Appointment 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestPending;
