import React, { useState } from 'react';
import StatsCard from '../components/StatsCard.jsx';
import GraphChart from '../components/GraphChart.jsx';
import LeadCard from '../components/LeadCard.jsx';
import ReferralModal from '../components/ReferralModal.jsx';
import useFetch from '../hooks/useFetch.js';
import { abbreviateName, formatDate } from '../utils/formatters.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [modalLeadId, setModalLeadId] = useState(null);

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch('/leads');

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useFetch('/stats');

  const leads = Array.isArray(leadsData) ? leadsData : [];
  const stats = Array.isArray(statsData) ? statsData : [];

  if (leadsError) toast.error('Erro ao carregar leads.');
  if (statsError) toast.error('Erro ao carregar estatísticas.');

  return (
    <motion.div
      className="space-y-10 p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Título principal */}
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
        Bem-vindo ao seu Dashboard
      </h1>

      {/* Estatísticas */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Visão Geral
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsLoading ? (
            <p className="text-gray-500 col-span-3 text-center animate-pulse">
              Carregando métricas...
            </p>
          ) : stats.length ? (
            stats.map((s, index) => (
              <StatsCard key={`${s.title}-${index}`} title={s.title} value={s.value} />
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              Nenhuma métrica disponível.
            </p>
          )}
        </div>
      </section>

      {/* Gráfico */}
      {!statsLoading && stats.length > 0 && (
        <section className="mt-8">
          <GraphChart
            title="Leads por mês"
            labels={stats.map((s) => s.month || '')}
            data={stats.map((s) => s.leads || 0)}
          />
        </section>
      )}

      {/* Leads */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Seus Leads
        </h2>

        <div className="space-y-5">
          {leadsLoading ? (
            <p className="text-gray-500 text-center animate-pulse">
              Carregando leads...
            </p>
          ) : leads.length ? (
            leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
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
                  className={`mt-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-xl ${
                    leadsLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  Enviar Referral
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Nenhum lead disponível.
            </p>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalLeadId && (
        <ReferralModal
          leadId={modalLeadId}
          onClose={() => setModalLeadId(null)}
        />
      )}
    </motion.div>
  );
};

export default DashboardPage;
