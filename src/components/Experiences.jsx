
import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

const ExperienceCard = ({ item }) => {
    return (
        <motion.div 
            className="min-w-[80vw] md:min-w-[500px] snap-center group relative block"
            whileHover="hover"
        >
            <div className="aspect-[3/4] overflow-hidden mb-6 rounded-sm relative bg-black/20">
                {/* Image */}
                <motion.img 
                    src={item.img} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover md:grayscale grayscale-0 transition-all duration-700 pointer-events-none"
                    variants={{
                        hover: { scale: 1.05, filter: "grayscale(0%)" }
                    }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <h4 className="text-3xl font-serif italic mb-2 text-[#f5ece3]">{item.title}</h4>
            <p className="text-sm uppercase tracking-widest opacity-60 text-[#f5ece3]">{item.desc}</p>
        </motion.div>
    );
};

const Experiences = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { currentHouse } = useHouse();

  const items = currentHouse.experiences;

  // Duplicate items for loop
  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    if(carousel.current) {
        // Calculate single set width (total width / 3)
        const totalWidth = carousel.current.scrollWidth;
        const singleSetWidth = totalWidth / 3;
        setWidth(singleSetWidth);
    }
  }, []);

  // Auto-scroll animation
  useAnimationFrame((_, delta) => {
    if (!isHovered && width > 0) {
        const moveBy = delta * -0.05; // Adjust speed here
        let newX = x.get() + moveBy;
        
        // Seamless Loop Logic: If we pass the second set, jump back to first
        if (newX <= -width * 2) {
             newX = -width;
        }
        // If we drag too far right, jump to middle
        if (newX > 0) {
            newX = -width; 
        }

        x.set(newX);
    }
  });

  // Handle Drag Loop
  useMotionValueEvent(x, "change", (latest) => {
      if (width > 0) {
           if (latest <= -width * 2) {
               x.set(latest + width);
           } else if (latest > -10) { // Buffer for right drag
               x.set(latest - width);
           }
      }
  });

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
            className="cursor-grab active:cursor-grabbing overflow-hidden px-6 lg:px-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <motion.div 
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -100000, right: 100000 }} // Effectively infinite
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => setIsHovered(false)}
                className="flex gap-10"
            >
        {duplicatedItems.map((item, idx) => (
            <ExperienceCard key={idx} item={item} />
        ))}
            </motion.div>
        </motion.div>
    </section>
  );
};

export default Experiences;
