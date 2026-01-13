import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../context/HouseContext';
import Magnetic from '../components/Magnetic';
import BrandSymbol from '../components/BrandSymbol';
import HouseSwitcher from '../components/HouseSwitcher';

const Gallery = ({ onMenuOpen }) => {
  const navigate = useNavigate();
  const { currentHouse } = useHouse();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = currentHouse.gallery || [];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="bg-[#f5ece3] min-h-dvh selection:bg-[#924032] selection:text-white pb-32 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 grid grid-cols-3 items-center pointer-events-none">
        <div className="flex justify-start">
          <Magnetic>
            <button 
              onClick={() => navigate('/')}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-[#924032]/20 text-[#69725d] hover:bg-[#69725d] hover:text-white transition-all duration-300 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
          </Magnetic>
        </div>

        <div className="flex justify-center">
          <div className="pointer-events-auto scale-90 md:scale-100">
              <HouseSwitcher />
          </div>
        </div>

        <div className="flex justify-end">
          <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-auto cursor-pointer mix-blend-difference"
              onClick={onMenuOpen}
          >
              <BrandSymbol className="h-10 w-auto" />
          </Motion.div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 px-6 md:px-24">
        <Motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="max-w-4xl"
        >
          <h4 className="text-[#924032] text-xs font-bold uppercase tracking-[0.5em] mb-4">Galeria • {currentHouse.name}</h4>
          <h1 className="text-5xl md:text-8xl font-serif text-[#69725d] italic leading-tight">
            Cada detalhe, <br /> <span className="text-[#924032]">uma experiência</span>.
          </h1>
          <p className="mt-8 text-[#69725d]/70 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Explore os ambientes que preparamos para o seu descanso. Espaços pensados para acolher e encantar.
          </p>
        </Motion.div>
      </header>

      {/* Gallery Grid */}
      <main className="px-6 md:px-24">
        {galleryImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {galleryImages.map((img, index) => (
              <Motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group cursor-zoom-in overflow-hidden rounded-sm break-inside-avoid"
                onClick={() => handleImageClick(index)}
              >
                 <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </Motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p>Nenhuma imagem disponível no momento.</p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
            <Motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <button 
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                    onClick={handleClose}
                >
                    <X size={32} />
                </button>

                <button 
                  className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-2 hidden md:block"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={48} />
                </button>

                <button 
                  className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-2 hidden md:block"
                  onClick={handleNext}
                >
                   <ChevronRight size={48} />
                </button>

                <Motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()} 
                />
                
                <div className="absolute bottom-6 left-0 w-full text-center text-white/70 text-sm tracking-widest uppercase">
                    {selectedImage + 1} / {galleryImages.length}
                </div>
            </Motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <div className="mt-40 flex flex-col items-center justify-center text-center px-6">
         <p className="text-[#924032] text-xs font-bold uppercase tracking-[0.3em] mb-6">Gostou do que viu?</p>
         <h2 className="text-4xl md:text-7xl font-serif text-[#69725d] italic mb-12">Venha conhecer pessoalmente.</h2>
         <Magnetic>
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-[#924032] text-white rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl"
          >
            Reservar agora
          </button>
         </Magnetic>
      </div>

    </div>
  );
};

export default Gallery;
