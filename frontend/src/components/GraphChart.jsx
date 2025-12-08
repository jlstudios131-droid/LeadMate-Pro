import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphChart = ({ title, labels, data }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradientBg = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBg.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradientBg.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
    setGradient(gradientBg);
  }, [data]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: gradient,
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 18 }, color: '#4f46e5' },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f5f6fa',
        bodyColor: '#f5f6fa',
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
        ticks: { color: '#374151' },
      },
      x: {
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
        ticks: { color: '#374151' },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg transition-colors duration-500">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default GraphChart;
