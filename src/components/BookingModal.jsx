import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, ArrowUpRight, MapPin } from 'lucide-react';
import { useHouse } from '../context/HouseContext';
import HouseSwitcher from './HouseSwitcher';

const BookingModal = ({ isOpen, onClose }) => {
  const { currentHouse, houses } = useHouse(); // Get 'houses' from context
  const [modalHouseId, setModalHouseId] = React.useState(currentHouse?.id || 'casa1');

  // Sync with global state when opening, but allow divergence afterwards
  React.useEffect(() => {
    if (isOpen && currentHouse?.id) {
      setModalHouseId(currentHouse.id);
    }
  }, [isOpen, currentHouse]);

  // Use the locally selected house for display
  const displayHouse = houses[modalHouseId] || currentHouse;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#69725d]/40 backdrop-blur-md z-[70] transition-all duration-500"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[80] p-4 pointer-events-none">
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}

              className="w-full max-w-4xl bg-[#f5ece3] overflow-hidden shadow-2xl rounded-2xl md:rounded-[2rem] flex flex-col md:flex-row pointer-events-auto max-h-[90vh] md:h-auto will-change-transform"
            >
              
              {/* Image Section (Left/Top) */}
              <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-700"></div>
                <Motion.img 
                  key={displayHouse.id} // Add key to force re-animate on switch
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={displayHouse.modalImage || displayHouse.hero.img} 
                  alt={displayHouse.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Image Overlay Info */}
                <div className="absolute bottom-6 left-6 z-20 text-white hidden md:block">
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 mb-2">Sua escolha</p>
                   <h4 className="font-serif italic text-2xl">{displayHouse.name}</h4>
                </div>
              </div>

              {/* Content Section (Right/Bottom) */}
              <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col relative bg-[#f5ece3]">
                
                 {/* Header Actions: HouseSwitcher + Close */}
                 <div className="flex justify-between items-start mb-6">
                    <div className="scale-90 origin-top-left -ml-1">
                        <HouseSwitcher 
                            activeId={modalHouseId} 
                            onSwitch={setModalHouseId} 
                            isModal={true} 
                        />
                    </div>
                    <button 
                      onClick={onClose} 
                      aria-label="Close modal"
                      className="p-2 rounded-full hover:bg-[#924032]/10 text-[#69725d] hover:text-[#924032] transition-colors -mr-2 -mt-2"
                    >
                      <X size={24} />
                    </button>
                 </div>

                <div className="mt-2 md:mt-0 mb-10">
                   <h3 className="text-3xl md:text-5xl font-serif italic text-[#924032] mb-4">
                     Faça sua Reserva
                   </h3>
                   <p className="text-[#69725d]/70 font-light leading-relaxed max-w-sm">
                     Você está a um passo de viver momentos inesquecíveis. Escolha como prefere prosseguir.
                   </p>
                </div>

                <div className="space-y-4">
                    {/* Airbnb Option */}
                    <a 
                      href={displayHouse.hero.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 md:p-6 bg-white border border-[#924032]/10 rounded-xl hover:bg-[#fa565d] hover:border-[#fa565d] hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-full bg-[#fa565d]/10 flex items-center justify-center text-[#fa565d] group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                <Calendar size={22} strokeWidth={1.5} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-[#69725d] group-hover:text-white transition-colors">Airbnb</h4>
                                <p className="text-xs text-[#69725d]/60 group-hover:text-white/80 uppercase tracking-wider mt-0.5 transition-colors">Ver disponibilidade</p>
                            </div>
                        </div>
                        <ArrowUpRight size={20} className="text-[#924032]/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </a>

                    {/* WhatsApp Option */}
                    <a 
                      href="https://api.whatsapp.com/send/?phone=5562996558022&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 md:p-6 bg-white border border-[#924032]/10 rounded-xl hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                <MessageCircle size={22} strokeWidth={1.5} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-[#69725d] group-hover:text-white transition-colors">WhatsApp</h4>
                                <p className="text-xs text-[#69725d]/60 group-hover:text-white/80 uppercase tracking-wider mt-0.5 transition-colors">Falar com o anfitrião</p>
                            </div>
                        </div>
                         <ArrowUpRight size={20} className="text-[#924032]/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </a>
                </div>
                
              </div>
            </Motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(BookingModal);
