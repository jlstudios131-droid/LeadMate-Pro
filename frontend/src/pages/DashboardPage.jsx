import React, { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard.jsx';
import GraphChart from '../components/GraphChart.jsx';
import LeadCard from '../components/LeadCard.jsx';
import ReferralModal from '../components/ReferralModal.jsx';
import apiClient from '../api/apiClient.js';
import useFetch from '../hooks/useFetch.js';

const DashboardPage = () => {
  const [modalLeadId, setModalLeadId] = useState(null);

  // Buscar leads
  const { data: leads = [], loading: leadsLoading } = useFetch('/leads');
  // Buscar estatísticas
  const { data: stats = [], loading: statsLoading } = useFetch('/stats');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!statsLoading
          ? stats.map((s) => <StatsCard key={s.title} title={s.title} value={s.value} />)
          : <p className="text-gray-500 col-span-3 text-center">Carregando métricas...</p>}
      </div>

      {/* Gráfico principal */}
      {!statsLoading && stats.length > 0 && (
        <GraphChart
          title="Leads por mês"
          labels={stats.map((s) => s.month)}
          data={stats.map((s) => s.leads)}
        />
      )}

      {/* Lista de leads */}
      <div className="space-y-4">
        {!leadsLoading ? (
          leads.length > 0 ? (
            leads.map((lead) => (
              <div key={lead.id} className="relative">
                <LeadCard lead={lead} />
                <button
                  onClick={() => setModalLeadId(lead.id)}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-xl"
                >
                  Enviar Referral
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum lead disponível.</p>
          )
        ) : (
          <p className="text-gray-500">Carregando leads...</p>
        )}
      </div>

      {/* Modal de referral */}
      {modalLeadId && <ReferralModal leadId={modalLeadId} onClose={() => setModalLeadId(null)} />}
    </div>
  );
};

export default DashboardPage;
