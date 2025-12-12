import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiLogout,
  HiChevronDown
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const dropdownVariants = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

const Navbar = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const logout = () => {
    localStorage.removeItem('token');
    setDropdownOpen(false);
    navigate('/');
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 fixed w-full z-50 shadow-md px-6 py-4 flex justify-between items-center transition-colors border-b border-gray-200/40 dark:border-gray-700/40">
      
      {/* LOGO */}
      <Link
        to="/dashboard"
        className="text-2xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition"
      >
        LeadMe Pro
      </Link>

      {/* USER DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition font-medium text-gray-700 dark:text-gray-200"
        >
          <HiOutlineUser size={20} />
          <span>Perfil</span>
          <HiChevronDown
            size={18}
            className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* MENU DROPDOWN */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 border border-gray-200/50 dark:border-gray-700/50 z-50"
            >
              <Link
                to="/profile"
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition block"
                onClick={() => setDropdownOpen(false)}
              >
                Minha Conta
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-700 rounded-lg transition"
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
