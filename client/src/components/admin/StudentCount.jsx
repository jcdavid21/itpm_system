import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';
import ApiConfig from '../../Config/localconfigapi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function StudentCount() {
  const [chartType, setChartType] = useState('1');
  const [studentData, setStudentData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${ApiConfig.apiURL}studentCountByMonth`);
        const data = response.data;

        const months = data.map((entry) => entry.month);
        const counts = data.map((entry) => entry.count);

        setLabels(months);
        setStudentData(counts);
      } catch (err) {
        console.error('Error fetching student count data:', err);
      }
    };

    fetchStudentData();
  }, []);

  const randomColor = () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;

  const backgroundColors = studentData.map(() => randomColor());

  return (
    <div className="ml-10">
      <div className="flex justify-start mb-4">
        <select
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-200 text-gray-600 text-sm font-medium p-2 rounded-md"
        >
          <option value="1">Bar</option>
          <option value="2">Pie</option>
          <option value="3">Line</option>
        </select>
      </div>
      <div className="dataCard bg-gray-50 overflow-x-auto" style={{ height: '350px' }}>
        {chartType === '1' ? (
          <Bar
            key="bar-chart"
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Student Count',
                  data: studentData,
                  backgroundColor: backgroundColors,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : chartType === '2' ? (
          <Doughnut
            key="doughnut-chart"
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Student Count',
                  data: studentData,
                  backgroundColor: backgroundColors,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : chartType === '3' ? (
          <Line
            key="line-chart"
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Student Count',
                  data: studentData,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: backgroundColors,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default StudentCount;
