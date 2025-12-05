import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.js';
import LeadCard from './LeadCard.jsx';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await apiClient.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500 text-center mt-10 animate-pulse">Carregando leads...</p>
      ) : leads.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">Nenhum lead encontrado. Comece a adicionar novos leads!</p>
      )}
    </div>
  );
};

export default Dashboard;
