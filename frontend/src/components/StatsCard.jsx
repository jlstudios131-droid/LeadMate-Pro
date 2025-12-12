import React from "react";
import {
  HiTrendingUp,
  HiUsers,
  HiClipboardList
} from "react-icons/hi";

const iconMap = {
  Leads: {
    icon: HiUsers,
    color: "text-blue-500 dark:text-blue-400"
  },
  Conversão: {
    icon: HiTrendingUp,
    color: "text-green-500 dark:text-green-400"
  },
  ROI: {
    icon: HiClipboardList,
    color: "text-yellow-500 dark:text-yellow-400"
  }
};

const StatsCard = ({ title, value }) => {
  const { icon: Icon, color } = iconMap[title] || {
    icon: HiClipboardList,
    color: "text-indigo-500 dark:text-indigo-400"
  };

  return (
    <div
      className="
        bg-white dark:bg-gray-700 
        shadow-lg rounded-2xl 
        p-6 flex items-center justify-between 
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        border border-gray-200 dark:border-gray-600
      "
    >
      <div>
        <p className="text-gray-500 dark:text-gray-300 font-medium">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>
      </div>

      <Icon size={42} className={`${color} drop-shadow-sm`} />
    </div>
  );
};

export default StatsCard;
