import React, { useState, useEffect, useRef } from 'react';
import { HiX, HiPaperAirplane } from 'react-icons/hi';
import apiClient from '../api/apiClient.js';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.24, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.45, transition: { duration: 0.24 } },
  exit: { opacity: 0, transition: { duration: 0.18 } }
};

const ReferralModal = ({ leadId, onClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    if (loading) return;
    if (!message.trim()) {
      toast.error('Digite uma mensagem antes de enviar.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/referrals', { lead_id: leadId, message });
      toast.success('Referral enviado com sucesso.');
      onClose();
    } catch (err) {
      toast.error('Erro ao enviar referral. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="absolute inset-0 bg-black/60 dark:bg-gray-900/70 backdrop-blur-sm"
          variants={backdropVariants}
          onClick={onClose}
        />

        <motion.div
          variants={modalVariants}
          className="relative z-10 w-96 bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6"
        >
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
          >
            <HiX size={22} />
          </button>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Enviar Referral
          </h2>

          <textarea
            ref={textareaRef}
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva a sua mensagem..."
            className="w-full resize-none p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-xl font-medium transition"
            >
              Cancelar
            </button>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar'}
              <HiPaperAirplane size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReferralModal;
