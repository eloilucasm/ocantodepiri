
import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
  const { currentHouse } = useHouse();
  const items = currentHouse.experiences;

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
            <div className="flex items-center gap-4 text-[#bebe53]">
                 <span className="text-[10px] md:text-xs uppercase tracking-widest">Arraste para explorar</span>
                 <ArrowRight className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            </div>
        </div>

        {/* Motion Carousel Area */}
        <motion.div 
            ref={carousel} 
            className="cursor-grab active:cursor-grabbing overflow-hidden px-6 lg:px-24 w-full"
            whileTap={{ cursor: "grabbing" }}
        >
            <motion.div 
                drag="x"
                dragConstraints={carousel}
                className="flex gap-10 w-max"
            >
                {items.map((item, idx) => (
                    <ExperienceCard key={idx} item={item} />
                ))}
            </motion.div>
        </motion.div>
    </section>
  );
};

export default React.memo(Experiences);
