import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
};

const imageContainerVariants = {
    hidden: { opacity: 0, clipPath: "inset(20% 10% 20% 10% round 100px)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } }
};

const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.6, type: "spring", stiffness: 100 } }
};

import { useState } from 'react';
import EssenceModal from './EssenceModal';

const Concept = () => {
  const conceptRef = useRef(null);
  const { currentHouse } = useHouse();
  const { scrollYProgress: conceptY } = useScroll({ target: conceptRef, offset: ["start end", "end start"] });
  const conceptImgY = useTransform(conceptY, [0, 1], ["-10%", "10%"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={conceptRef} className="py-12 md:pb-48 md:pt-24 px-6 lg:px-24 max-w-7xl mx-auto">
        <EssenceModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            text={currentHouse.concept.essenceText}
            houseName={currentHouse.name}
        />

        <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center">
        <div className="space-y-6 md:space-y-8">
            <motion.div 
            key={currentHouse.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={textVariants}
            >
            <p className="text-[#924032] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">{currentHouse.concept.subtitle}</p>
            <h2 className="text-3xl md:text-7xl font-serif leading-[1.1] mb-6 md:mb-8">
                {currentHouse.concept.title}
            </h2>
            <p className="text-base md:text-xl leading-relaxed opacity-80 mb-8 md:mb-10 whitespace-pre-line">
                {currentHouse.concept.description}
            </p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 group text-sm font-bold uppercase tracking-widest outline-none" 
                data-cursor="hover"
            >
                <span className="border-b-2 border-[#924032] pb-1">Nosso jeito de ser</span>
                <div className="bg-[#924032] p-2 rounded-full text-white group-hover:rotate-45 transition-transform duration-500">
                <ArrowDownRight size={16} />
                </div>
            </button>
            </motion.div>
        </div>
        
        <div className="relative">
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={imageContainerVariants}
            className="rounded-t-full overflow-hidden aspect-[2/3] shadow-3xl group relative will-change-[clip-path,opacity]"
            >
            <AnimatePresence mode="wait">
            <motion.img 
                key={currentHouse.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ y: conceptImgY }}
                src={currentHouse.concept.image} 
                className="w-full h-full object-cover absolute inset-0"
                alt="Janela Colonial"
            />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[#924032]/10 mix-blend-multiply" />
            </motion.div>
            
            {/* Badge Flutuante */}
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={badgeVariants}
            className="absolute -bottom-8 -right-8 md:-right-16 bg-white/70 backdrop-blur-md border border-white/50 p-4 md:p-6 shadow-2xl rounded-sm max-w-[200px]"
            >
            <p className="font-serif italic text-xl md:text-2xl leading-tight text-[#924032]">{currentHouse.concept.badge}</p>
            </motion.div>
        </div>
        </div>
    </section>
  );
};


export default React.memo(Concept);
