import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiLogout } from 'react-icons/hi';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white fixed w-full z-50 shadow-lg p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-extrabold text-indigo-600">
        LeadMe Pro
      </Link>

      <div className="relative">
        {/* Botão do usuário */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition"
        >
          <HiOutlineUser size={20} />
          <span className="font-medium text-gray-700">Perfil</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 animate-fadeIn">
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <HiLogout size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
