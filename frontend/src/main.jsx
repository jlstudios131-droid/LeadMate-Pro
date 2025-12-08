import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './index.css';
import './styles/theme.css';
import './styles/animations.css';

import { Toaster } from 'react-hot-toast';

const Root = () => {
  // Estado para dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Detecta preferência do usuário ou localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Atualiza a classe dark no body
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Função para alternar tema
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <>
      <BrowserRouter>
        <App darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <Toaster
          position="top-right"
          toastOptions={{
            className: 'rounded-xl shadow-lg',
            style: {
              background: isDarkMode ? '#1f2937' : '#f5f6fa',
              color: isDarkMode ? '#f5f6fa' : '#1f2937',
              fontWeight: 500,
            },
            success: {
              style: {
                background: '#14532d',
                color: '#e8fae6',
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
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
