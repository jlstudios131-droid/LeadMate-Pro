import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        bg-white dark:bg-gray-800 
        shadow-inner hover:shadow-xl 
        mt-auto px-6 py-4 
        text-center 
        text-gray-600 dark:text-gray-300 
        transition-all duration-300 
        font-medium 
        rounded-t-2xl
      "
    >
      © {year} LeadMe Pro — Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
