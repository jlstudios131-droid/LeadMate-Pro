import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient.js';
import { HiOutlineMail, HiLockClosed, HiUser } from 'react-icons/hi';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no signup:', error);
      alert('Falha ao criar conta. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Criar Conta
        </h2>

        {/* Nome */}
        <div className="relative mb-4">
          <HiUser className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Nome Completo"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <HiOutlineMail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <HiLockClosed className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Senha"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>

        <p className="text-center text-gray-500 mt-6">
          Já tens conta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-medium hover:underline"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
