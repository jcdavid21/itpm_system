import React, { useState, useEffect} from 'react'
import Navigation from './Navbar'
import Sidebar from './Sidebar'
import AppoinmentTable from './AppointmentTable'

function Appointment() {
  return (
    <div className='bg-gray-50 h-full pb-32'>
        <Navigation />
        <Sidebar />
        <div className='flex items-center justify-center h-svh ml-32 max-md:ml-0 2xl:ml-0'>
            <div className='max-w-screen-lg 2xl:max-w-screen-lg
            p-4 ml-20 max-lg:ml-3 mr-3 w-full md:w-max lg:w-full flex flex-col items-start'>
                <div className='text-start text-red-700 text-xl font-medium 
                border-b-2 border-b-red-700 pb-2 lg:text-2xl'>
                    All Appointments
                </div>
                <div className='px-3 py-2 border border-gray-400 mt-3 font-light rounded-md text-red-700'>Once you have an appointment, ensure to submit the required documents promptly in the registrar.</div>
                <AppoinmentTable statusId={1} />
            </div>
            
        </div>
    </div>
  )
}

export default Appointment