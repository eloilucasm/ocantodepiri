
import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../context/HouseContext';

const ExperienceCard = React.memo(({ item }) => {
    return (
        <motion.div 
            className="w-[80vw] md:w-[500px] snap-center group relative block flex-shrink-0"
            whileHover="hover"
        >
            <div className="aspect-[3/4] overflow-hidden mb-6 rounded-sm relative bg-black/20">
                {/* Image */}
                <motion.img 
                    src={item.img} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
                    variants={{
                        hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <h4 className="text-3xl font-serif italic mb-2 text-[#f5ece3]">{item.title}</h4>
            <p className="text-sm uppercase tracking-widest opacity-60 text-[#f5ece3]">{item.desc}</p>
        </motion.div>
    );
});

const Experiences = () => {
  const carousel = useRef(null);
  const navigate = useNavigate();
  const { currentHouse, switchHouse } = useHouse();
  const items = currentHouse.experiences;

  const handleGalleryNavigation = (houseId) => {
    switchHouse(houseId);
    navigate('/galeria');
  };

  return (
    <section id="gallery" className="bg-[#69725d] py-32 md:py-48 text-[#f5ece3] overflow-hidden">
        <div className="px-6 lg:px-24 mb-24">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">
                Experiências <br />
                <span className="italic opacity-70">Únicas</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-lg opacity-70 border-l-2 border-[#bebe53] pl-6 mb-8 max-w-md">
                Curamos cada espaço para refletir a história local, misturando o rústico com a elegância moderna.
            </p>
            <div className="flex flex-wrap items-center gap-4">
                 <button 
                  onClick={() => handleGalleryNavigation('casa1')}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-[#bebe53] text-[#f5ece3] hover:text-[#69725d] border border-[#bebe53]/30 rounded-full transition-all duration-300"
                 >
                    <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Veja mais fotos da Casa Sublime</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </button>
                 <button 
                  onClick={() => handleGalleryNavigation('casa-jardim')}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-[#bebe53] text-[#f5ece3] hover:text-[#69725d] border border-[#bebe53]/30 rounded-full transition-all duration-300"
                 >
                    <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Veja mais fotos da Casa Essência</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </button>
            </div>
            </div>
        </div>

        {/* Motion Carousel Area */}
        {/* Mobile: Drag Carousel */}
        <motion.div 
            ref={carousel} 
            className="md:hidden cursor-grab active:cursor-grabbing overflow-hidden px-6 w-full"
            whileTap={{ cursor: "grabbing" }}
        >
            <motion.div 
                drag="x"
                dragConstraints={carousel}
                className="flex gap-6 w-max"
            >
                {items.map((item, idx) => (
                    <ExperienceCard key={idx} item={item} />
                ))}
            </motion.div>
        </motion.div>

        {/* Desktop: Infinite Marquee Carousel */}
        <div className="hidden md:block overflow-hidden w-full relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#69725d] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#69725d] to-transparent z-10" />
            
            <motion.div 
                className="flex gap-10 w-max px-24"
                animate={{ x: "-50%" }}
                transition={{ 
                    ease: "linear", 
                    duration: 50, 
                    repeat: Infinity 
                }}
            >
                {[...items, ...items].map((item, idx) => (
                    <ExperienceCard key={`desktop-${idx}`} item={item} />
                ))}
            </motion.div>
        </div>
    </section>
  );
};

export default React.memo(Experiences);
