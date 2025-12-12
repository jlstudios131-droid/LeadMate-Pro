import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.js';
import { formatDate } from '../utils/formatters.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', createdAt: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      setUser({
        name: res.data.name,
        email: res.data.email,
        createdAt: res.data.createdAt
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const name = user.name.trim();
    const email = user.email.trim();

    if (!name || !email) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      setUpdating(true);
      await apiClient.put('/auth/me', { name, email });
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar perfil.');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10 animate-pulse">
        Carregando perfil...
      </p>
    );

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Meu Perfil
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md space-y-6">
        {/* Tema */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-700 dark:text-gray-300">Tema:</p>
          <ThemeToggle />
        </div>

        {/* Campos */}
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Nome
            </label>
            <input
              type="text"
              aria-label="Nome"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              aria-label="Email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
            />
          </div>

          {/* Data */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Data de Registro
            </label>
            <input
              type="text"
              value={formatDate(user.createdAt)}
              readOnly
              className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={handleUpdate}
          disabled={updating}
          aria-label="Atualizar Perfil"
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition ${
            updating ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {updating ? 'Atualizando...' : 'Atualizar Perfil'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
