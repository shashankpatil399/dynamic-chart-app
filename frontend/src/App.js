import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Modal from './Modal';
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

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [prices, setPrices] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchPrices();
  }, [filter]);

  const url = process.env.REACT_APP_API_URL


  // Fetch prices from the API with error handling
  const fetchPrices = async () => {
    try {
      const response = await axios.get('https://dynamic-chart-app.onrender.com/get-prices', {
        params: { filter },
      });
      setPrices(response.data);
    } catch (error) {
      console.error('Error fetching prices:', error);
      alert('Failed to fetch prices. Please try again later.');
    }
  };

  // Handle new price submission with error handling
  const handleNewPrice = async (price) => {
    try {
      await axios.post('https://dynamic-chart-app.onrender.com/add-price', { price });
      fetchPrices(); // Refresh prices after adding a new one
    } catch (error) {
      console.error('Error adding new price:', error);
      alert('Failed to add price. Please try again later.');
    }
  };

  // Data for the Line chart
  const data = {
    labels: prices.map((p) => new Date(p.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Commodity Price',
        data: prices.map((p) => p.price),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: "0px" }}>Commodity Price analysis</h1>
      <Modal onSubmit={handleNewPrice} />
      <select
        style={{ height: "30px", marginTop: "0px", marginLeft: "28px", borderRadius: "7px" }}
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="">All Time</option>
        <option value="10minutes">Last 10 Minutes</option>
        <option value="1hour">Last 1 Hour</option>
      </select>
      <div style={{ marginTop: "40px" }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default App;
