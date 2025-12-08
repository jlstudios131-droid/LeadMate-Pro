import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.js';
import LeadCard from './LeadCard.jsx';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await apiClient.get('/leads');
        setLeads(res.data || []);
      } catch (err) {
        console.error('Erro ao buscar leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 animate-pulse text-lg">Carregando leads...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      {leads.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-300 text-center mt-10">
          Nenhum lead encontrado. Comece a adicionar novos leads!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
