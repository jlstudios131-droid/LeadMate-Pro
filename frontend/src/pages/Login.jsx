import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      const { token } = res.data;
      if (!token) {
        alert('Token inválido retornado pelo servidor.');
        return;
      }

      localStorage.setItem('token', token);
      setAuthToken(token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Falha no login. Verifique credenciais ou o backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Bem-vindo ao LeadMe Pro
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Gerencie seus leads de forma inteligente e simples
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <HiOutlineMail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <HiLockClosed className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {/* Botão */}
        <button
          onClick={handleLogin}
          disabled={loading}
          aria-label="Login"
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Entrando...' : 'Login'}
        </button>

        {/* Criar conta */}
        <p className="text-center text-gray-500 mt-6">
          Ainda não tens conta?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 font-medium hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
