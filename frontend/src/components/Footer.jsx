import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner hover:shadow-lg mt-auto p-4 text-center text-gray-500 dark:text-gray-400 transition-all duration-300 font-medium rounded-t-xl">
      &copy; {new Date().getFullYear()} LeadMe Pro. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
