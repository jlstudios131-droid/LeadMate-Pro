import React, { useState, useEffect, useRef } from 'react';
import { HiX, HiPaperAirplane } from 'react-icons/hi';
import apiClient from '../api/apiClient.js';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.4, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ReferralModal = ({ leadId, onClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  // Foco inicial
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error('Digite uma mensagem antes de enviar.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/referrals', { lead_id: leadId, message });
      toast.success('Referral enviado com sucesso!');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar referral. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black dark:bg-gray-900 backdrop-blur-sm"
          variants={backdropVariants}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl w-96 p-6 relative z-10"
          variants={modalVariants}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
          >
            <HiX size={24} />
          </button>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Enviar Referral
          </h2>

          <textarea
            ref={textareaRef}
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition resize-none"
            rows="5"
            placeholder="Escreva a sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-xl font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar'} <HiPaperAirplane size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReferralModal;
