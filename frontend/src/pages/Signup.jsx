import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await apiClient.post('/auth/register', { name, email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Registro falhou');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input type="text" placeholder="Nome" className="w-full p-2 border rounded mb-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" className="w-full p-2 border rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup} className="w-full bg-green-600 text-white py-2 rounded">Registrar</button>
      </div>
    </div>
  );
};

export default Signup;
