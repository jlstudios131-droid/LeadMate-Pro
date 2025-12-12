import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { toast } from 'react-hot-toast';

const SafeComponent = ({ children }) => {
  try {
    return children;
  } catch (err) {
    console.error('Erro ao renderizar componente dentro do Layout:', err);
    toast.error('Erro interno ao carregar um componente.');
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar um componente do layout.
      </div>
    );
  }
};

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

      {/* Sidebar com fallback seguro */}
      <SafeComponent>
        <Sidebar />
      </SafeComponent>

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar com fallback seguro */}
        <SafeComponent>
          <Navbar />
        </SafeComponent>

        <motion.main
          className="p-6 md:p-10 flex-1 overflow-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>

        {/* Footer com fallback seguro */}
        <SafeComponent>
          <Footer />
        </SafeComponent>
      </div>
    </div>
  );
};

export default Layout;
