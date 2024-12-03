import React from 'react'
import RequestPending from './RequestPending';
import SidebarAd from './SidebarAd';
import AppointmentTable from './AppointmentTable';

function RerportCompleted() {
  return (
    <div className='h-full mb-20 xl:ml-64 xl:pl-2'>
            <SidebarAd />
            <div className='md:text-start text-2xl border-b
            pb-2 border-b-gray-300 xl:mt-10 xl:pl-3 xl:text-4xl font-medium text-red-700'>
                Table Requests
            </div>
            <RequestPending status_id={2} />
            <AppointmentTable statusId={2} />
        </div>
  )
}

export default RerportCompleted