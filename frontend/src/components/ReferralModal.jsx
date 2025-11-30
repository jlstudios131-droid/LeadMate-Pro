import React, { useState } from 'react';
import apiClient from '../api/apiClient.js';

const ReferralModal = ({ leadId, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await apiClient.post('/referrals', { lead_id: leadId, message });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-lg font-bold mb-2">Enviar Referral</h2>
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
