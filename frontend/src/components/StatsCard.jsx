import React from 'react';
import { HiTrendingUp, HiUsers, HiClipboardList } from 'react-icons/hi';

const iconMap = {
  Leads: HiUsers,
  Conversão: HiTrendingUp,
  "ROI": HiClipboardList,
};

const StatsCard = ({ title, value }) => {
  const Icon = iconMap[title] || HiClipboardList;

  return (
    <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center justify-between transition transform hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <p className="text-gray-500 dark:text-gray-300 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
      </div>
      <Icon className="text-indigo-500 dark:text-indigo-400" size={40} />
    </div>
  );
};

export default StatsCard;
