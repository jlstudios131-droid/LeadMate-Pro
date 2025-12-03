import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const { token } = res.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      alert('Erro no login. Verifica credenciais ou consola do servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        {/* 🔥 Botão de signup correto para SPA */}
        <p className="text-center text-sm mt-4">
          Ainda não tens conta?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
