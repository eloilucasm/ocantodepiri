import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
           {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto z-[80] w-[90vw] md:w-[500px] h-fit bg-[#f5ece3] p-8 md:p-12 shadow-2xl rounded-sm text-[#69725d]"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                 <h3 className="text-3xl font-serif italic text-[#924032]">Sua Reserva</h3>
                 <p className="text-xs uppercase tracking-widest opacity-60 mt-1">Ô Canto de Piri</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#924032]/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
                <div className="p-6 bg-white/50 border border-[#924032]/10 rounded-sm hover:border-[#924032]/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#924032]/10 p-3 rounded-full text-[#924032] group-hover:bg-[#924032] group-hover:text-white transition-colors">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-xs tracking-wider">Ver Disponibilidade</h4>
                            <p className="text-sm opacity-70">Consulte datas no Airbnb</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white/50 border border-[#924032]/10 rounded-sm hover:border-[#924032]/30 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="bg-[#25D366]/10 p-3 rounded-full text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-xs tracking-wider">Falar no WhatsApp</h4>
                            <p className="text-sm opacity-70">Atendimento personalizado</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#924032]/10 text-center">
                <p className="text-xs opacity-50 italic">"Estamos ansiosos para te receber."</p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
