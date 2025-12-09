import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { toast } from 'react-hot-toast';

const Layout = ({ children }) => {
  const SafeComponent = ({ Component }) => {
    try {
      return <Component />;
    } catch (err) {
      console.error('Erro no componente Layout:', err);
      toast.error('Erro interno de layout. Recarregue a página.');
      return <div className="p-4 text-red-500">Erro ao carregar o layout.</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Sidebar segura */}
      <SafeComponent Component={Sidebar} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SafeComponent Component={Navbar} />

        <motion.main
          className="p-6 md:p-10 flex-1 overflow-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>

        <SafeComponent Component={Footer} />
      </div>
    </div>
  );
};

export default Layout;
