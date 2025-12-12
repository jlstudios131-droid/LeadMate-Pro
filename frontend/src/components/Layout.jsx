import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { toast } from 'react-hot-toast';

/* ============================================================
   Componente à prova de falhas (Fail-Safe Wrapper)
============================================================ */
const Safe = ({ children }) => {
  try {
    return children;
  } catch (err) {
    console.error('Erro no componente do Layout:', err);
    toast.error('Erro no layout. Atualize a página.');
    return (
      <div className="p-4 text-red-500 text-sm">
        Erro ao carregar esta seção.
      </div>
    );
  }
};

/* ============================================================
   Layout principal premium
============================================================ */
const Layout = ({ children }) => {
  return (
    <div className="
      flex min-h-screen 
      bg-gray-50 dark:bg-gray-900 
      transition-colors duration-300
    ">
      {/* Sidebar fixa estável */}
      <Safe>
        <Sidebar />
      </Safe>

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Safe>
          <Navbar />
        </Safe>

        {/* Conteúdo animado */}
        <motion.main
          className="p-4 md:p-10 flex-1 overflow-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {children}
        </motion.main>

        {/* Footer */}
        <Safe>
          <Footer />
        </Safe>
      </div>
    </div>
  );
};

export default Layout;
