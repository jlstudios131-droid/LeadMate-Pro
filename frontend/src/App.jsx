import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Componentes de exemplo para as rotas
function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Bem-vindo ao LeadMate Pro</h1>
      <p className="mt-4 text-gray-600">Frontend rodando no Vercel com sucesso!</p>
    </div>
  );
}

function About() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Sobre o LeadMate Pro</h1>
      <p className="mt-4 text-gray-600">Este é um exemplo de página About.</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex justify-center gap-4">
        <Link className="text-blue-500 hover:underline" to="/">Home</Link>
        <Link className="text-blue-500 hover:underline" to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
