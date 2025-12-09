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

// Registrar módulos do Chart.js
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

  // Criar gradiente suave
  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;
    const ctx = chart.ctx;

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, "rgba(99, 102, 241, 0.35)");
    gradientFill.addColorStop(1, "rgba(99, 102, 241, 0.05)");

    setGradient(gradientFill);
  }, [data]);

  // Estrutura dos dados Chart.js
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

  // Configurações visuais
  const options = {
    responsive: true,
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
        backgroundColor: "#1f2937",
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
        grid: { color: "rgba(200,200,200,0.2)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(200,200,200,0.2)" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg transition-colors duration-300">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default GraphChart;
