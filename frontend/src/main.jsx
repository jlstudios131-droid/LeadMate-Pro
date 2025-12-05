import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './styles/theme.css';        // Dark/Light Mode
import './styles/animations.css';   // Animações globais
import { Toaster } from 'react-hot-toast'; // Notificações globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#1f2937',
            color: '#f5f6fa',
            fontWeight: '500',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
