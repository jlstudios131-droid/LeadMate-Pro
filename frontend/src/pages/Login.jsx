import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';
import { motion } from 'framer-motion';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700"
      >
        {/* Logo / Marca */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
            LeadMe Pro
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
            Gestão de leads simplificada e poderosa
          </p>
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <HiOutlineMail className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl 
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none transition text-gray-800 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="relative mb-7">
          <HiLockClosed className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl 
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none transition text-gray-800 dark:text-gray-100"
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
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl 
                      transition shadow-md hover:shadow-xl flex justify-center ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {/* Criar conta */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          Não tens conta?
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline ml-1"
          >
            Criar conta
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
