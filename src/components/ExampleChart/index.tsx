import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function App() {

  const [chart,setChart] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3333/charts').then((response)=>{
      setChart(response.data)
    })
  },[])


  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    // scales: {
    // },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  
  const data = {
    labels: chart?.date,
    datasets: [
      {
        label: 'Dataset 1',
        data: chart?.gains,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
