import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
    else setAuthToken(token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 transition-all">
      {/* Navbar fixo com sombra sutil */}
      <Navbar className="shadow-md" />

      {/* Conteúdo do Dashboard com padding e animação */}
      <main className="p-6 md:p-10 animate-fadeIn">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
