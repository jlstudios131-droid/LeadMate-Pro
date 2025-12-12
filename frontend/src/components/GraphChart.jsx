import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const GraphChart = ({ title, labels, data }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chartInstance = chartRef.current;

    if (!chartInstance) return;

    const ctx = chartInstance.canvas.getContext("2d");
    const height = chartInstance.canvas.height;

    const gradientFill = ctx.createLinearGradient(0, 0, 0, height);
    gradientFill.addColorStop(0, "rgba(99, 102, 241, 0.35)");
    gradientFill.addColorStop(1, "rgba(99, 102, 241, 0.05)");

    setGradient(gradientFill);
  }, [labels, data]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: gradient,
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        color: "#6366f1",
        font: { size: 18, weight: "600" },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(200, 200, 200, 0.15)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(200, 200, 200, 0.15)" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg transition-colors duration-300 h-72">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default GraphChart;
