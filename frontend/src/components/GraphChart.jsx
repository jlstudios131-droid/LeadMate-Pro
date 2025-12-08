import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const GraphChart = ({ title, labels, data }) => {
  // Converte labels e values em formato Recharts
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index],
  }));

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg transition-colors duration-500">
      <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-3">
        {title}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" opacity={0.4} />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              border: "none",
            }}
            itemStyle={{ color: "#f5f6fa" }}
            labelStyle={{ color: "#f5f6fa" }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ r: 4, stroke: "#6366f1", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphChart;
