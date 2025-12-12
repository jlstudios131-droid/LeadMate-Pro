import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiUserCircle,
  HiCog,
} from "react-icons/hi";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
    transition-all duration-300 font-medium
    ${
      isActive
        ? "bg-indigo-600 text-white shadow-md scale-[1.02]"
        : "text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 hover:text-indigo-600"
    }
  `;

  return (
    <aside
      className="
        bg-white dark:bg-gray-800 
        shadow-xl border-r border-gray-200 dark:border-gray-700
        w-64 min-w-64 p-6 h-screen
        flex flex-col gap-6
        fixed md:static z-40
        animate-[fadeIn_0.5s_ease]
      "
    >
      <h2 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
        LeadMe Pro
      </h2>

      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClasses}>
          <HiHome size={22} /> Dashboard
        </NavLink>

        <NavLink to="/profile" className={linkClasses}>
          <HiUserCircle size={22} /> Perfil
        </NavLink>

        <NavLink to="/settings" className={linkClasses}>
          <HiCog size={22} /> Configurações
        </NavLink>
      </nav>

      <div className="flex-1"></div>

      <footer className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
        © {new Date().getFullYear()} LeadMe Pro
      </footer>
    </aside>
  );
};

export default Sidebar;
