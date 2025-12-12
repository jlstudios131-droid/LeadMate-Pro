import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

/*
  Agora o componente depende do estado vindo de cima (Navbar/Layout/Main),
  mantendo todo o sistema de tema centralizado.
*/

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="
        p-2 rounded-full
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition-all duration-300 shadow
        active:scale-95
      "
      aria-label="Alternar tema"
    >
      {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
