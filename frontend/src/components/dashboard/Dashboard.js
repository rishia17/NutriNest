import React, { useState } from 'react';
import './Dashboard.css';
import GaugeChart from 'react-gauge-chart';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Scatter } from "recharts";
import img1 from './userlogo.png';
import { useSelector } from 'react-redux';
import { marked } from 'marked';
import { Fade, Zoom } from "react-awesome-reveal";


const API_KEY=process.env.REACT_APP_API_KEY
function HealthyWeightRangeChart({ height, weight }) {
  const minHealthyWeight = (18.5 * (height / 100) ** 2).toFixed(1);
  const maxHealthyWeight = (24.9 * (height / 100) ** 2).toFixed(1);

  const data = [
    { name: "Healthy Range", min: parseFloat(minHealthyWeight), max: parseFloat(maxHealthyWeight) },
  ];

  return (
    <BarChart
      width={400}
      height={200}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, (maxHealthyWeight * 1.2).toFixed(2)]} />
      <YAxis type="category" dataKey="name" />
      <Tooltip />

      <Bar dataKey="max" fill="#82ca9d" background={{ fill: "#eee" }}>
        {data.map((entry, index) => (
          <rect
            key={index}
            x={entry.min}
            y={index * 40 + 10}
            width={entry.max - entry.min}
            height={20}
            fill="#82ca9d"
          />
        ))}
      </Bar>

      <Scatter
        data={[{ name: "Current Weight", weight }]}
        fill="#FF6347"
        shape="circle"
      />
    </BarChart>
  );
}

function Dashboard() {
  const [sugg, setSugg] = useState('');
  const { currentUser } = useSelector(state => state.userLogin);

  function calculateBMI(currentUser) {
    const heightInMeters = currentUser.height / 100;
    const bmi = currentUser.weight / (heightInMeters ** 2);
    return bmi.toFixed(2);
  }

  function getBMIPercentAndColor(bmi) {
    let percent;
    let color;

    if (bmi < 18.5) {
      percent = 0.25;
      color = ["#FFDD00", "#FFC371"];
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      percent = 0.5;
      color = ["#00C851", "#007E33"];
    } else if (bmi >= 25 && bmi <= 29.9) {
      percent = 0.75;
      color = ["#FFBB33", "#FF8800"];
    } else {
      percent = 1;
      color = ["#FF4444", "#CC0000"];
    }

    return { percent, color };
  }

  // Sample function for button action
  const handleButtonClick = async (currentUser) => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(`
just for information purpose (do not give any disclaimers), best food items to eat for a ${currentUser.gender} with weight ${currentUser.weight}kgs and height ${currentUser.height}cms (do not give any disclaimer)`);
      const formattedResponse = marked(result.response.text());

      // Update responses with the new query and response
      setSugg(formattedResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // BMI categories and their percentage ranges
  const bmiCategories = [
    { category: 'Underweight', range: 'BMI < 18.5', percentage: '0% to 25%' },
    { category: 'Normal Weight', range: 'BMI 18.5 - 24.9', percentage: '25% to 50%' },
    { category: 'Overweight', range: 'BMI 25 - 29.9', percentage: '50% to 75%' },
    { category: 'Obesity', range: 'BMI ≥ 30', percentage: '75% to 100%' },
  ];

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
      <Fade duration={1000}>
        <h2 className="dashwel mt-5">Welcome {currentUser.name}</h2>
      </Fade>

      <Fade duration={1000}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}>
          <Zoom>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '85%', padding: '4rem' }}>
              <img src={img1} alt="User Logo" style={{ borderRadius: '50%', width: '100px', marginBottom: '1rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p className="heiweitxt"><strong>Height:</strong> {currentUser.height} cm</p>
                <p className="heiweitxt"><strong>Weight:</strong> {currentUser.weight} kg</p>
                <p className="heiweitxt"><strong>Body Mass Index (BMI):</strong> {calculateBMI(currentUser)} kg/m<sup>2</sup></p>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '1rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                width: '300px',
                textAlign: 'center'
              }}>
                <h4>BMI Categories</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {bmiCategories.map((category, index) => (
                    <li key={index}>
                      <strong>{category.category}:</strong> {category.range} (Percentage: {category.percentage})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Zoom>

          <Zoom>
            <div style={{ width: '500px', height: '500px', padding: '4rem' }}>
              <h3 style={{ textAlign: 'center' }}>BMI Score</h3>
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={20}
                percent={getBMIPercentAndColor(calculateBMI(currentUser)).percent}
                colors={getBMIPercentAndColor(calculateBMI(currentUser)).color}
                arcWidth={0.2}
                needleColor="#5A5A5A"
                textColor="#bcbdb9"
              />

              <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Healthy Weight Range Chart</h2>
              <HealthyWeightRangeChart height={currentUser.height} weight={currentUser.weight} />
            </div>
          </Zoom>
        </div>
      </Fade>

      <Fade duration={1000}>
        <button
          onClick={() => { handleButtonClick(currentUser) }}
          style={{
            margin: '40px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Generate suggestions
        </button>
      </Fade>

      {sugg && (
        <Fade duration={1000}>
          <div className="m-5">
            <div
              dangerouslySetInnerHTML={{ __html: sugg }}
              style={{ textAlign:'left' }} // Left align the response text
            />
          </div>
        </Fade>
      )}
    </div>
  );
}

export default Dashboard;
