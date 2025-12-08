import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { HiUser, HiOutlineMail, HiLockClosed } from 'react-icons/hi';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post('/auth/register', {
        name: name.trim(),
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
    } catch (err) {
      console.error('Signup failed', err);
      alert('Erro ao registar. Verifique a consola do servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Crie sua conta no LeadMe Pro
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Comece a gerenciar seus leads de forma inteligente
        </p>

        {/* Input Name */}
        <div className="relative mb-4">
          <HiUser className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Nome"
            aria-label="Nome"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Input Email */}
        <div className="relative mb-4">
          <HiOutlineMail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Password */}
        <div className="relative mb-6">
          <HiLockClosed className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botão Registrar */}
        <button
          onClick={handleSignup}
          disabled={loading}
          aria-label="Registrar"
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        {/* Link para Login */}
        <p className="text-center text-gray-500 mt-6">
          Já tens uma conta?{' '}
          <button
            onClick={() => navigate('/')}
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
