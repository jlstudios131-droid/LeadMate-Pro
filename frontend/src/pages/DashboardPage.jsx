import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    else setAuthToken(token);
  }, []);

  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
