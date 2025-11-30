import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.js';
import LeadCard from './LeadCard.jsx';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await apiClient.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        {leads.length > 0 ? leads.map((lead) => <LeadCard key={lead.id} lead={lead} />) : <p>No leads yet</p>}
      </div>
    </div>
  );
};

export default Dashboard;
