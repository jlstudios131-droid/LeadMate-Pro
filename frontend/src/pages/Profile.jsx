import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.js';
import { formatDate } from '../utils/formatters.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', createdAt: '' });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put('/auth/me', { name: user.name, email: user.email });
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar perfil.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Carregando perfil...</p>;

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-2xl font-bold text-indigo-600">Meu Perfil</h1>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-600 dark:text-gray-300">Tema:</p>
          <ThemeToggle />
        </div>

        <div className="space-y-3">
          <label className="block font-medium text-gray-700 dark:text-gray-200">Nome</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 dark:bg-gray-600 dark:border-gray-500 text-white"
          />

          <label className="block font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 dark:bg-gray-600 dark:border-gray-500 text-white"
          />

          <label className="block font-medium text-gray-700 dark:text-gray-200">Data de registro</label>
          <input
            type="text"
            value={formatDate(user.createdAt)}
            readOnly
            className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 text-gray-400"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Atualizar Perfil
        </button>
      </div>
    </div>
  );
};

export default Profile;          
