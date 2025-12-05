import React, { useState } from 'react';
import apiClient from '../api/apiClient.js';
import { HiX, HiPaperAirplane } from 'react-icons/hi';

const ReferralModal = ({ leadId, onClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await apiClient.post('/referrals', { lead_id: leadId, message });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 animate-fadeIn relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <HiX size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Enviar Referral</h2>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
          rows="5"
          placeholder="Escreva a sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 transition"
          >
            {loading ? 'Enviando...' : 'Enviar'} <HiPaperAirplane size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
