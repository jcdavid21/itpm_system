import React, { useState, useEffect } from 'react';
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import axios from 'axios';
import ApiConfig from '../../Config/localconfigapi';

function Card() {
  const [stats, setStats] = useState({
    request: 0,
    students: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    totalMsg: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiConfig.apiURL}totalRequests`);
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-lg w-full xl:max-w-screen-2xl xl:overflow-auto overflow-x-scroll mt-4">
        <div className="flex gap-4 p-4">
          {/* Card 1: Pending Request */}
          <div className="shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full">
            <div className="flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400">
              <IoDocumentTextOutline className="text-xl" />
              <div className="text-sm">Pending Request</div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="text-5xl font-medium text-gray-700 mb-10">
                {stats.request}
              </div>
            </div>
          </div>

          {/* Card 2: Total Students */}
          <div className="shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full">
            <div className="flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400">
              <PiChalkboardTeacherLight className="text-xl" />
              <div className="text-sm">Total Students</div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="text-5xl font-medium text-gray-700 mb-10">
                {stats.students}
              </div>
            </div>
          </div>

          {/* Card 3: Pending Appointments */}
          <div className="shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full">
            <div className="flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400">
              <IoDocumentTextOutline className="text-xl" />
              <div className="text-sm">Pending Appointments</div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="text-5xl font-medium text-gray-700 mb-10">
                {stats.pendingAppointments}
              </div>
            </div>
          </div>

          {/* Card 4: Completed Appointments */}
          <div className="shadow-lg rounded-md overflow-hidden h-40 p-3 bg-gray-50 flex-shrink-0 xl:flex-shrink w-64 xl:w-full">
            <div className="flex justify-center items-center font-medium gap-1 text-red-700 text-lg pb-3 border-b border-b-gray-400">
              <IoDocumentTextOutline className="text-xl" />
              <div className="text-sm">Completed Appointments</div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="text-5xl font-medium text-gray-700 mb-10">
                {stats.approvedAppointments}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
