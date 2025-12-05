import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post('/auth/login', { email, password });
      const { token } = res.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      alert('Erro no login. Verifica credenciais ou consola do servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Bem-vindo ao LeadMe Pro</h2>
        <p className="text-center text-gray-500 mb-8">Gerencie seus leads de forma inteligente e fácil</p>

        {/* Input Email */}
        <div className="relative mb-4">
          <span className="absolute top-3 left-3 text-gray-400 text-xl">📧</span>
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Password */}
        <div className="relative mb-6">
          <span className="absolute top-3 left-3 text-gray-400 text-xl">🔒</span>
          <input
            type="password"
            placeholder="Senha"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botão Login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? 'Entrando...' : 'Login'}
        </button>

        {/* Signup */}
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
