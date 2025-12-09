import React, { useState } from 'react';
import StatsCard from '../components/StatsCard.jsx';
import GraphChart from '../components/GraphChart.jsx';
import LeadCard from '../components/LeadCard.jsx';
import ReferralModal from '../components/ReferralModal.jsx';
import useFetch from '../hooks/useFetch.js';
import { abbreviateName, formatDate } from '../utils/formatters.js';
import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const [modalLeadId, setModalLeadId] = useState(null);

  // Buscar leads e estatísticas
  const { data: leadsData, loading: leadsLoading, error: leadsError } = useFetch('/leads');
  const { data: statsData, loading: statsLoading, error: statsError } = useFetch('/stats');

  const leads = Array.isArray(leadsData) ? leadsData : [];
  const stats = Array.isArray(statsData) ? statsData : [];

  // Exibir erro se houver
  if (leadsError) toast.error('Erro ao carregar leads.');
  if (statsError) toast.error('Erro ao carregar estatísticas.');

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsLoading ? (
          <p className="text-gray-500 col-span-3 text-center">Carregando métricas...</p>
        ) : stats.length > 0 ? (
          stats.map((s, index) => (
            <StatsCard key={`${s.title}-${index}`} title={s.title} value={s.value} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">Nenhuma métrica disponível.</p>
        )}
      </div>

      {/* Gráfico principal */}
      {!statsLoading && stats.length > 0 && (
        <GraphChart
          title="Leads por mês"
          labels={stats.map((s) => s.month || '')}
          data={stats.map((s) => s.leads || 0)}
        />
      )}

      {/* Lista de leads */}
      <div className="space-y-4">
        {leadsLoading ? (
          <p className="text-gray-500 text-center">Carregando leads...</p>
        ) : leads.length > 0 ? (
          leads.map((lead) => (
            <div key={lead.id} className="relative">
              <LeadCard
                lead={{
                  ...lead,
                  name: abbreviateName(lead.name || 'Sem nome'),
                  createdAt: formatDate(lead.createdAt || new Date()),
                }}
              />
              <button
                onClick={() => setModalLeadId(lead.id)}
                disabled={leadsLoading}
                className={`mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-xl ${
                  leadsLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                Enviar Referral
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Nenhum lead disponível.</p>
        )}
      </div>

      {/* Modal de referral */}
      {modalLeadId && (
        <ReferralModal leadId={modalLeadId} onClose={() => setModalLeadId(null)} />
      )}
    </div>
  );
};

export default DashboardPage;
