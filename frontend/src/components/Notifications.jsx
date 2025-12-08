import React, { useState } from 'react';
import { HiBell, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Notificações iniciais (pode ser alimentado dinamicamente)
const initialNotifications = [
  { id: 1, message: 'Novo lead adicionado', type: 'info' },
  { id: 2, message: 'Lead contactado com sucesso', type: 'success' },
];

// Mapas de cores por tipo
const colorMap = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-20 right-6 flex flex-col gap-3 z-50">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg ${colorMap[n.type]} cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <HiBell size={20} />
              <span className="font-medium">{n.message}</span>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
            >
              <HiX size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
