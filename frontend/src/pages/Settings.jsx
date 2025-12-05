import React, { useState, useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle.jsx';
import apiClient from '../api/apiClient.js';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação: buscar preferências do usuário
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/settings');
        setNotificationsEnabled(res.data.notificationsEnabled);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.put('/settings', { notificationsEnabled });
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar configurações.');
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Carregando configurações...</p>;

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-2xl font-bold text-indigo-600">Configurações</h1>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg max-w-md space-y-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Tema:</span>
          <ThemeToggle />
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Notificações:</span>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="w-5 h-5 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Settings;
