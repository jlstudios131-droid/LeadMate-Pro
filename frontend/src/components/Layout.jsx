import React from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
