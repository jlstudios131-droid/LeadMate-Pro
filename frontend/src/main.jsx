import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './index.css';
import './styles/theme.css';
import './styles/animations.css';

import { Toaster } from 'react-hot-toast';

const Root = () => {
  // Tema inicial: localStorage → preferência do sistema → fallback
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sincroniza com Tailwind e localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add('dark');
    else html.classList.remove('dark');

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <BrowserRouter>
      <App darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'rounded-xl shadow-lg border border-black/10 dark:border-white/10',
          style: {
            background: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            fontWeight: 500,
          },
          success: {
            style: {
              background: '#14532d',
              color: '#d1fae5',
            },
          },
          error: {
            style: {
              background: '#7f1d1d',
              color: '#fee2e2',
            },
          },
        }}
      />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
