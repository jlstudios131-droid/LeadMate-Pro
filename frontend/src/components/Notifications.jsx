import React, { useState, useEffect } from 'react';
import { HiBell, HiX, HiCheckCircle, HiExclamation, HiInformationCircle } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';

// Ícones por tipo
const iconMap = {
  info: HiInformationCircle,
  success: HiCheckCircle,
  warning: HiExclamation,
  error: HiExclamation,
};

// Cores por tipo
const colorMap = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

// Delay para fechar automaticamente (ms)
const AUTO_REMOVE_DELAY = 4500;

// Notificações iniciais de teste (pode ser substituído por props)
const initialNotifications = [
  { id: 1, message: 'Novo lead adicionado', type: 'info' },
  { id: 2, message: 'Lead contactado com sucesso', type: 'success' },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Auto-remover cada notificação após X segundos
  useEffect(() => {
    notifications.forEach((n) => {
      if (!n._timeoutSet) {
        n._timeoutSet = true;
        setTimeout(() => removeNotification(n.id), AUTO_REMOVE_DELAY);
      }
    });
  }, [notifications]);

  return (
    <div
      className="fixed top-20 right-5 z-50 flex flex-col gap-3"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || HiBell;

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl ${colorMap[n.type]} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-2">
                <Icon size={20} />
                <span classname="font-medium">{n.message}</span>
              </div>

              <button
                onClick={() => removeNotification(n.id)}
                aria-label="Remover notificação"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition"
              >
                <HiX size={18} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
