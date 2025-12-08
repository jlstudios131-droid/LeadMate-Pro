import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiLogout, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-md px-6 py-4 flex justify-between items-center transition-colors">
      <Link to="/dashboard" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
        LeadMe Pro
      </Link>

      <div className="relative" ref={dropdownRef}>
        {/* Botão do usuário */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition"
        >
          <HiOutlineUser size={20} />
          <span className="font-medium text-gray-700 dark:text-gray-200">Perfil</span>
          <HiChevronDown size={18} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown animado */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 flex flex-col z-50"
            >
              <Link
                to="/profile"
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition"
                onClick={() => setDropdownOpen(false)}
              >
                Minha Conta
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 rounded-lg transition"
              >
                <HiLogout size={18} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
