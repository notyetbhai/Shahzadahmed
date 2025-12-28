import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-background rounded-lg shadow-xl w-full max-w-md p-8 border border-border-gray"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-serif text-heading mb-4">{title}</h2>
            <p className="text-body mb-8">{message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors duration-300 bg-card-gray text-body hover:bg-border-gray"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-6 py-2 text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors duration-300 bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
