import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
};

const ModalWrapper = ({ children, onClose, isOpen }) => {
  // Fechar com ESC com callback estável (evita recriações desnecessárias)
  const handleEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleEsc]);

  // Bloquear scroll da página enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-96 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
