import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome, HiUserCircle, HiCog } from 'react-icons/hi';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
    }`;

  return (
    <aside className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-64 p-6 h-full flex flex-col gap-4 animate-fadeIn">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Menu</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClasses}>
          <HiHome size={20} /> Dashboard
        </NavLink>

        <NavLink to="/profile" className={linkClasses}>
          <HiUserCircle size={20} /> Perfil
        </NavLink>

        <NavLink to="/settings" className={linkClasses}>
          <HiCog size={20} /> Configurações
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
