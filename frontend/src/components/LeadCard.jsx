import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const statusColors = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const LeadCard = ({ lead }) => {
  const { name, email, phone, property, score, status } = lead;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg
                 hover:shadow-2xl transition-transform duration-300
                 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {name}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold 
          ${statusColors[status] || 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
        >
          {status}
        </span>
      </div>

      {/* Information */}
      <div className="text-gray-600 dark:text-gray-300 space-y-1.5 mb-6">
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Telefone:</span> {phone}</p>
        <p><span className="font-semibold">Propriedade:</span> {property}</p>
        <p><span className="font-semibold">Lead Score:</span> {score}</p>
      </div>

      {/* Button */}
      <button
        className="w-full flex items-center justify-between bg-indigo-600 
                   hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl 
                   font-semibold transition shadow-md hover:shadow-xl"
      >
        Ver Detalhes
        <HiChevronRight size={20} />
      </button>
    </motion.div>
  );
};

export default LeadCard;
