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

const ImageCard = ({ img, title, category, link }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="overflow-hidden rounded-sm mb-4 relative aspect-[4/5]">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10" />
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          src={img} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-20">
           <div className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-[#69725d] transition-colors text-[10px] font-bold uppercase tracking-widest items-center gap-2">
            Ver no Mapa <ArrowLeft className="rotate-180 w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="mt-3">
          <p className="text-[#924032] text-[10px] uppercase tracking-widest mb-1">{category}</p>
          <h4 className="text-[#69725d] text-lg md:text-2xl font-serif">{title}</h4>
      </div>
    </a>
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
            src="/piri/centrohistorico.webp" 
            alt="Pirenópolis Centro Histórico" 
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
              className="space-y-4 group cursor-pointer"
            >
              <a href="https://www.google.com/maps/search/?api=1&query=Igreja+Matriz+de+Pirenopolis" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-sm shadow-lg">
                <img src="/piri/igrejamatriz.webp" alt="Igreja Matriz" className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 z-20">
                   <div className="w-[140px] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5ece3] group-hover:bg-white group-hover:text-[#69725d] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    Ver no Mapa <ArrowLeft className="rotate-180 w-3 h-3" />
                  </div>
                </div>
              </a>
              <p className="text-[10px] md:text-sm uppercase tracking-widest opacity-60">Igreja Matriz</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:mt-24 group cursor-pointer"
            >
              <a href="https://www.google.com/maps/search/?api=1&query=Cine+Pireneus+Pirenopolis" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-sm shadow-lg">
                <img src="/piri/cine-pireneus.webp" alt="Cine Pireneus" className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 z-20">
                   <div className="w-[140px] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5ece3] group-hover:bg-white group-hover:text-[#69725d] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    Ver no Mapa <ArrowLeft className="rotate-180 w-3 h-3" />
                  </div>
                </div>
              </a>
              <p className="text-[10px] md:text-sm uppercase tracking-widest opacity-60">Cine Pireneus</p>
            </motion.div>
        </div>
      </section>

      {/* Waterfalls Grid */}
      {/* Waterfalls Grid - Horizontal Carousel */}
      <section className="px-0 lg:px-0 mb-32 pt-24">
        <div className="px-6 lg:px-24">
            <SectionHeader subtitle="Natureza & Alma" title="Tesouros Naturais" />
        </div>
        
        <div className="pl-6 lg:pl-24 overflow-x-auto pb-12 hide-scrollbar flex gap-6 md:gap-8 snap-x snap-mandatory pr-6">
           {[
             {
               title: "Cachoeira do Abade",
               category: "Aventura • Trilha",
               img: "/piri/cachoeiradoabade.webp",
               link: "https://www.google.com/maps/search/?api=1&query=Cachoeira+do+Abade+Pirenopolis"
             },
             {
               title: "Cachoeira das Araras",
               category: "Família • Relax",
               img: "/piri/cachoeiradasararas.webp",
               link: "https://www.google.com/maps/search/?api=1&query=Cachoeira+das+Araras+Pirenopolis"
             },
             {
               title: "Cachoeira do Coqueiro",
               category: "Paisagem • Fotografia",
               img: "/piri/cachoeiradocoqueiro.webp",
               link: "https://www.google.com/maps/search/?api=1&query=Cachoeira+do+Coqueiro+Pirenopolis"
             },
             {
               title: "Cachoeira do Lázaro",
               category: "Trilha • Natureza",
               img: "/piri/cachoeiradolazaro.webp",
               link: "https://www.google.com/maps/search/?api=1&query=Cachoeira+do+Lazaro+Pirenopolis"
             }
           ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative flex-shrink-0 w-[85vw] md:w-[400px] aspect-[4/5] rounded-sm overflow-hidden snap-center group cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                 <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full"> 
                  <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 p-8">
                      <p className="text-[#bebe53] text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                        {item.category} <MapPin size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <h3 className="text-3xl font-serif italic text-white mb-4">{item.title}</h3>
                      <div className="w-[140px] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5ece3] group-hover:bg-white group-hover:text-[#69725d] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        Ver no Mapa <ArrowLeft className="rotate-180 w-3 h-3" />
                      </div>
                  </div>
                 </a>
              </motion.div>
           ))}
        </div>
      </section>

      {/* Gastronomy & Culture - Horizontal Carousel (Best for Mobile) */}
      <section className="bg-[#69725d] text-[#f5ece3] py-24 md:py-32 overflow-hidden rounded-t-[3rem] mx-0">
          <div className="px-6 lg:px-24 mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
             <div className="max-w-xl">
                <h3 className="text-[#bebe53] text-xs font-bold uppercase tracking-[0.3em] mb-4">Viver & Saborear</h3>
                <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Gastronomia</h2>
                <p className="opacity-80 text-lg leading-relaxed mb-8">
                  Sabores que contam histórias. Deslize para explorar os melhores destinos.
                </p>
                <Magnetic strength={0.2}>
                  <button className="hidden md:flex px-8 py-4 border border-[#f5ece3]/30 rounded-full hover:bg-[#f5ece3] hover:text-[#69725d] transition-all uppercase text-xs tracking-widest font-bold">
                    Ver Guia Completo
                  </button>
                </Magnetic>
             </div>

          </div>

          {/* Carousel Container */}
          <div className="pl-6 lg:pl-24 overflow-x-auto pb-12 hide-scrollbar flex gap-6 md:gap-8 snap-x snap-mandatory pr-6">
             {[
                {
                  title: "Rua do Lazer",
                  category: "Restaurantes e Vida Noturna",
                  img: "/piri/restaurantes.webp",
                  link: "https://www.google.com/maps/search/?api=1&query=Rua+do+Lazer+Pirenopolis"
                },
                {
                  title: "Vinícola Assunção",
                  category: "Eno-gastronomia",
                  img: "/piri/vinicolaassuncao.webp",
                  link: "https://www.google.com/maps/search/?api=1&query=Vinicola+Assuncao+Pirenopolis"
                },
                 {
                  title: "Fazenda Babilônia",
                  category: "Histórico",
                  img: "/piri/fazendababilonia.webp",
                  link: "https://www.google.com/maps/search/?api=1&query=Fazenda+Babilonia+Pirenopolis"
                },
                {
                   title: "Piri Lounge",
                   category: "Drinks & Vibe",
                   img: "/piri/pirilounge.webp",
                   link: "https://www.google.com/maps/search/?api=1&query=Piri+Lounge+Pirenopolis"
                }
             ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative flex-shrink-0 w-[85vw] md:w-[400px] aspect-[4/5] rounded-sm overflow-hidden snap-center group cursor-pointer"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                >
                   <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full"> 
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8">
                        <p className="text-[#bebe53] text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                          {item.category} <MapPin size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                        <h3 className="text-3xl font-serif italic text-white mb-4">{item.title}</h3>
                        <div className="w-[140px] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5ece3] group-hover:bg-white group-hover:text-[#69725d] transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          Ver no Mapa <ArrowLeft className="rotate-180 w-3 h-3" />
                        </div>
                    </div>
                   </a>
                </motion.div>
             ))}
          </div>

          <div className="px-6 md:hidden mt-4 text-center">
             <button className="px-8 py-4 w-full border border-[#f5ece3]/30 rounded-full hover:bg-[#f5ece3] hover:text-[#69725d] transition-all uppercase text-xs tracking-widest font-bold">
                Ver Guia Completo
             </button>
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
