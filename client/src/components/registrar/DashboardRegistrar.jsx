import React from 'react'
import CardFcms from './CardFcms'
import DashboarRegTable from './DashboarRegTable'
import SidebarFcms from './SidebarFcms'

function DashboardRegistrar() {

  return (
    <div className='h-full mb-20 xl:ml-64 xl:pl-2'>
        <SidebarFcms />
        <div className='md:text-start text-2xl font-bold border-b
        pb-2 border-b-gray-300 xl:mt-10 xl:pl-3 xl:text-4xl'>
            Dashboard
        </div>
        <div>
            <CardFcms />
        </div>
        <div>
            <DashboarRegTable />
        </div>
    </div>
  )
}

export default DashboardRegistrar