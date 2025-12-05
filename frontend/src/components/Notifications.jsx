import React from 'react';

const notifications = [
  { id: 1, message: 'Novo lead adicionado', type: 'info' },
  { id: 2, message: 'Lead contactado com sucesso', type: 'success' },
];

const colorMap = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

const BellIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3c0 .386-.148.735-.405 1.001L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const Notifications = () => {
  return (
    <div className="fixed top-20 right-6 flex flex-col gap-3 z-50">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-md ${colorMap[n.type]} animate-fadeIn`}
        >
          <BellIcon className="w-5 h-5" />
          <span className="font-medium">{n.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
