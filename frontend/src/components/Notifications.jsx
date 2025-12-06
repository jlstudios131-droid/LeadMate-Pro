import React from 'react';  
import { HiBell } from 'react-icons/hi';  
  
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
  
const Notifications = () => {  
  return (  
    <div className="fixed top-20 right-6 flex flex-col gap-3 z-50">  
      {notifications.map((n) => (  
        <div key={n.id} className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-md ${colorMap[n.type]} animate-fadeIn`}>  
          <HiBell size={20} />  
          <span className="font-medium">{n.message}</span>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default Notifications;
