import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart';
import img1 from './userlogo.png';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const doughnutData = {
  labels: ['Protein', 'Calcium', 'Fat', 'Carbs'],
  datasets: [
    {
      label: 'Nutritional Food',
      data: [300, 50, 100, 40],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgba(245, 40, 145)',
      ],
      hoverOffset: 4,
    },
  ],
};

const barData = {
  labels: ['Protein', 'Calcium', 'Fat', 'Carbs'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard</h2>

      <div style={{
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={img1} alt="User Logo" style={{ borderRadius: '50%', width: '100px', marginBottom: '1rem' }} />
          <div style={{ textAlign: 'center' }}>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Height:</strong> 180 cm</p>
            <p><strong>Weight:</strong> 75 kg</p>
          </div>
        </div>
        
        <div style={{ width: '300px', height: '300px' }}>
          <h3 style={{ textAlign: 'center' }}>Balance Score</h3>
          <GaugeChart 
            id="gauge-chart2" 
            nrOfLevels={20} 
            percent={0.86} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.2} 
            needleColor="#5A5A5A"
          />
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        marginTop: '2rem'
      }}>
        
        <div style={{ width: '300px', height: '300px' }}>
          <h3 style={{ textAlign: 'center' }}>Nutritional Food</h3>
          <Doughnut data={doughnutData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              },
              tooltip: {
                enabled: true
              }
            }
          }} />
        </div>
        
        <div style={{ width: '300px', height: '300px' }}>
          <h3 style={{ textAlign: 'center' }}>Bar Chart</h3>
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} />
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
