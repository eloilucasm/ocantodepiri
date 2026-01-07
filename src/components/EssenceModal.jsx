import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const EssenceModal = ({ isOpen, onClose, text }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-lg bg-[#f5ece3] rounded-sm shadow-2xl overflow-hidden p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#924032]/10 transition-colors text-[#924032] outline-none"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center">
            {/* Decorative Element (optional, can be a small line or symbol) */}
            <div className="w-8 h-[2px] bg-[#924032]/30 mb-8"></div>

            <div className="prose prose-stone max-w-none w-full">
              <p className="text-base md:text-lg leading-loose text-[#5c6352] font-serif text-justify whitespace-pre-line tracking-wide">
                {text}
              </p>
            </div>
            
            <div className="w-1.5 h-1.5 bg-[#924032]/40 rounded-full mt-8"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default EssenceModal;
