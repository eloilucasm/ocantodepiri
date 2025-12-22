import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useHouse } from '../context/HouseContext';

const Hero = () => {
  const heroRef = useRef(null);
  const { currentHouse } = useHouse();
  const { scrollYProgress: heroY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroYSpring = useSpring(heroY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroParallax = useTransform(heroYSpring, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroYSpring, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div 
          style={{ y: heroParallax, opacity: heroOpacity }}
          className="absolute inset-0 z-0 bg-[#f5ece3]"
        >
          <AnimatePresence mode="wait">
            <motion.img 
                key={currentHouse.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ 
                    opacity: { duration: 0.8 },
                    scale: { duration: 20, ease: "linear", repeat: Infinity }
                }}
                src={currentHouse.hero.image} 
                fetchpriority="high"
                loading="eager"
                className="w-full h-full object-cover absolute inset-0" 
                alt={currentHouse.name}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5ece3]/10 via-[#f5ece3]/20 to-[#f5ece3]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
        >
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="w-12 h-[1px] bg-[#924032]" />
            
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentHouse.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="uppercase tracking-[0.5em] text-[10px] font-bold text-[#924032]"
              >
                {currentHouse.hero.subtitle}
              </motion.span>
            </AnimatePresence>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="w-12 h-[1px] bg-[#924032]" />
        </motion.div>
        
        <div className="overflow-hidden flex justify-center">
            <motion.img 
            src="/logo.svg"
            alt="Ô Canto de Piri Logo"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-[40vw] md:w-[30vw] max-w-2xl h-auto object-contain drop-shadow-lg"
            />
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16 flex flex-col items-center gap-4"
        >
            <div className="w-1px] h-24 bg-[#924032] origin-top scale-y-100 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.3em] vertical-rl">{currentHouse.hero.scrollText}</span>
        </motion.div>
        </div>
    </section>
  );
};

export default Hero;
