import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './index.css';
import './styles/theme.css';
import './styles/animations.css';

import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'rounded-xl shadow-lg',
          style: {
            background: '#1f2937',
            color: '#f5f6fa',
            fontWeight: 500,
          },
          success: {
            style: { background: '#14532d', color: '#e8fae6' },
          },
          error: {
            style: { background: '#7f1d1d', color: '#fee2e2' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
