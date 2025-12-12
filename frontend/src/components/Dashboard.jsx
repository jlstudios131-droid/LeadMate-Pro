import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient.js";
import LeadCard from "./LeadCard.jsx";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await apiClient.get("/leads");
        setLeads(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 dark:text-gray-300 animate-pulse text-lg">
          Carregando leads...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Título animado */}
      <motion.h1
        className="text-3xl font-extrabold text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Dashboard
      </motion.h1>

      {/* Estado vazio */}
      {leads.length === 0 ? (
        <motion.p
          className="text-gray-400 dark:text-gray-300 text-center mt-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Nenhum lead encontrado. Comece a adicionar novos leads!
        </motion.p>
      ) : (
        // Grid de cards com animação suave
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.1 },
            },
          }}
        >
          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            >
              <LeadCard lead={lead} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
