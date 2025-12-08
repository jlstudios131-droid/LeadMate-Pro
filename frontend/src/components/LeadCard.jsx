import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const statusColors = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Qualified: 'bg-green-100 text-green-800',
  Lost: 'bg-red-100 text-red-800',
};

const LeadCard = ({ lead }) => {
  const { name, email, phone, property, score, status } = lead;

  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}
        >
          {status}
        </span>
      </div>

      <div className="text-gray-600 dark:text-gray-300 space-y-1 mb-4">
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Phone:</span> {phone}</p>
        <p><span className="font-semibold">Property:</span> {property}</p>
        <p><span className="font-semibold">Lead Score:</span> {score}</p>
      </div>

      <button className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl font-semibold transition shadow-md hover:shadow-xl">
        Ver Detalhes <HiChevronRight size={20} />
      </button>
    </motion.div>
  );
};

export default LeadCard;
