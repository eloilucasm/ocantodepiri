import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Magnetic from '../components/Magnetic';
import BrandSymbol from '../components/BrandSymbol';



const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-20">
    <h3 className="text-[#924032] text-xs font-bold uppercase tracking-[0.3em] mb-4">{subtitle}</h3>
    <h2 className="text-4xl md:text-6xl font-serif text-[#69725d] italic">{title}</h2>
  </div>
);

const ImageCard = ({ img, title, category }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="overflow-hidden rounded-sm mb-4 relative aspect-[4/5]">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10" />
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7 }}
        src={img} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-[#924032] text-[10px] uppercase tracking-widest mb-1">{category}</p>
    <h4 className="text-[#69725d] text-lg md:text-2xl font-serif">{title}</h4>
  </motion.div>
);

const Pirenopolis = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#f5ece3] min-h-dvh selection:bg-[#924032] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <Magnetic>
          <button 
            onClick={() => navigate('/')}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-[#924032] text-[#69725d] hover:bg-[#69725d] hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </button>
        </Magnetic>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-auto mix-blend-difference"
        >
            <BrandSymbol className="h-10 w-auto" />
        </motion.div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/piri/igrejamatriz.webp" 
            alt="Pirenópolis Igreja Matriz" 
            fetchpriority="high"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#f5ece3]" />
        </motion.div>
        
        <div className="relative z-10 text-center text-white p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.5em] mb-6 drop-shadow-md">Goiás • Brasil</p>
            <h1 className="text-6xl md:text-9xl font-serif italic mb-6 drop-shadow-lg">Pirenópolis</h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
              Onde o tempo caminha devagar entre pedras, montanhas e histórias seculares.
            </p>
          </motion.div>
        </div>
      </header>

      {/* History Section */}
      <section className="px-6 lg:px-24 py-24 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <SectionHeader subtitle="Nossa História" title="Herança Colonial" />
          <div className="space-y-6 text-[#69725d]/80 text-lg leading-relaxed font-light">
            <p>
              Fundada em 1727, Pirenópolis nasceu do ciclo do ouro, mas floresceu através da cultura e da fé. Suas ruas de pedra irregular, iluminadas por lampiões amarelados, contam segredos de quase três séculos.
            </p>
            <p>
              Tombada como Patrimônio Histórico Nacional, a cidade preserva uma arquitetura única, onde casarões coloniais convivem em harmonia com a natureza exuberante do Cerrado. É um refúgio para quem busca reconexão.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <img src="/piri/centrohistorico.webp" alt="Centro Histórico" className="w-full h-[200px] md:h-[300px] object-cover rounded-sm shadow-lg" />
              <p className="text-[10px] md:text-sm uppercase tracking-widest opacity-60">Centro Histórico</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:mt-24"
            >
              <img src="/piri/cine-pireneus.webp" alt="Cine Pireneus" className="w-full h-[200px] md:h-[300px] object-cover rounded-sm shadow-lg" />
              <p className="text-[10px] md:text-sm uppercase tracking-widest opacity-60">Cine Pireneus</p>
            </motion.div>
        </div>
      </section>

      {/* Waterfalls Grid */}
      <section className="px-6 lg:px-24 mb-32">
        <SectionHeader subtitle="Natureza & Alma" title="Tesouros Naturais" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
          <ImageCard 
            img="/piri/cachoeiradoabade.webp" 
            title="Cachoeira do Abade" 
            category="Aventura • Trilha"
          />
          <ImageCard 
            img="/piri/cachoeiradasararas.webp" 
            title="Cachoeira das Araras" 
            category="Família • Relax"
          />
           <ImageCard 
            img="/piri/cachoeiradocoqueiro.webp" 
            title="Cachoeira do Coqueiro" 
            category="Paisagem • Fotografia"
          />
        </div>
      </section>

      {/* Gastronomy & Culture */}
      <section className="bg-[#69725d] text-[#f5ece3] py-32 px-6 lg:px-24 rounded-t-[3rem] mx-0">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
               <h3 className="text-[#bebe53] text-xs font-bold uppercase tracking-[0.3em] mb-4">Viver & Saborear</h3>
               <h2 className="text-4xl md:text-6xl font-serif italic mb-8">Gastronomia e Cultura</h2>
               <p className="opacity-80 text-lg leading-relaxed mb-8">
                 Da tradicional pamonha goiana aos jantares contemporâneos na Rua do Lazer, Piri é um prato cheio. Explore restaurantes, vinícolas locais e fazendas que servem sabores e histórias inesquecíveis.
               </p>
               <Magnetic strength={0.2}>
                <button className="px-8 py-4 border border-[#f5ece3]/30 rounded-full hover:bg-[#f5ece3] hover:text-[#69725d] transition-all uppercase text-xs tracking-widest font-bold">
                  Ver Guia Gastronômico
                </button>
               </Magnetic>
            </div>
            <div className="space-y-8">
               <div className="flex items-center gap-6 group cursor-pointer min-w-0">
                  <img src="/piri/restaurantes.webp" className="w-32 h-20 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-xl font-serif">Rua do Lazer</h4>
                    <p className="opacity-50 text-sm">O coração noturno da cidade.</p>
                  </div>
               </div>
               <div className="w-full h-[1px] bg-[#f5ece3]/10" />
               <div className="flex items-center gap-6 group cursor-pointer min-w-0">
                  <img src="/piri/vinicolaassuncao.webp" className="w-32 h-20 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-xl font-serif">Vinícola Assunção</h4>
                    <p className="opacity-50 text-sm">Vinhos finos no cerrado.</p>
                  </div>
               </div>
                <div className="w-full h-[1px] bg-[#f5ece3]/10" />
               <div className="flex items-center gap-6 group cursor-pointer min-w-0">
                  <img src="/piri/fazendababilonia.webp" className="w-32 h-20 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-xl font-serif">Fazenda Babilônia</h4>
                    <p className="opacity-50 text-sm">Resgate histórico e culinário.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <div className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
         <p className="text-[#924032] text-xs font-bold uppercase tracking-[0.3em] mb-6">Sua estadia começa aqui</p>
         <h2 className="text-4xl md:text-7xl font-serif text-[#69725d] italic mb-12">Venha viver Piri.</h2>
         <Magnetic>
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-[#924032] text-white rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl"
          >
            Garanta sua experiência
          </button>
         </Magnetic>
      </div>

    </div>
  );
};

export default Pirenopolis;
