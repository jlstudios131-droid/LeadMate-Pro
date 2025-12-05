import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto p-4 text-center text-gray-500 dark:text-gray-400 transition-colors">
      &copy; {new Date().getFullYear()} LeadMe Pro. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
