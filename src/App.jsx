import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Phone } from 'lucide-react';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import BookingModal from './components/BookingModal';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Experiences from './components/Experiences';
import BrandSymbol from './components/BrandSymbol';
import AudioPlayer from './components/AudioPlayer';
import Magnetic from './components/Magnetic';
import { HouseProvider } from './context/HouseContext';
import HouseSwitcher from './components/HouseSwitcher';
const Pirenopolis = React.lazy(() => import('./pages/Pirenopolis'));

const colors = {
  cream: '#f5ece3',
  deepGreen: '#69725d',
  terracotta: '#924032',
};

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Layout and Global Logic
const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(0);

    const menuItems = [
        { label: 'A Casa', img: '/cozinha.avif', action: () => handleNavigation('gallery') }, 
        { label: 'Amenidades', img: '/piscina2.avif', action: () => handleNavigation('gallery') }, 
        { label: 'Pirenópolis', img: '/hero.avif', action: () => handleNavigation('pirenopolis') }, 
        { label: 'Reservar', img: '/suitemaster.avif', action: () => { setIsMenuOpen(false); setTimeout(() => setIsBookingOpen(true), 800); } }
    ];

    // Auto-rotate images when menu is open
    useEffect(() => {
        let interval;
        if (isMenuOpen) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % menuItems.length);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isMenuOpen, menuItems.length]);

    // Scroll to Top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

      useEffect(() => {
        if (loading) return;
        
        // Only observe footer if we are on Home (since footer is part of Home content currently, or global?)
        // Let's assume Footer is Global.
        
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setFooterHeight(entry.contentRect.height);
          }
        });
    
        if (footerRef.current) {
          observer.observe(footerRef.current);
        }
    
        return () => observer.disconnect();
      }, [loading, location.pathname]); 

      // Lenis Smooth Scroll
      useEffect(() => {
        if (loading) return;
    
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
        });
    
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
      }, [loading]);
    
      useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const handleNavigation = (target) => {
          setIsMenuOpen(false);
          if (target === 'gallery') {
              if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                      const element = document.getElementById('gallery');
                      element?.scrollIntoView({ behavior: 'smooth' });
                  }, 500); // Wait for nav
              } else {
                  const element = document.getElementById('gallery');
                  element?.scrollIntoView({ behavior: 'smooth' });
              }
          } else if (target === 'pirenopolis') {
              navigate('/pirenopolis');
          }
      };

      return (
        <div className="min-h-screen font-sans selection:bg-[#924032] selection:text-white" style={{ backgroundColor: colors.cream, color: colors.deepGreen }}>
            
            <Preloader onComplete={() => setLoading(false)} />
            <CustomCursor />
            <NoiseOverlay />
            <AudioPlayer />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

            {!loading && (
                <>
                {/* Navegação - Only show on Home */}
                {location.pathname === '/' && (
                <nav className={`fixed w-full z-50 transition-all duration-700 px-6 py-6 lg:px-12 flex justify-between items-center ${scrolled ? 'bg-[#f5ece3]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent'}`}>
                    <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-2 group cursor-pointer"
                    data-cursor="hover"
                    onClick={() => navigate('/')}
                    >
                    <BrandSymbol className="h-12 w-auto" />
                    </motion.div>

                    {/* House Switcher - Centered or near brand */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                        <HouseSwitcher />
                    </div>
                    
                    <Magnetic>
                    <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="flex flex-col items-end group gap-1 outline-none p-4"
                    data-cursor="hover"
                    >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Menu</span>
                    <div className="w-8 h-[2px] bg-[#924032] transition-all duration-300 group-hover:w-12"></div>
                    <div className="w-5 h-[2px] bg-[#924032] transition-all duration-300 group-hover:w-8"></div>
                    </motion.button>
                    </Magnetic>
                </nav>
                )}

                {/* Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                    <motion.div 
                        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] flex flex-col md:flex-row shadow-2xl overflow-hidden"
                    >
                        <div className="flex-1 p-8 md:p-16 flex flex-col justify-between text-[#f5ece3]" style={{ backgroundColor: colors.terracotta }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                            <BrandSymbol className="h-10 w-auto" />
                            </div>
                            <Magnetic>
                            <button onClick={() => setIsMenuOpen(false)} className="group p-4 border border-[#f5ece3]/20 rounded-full hover:bg-[#f5ece3]/10 transition-colors" data-cursor="hover">
                            <X size={32} className="transition-transform duration-500 group-hover:rotate-90" />
                            </button>
                            </Magnetic>
                        </div>
                        
                        <div className="flex flex-col space-y-2 md:space-y-4">
                             {menuItems.map((item, i) => (
                            <div key={item.label} className="overflow-hidden">
                                <motion.h2 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="text-5xl md:text-9xl font-serif italic cursor-pointer hover:translate-x-6 hover:text-white/60 transition-all duration-500 w-fit"
                                data-cursor="hover"
                                onClick={item.action}
                                >
                                {item.label}
                                </motion.h2>
                            </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 text-xs uppercase tracking-widest border-t border-white/20 pt-8">
                            <a href="#" className="hover:opacity-60 transition-opacity" data-cursor="hover">Instagram</a>
                            <a href="#" className="hover:opacity-60 transition-opacity" data-cursor="hover">WhatsApp</a>
                            <a href="#" className="hover:opacity-60 transition-opacity" data-cursor="hover">Localização</a>
                        </div>
                        </div>
                        
                        <div className="hidden md:block w-1/3 relative bg-[#924032] overflow-hidden">
                            <div className="absolute inset-0 bg-[#924032]/40 z-10"></div>
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={currentImageIndex}
                                    src={menuItems[currentImageIndex].img}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Render */}
                <div 
                    className="relative z-10 shadow-2xl" 
                    style={{ backgroundColor: colors.cream, marginBottom: footerHeight }}
                >
                    <React.Suspense fallback={<Preloader onComplete={() => {}} />}>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <Concept />
                                <Experiences />
                                {/* Chamada para Ação */}
                                <section className="py-40 text-center px-6 relative overflow-hidden" style={{ backgroundColor: colors.cream }}>
                                    <motion.div 
                                    style={{ rotate: 15 }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.05 }}
                                    transition={{ duration: 2 }}
                                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                                    >
                                    <BrandSymbol className="w-[80vw] h-auto" />
                                    </motion.div>
                                    
                                    <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                                    <p className="text-xs uppercase tracking-[0.5em] font-bold text-[#924032]">Sua Próxima Estadia</p>
                                    <div className="overflow-hidden">
                                        <motion.h2 
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                        className="text-5xl md:text-[8rem] font-serif leading-[0.9] tracking-tighter" style={{ color: colors.deepGreen }}
                                        >
                                            Reserve seu <br /> <span className="text-[#924032] italic">canto de paz</span>.
                                        </motion.h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
                                        <button 
                                            onClick={() => setIsBookingOpen(true)}
                                            className="px-12 py-6 bg-[#924032] text-white rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#69725d] transition-all duration-500 hover:scale-105"
                                            data-cursor="hover"
                                        >
                                        Consultar Datas
                                        </button>
                                        <button className="px-12 py-6 border border-[#924032] text-[#924032] rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#924032] hover:text-white transition-all duration-500" data-cursor="hover">
                                        Falar no WhatsApp
                                        </button>
                                    </div>
                                    </div>
                                </section>
                            </>
                        } />
                        <Route path="/pirenopolis" element={<Pirenopolis />} />
                    </Routes>
                    </React.Suspense>
                </div>

                {/* Rodapé - Fixed & Revealed */}
                <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
                    <footer className="py-20 px-6 lg:px-24 border-t border-[#924032]/10" style={{ backgroundColor: colors.cream }}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div className="flex items-center gap-2">
                            <BrandSymbol className="h-12 w-auto" />
                            </div>
                            <p className="text-xl md:text-2xl max-w-sm font-serif italic leading-relaxed opacity-80">
                            "Um lugar para se encontrar, relaxar e criar memórias inesquecíveis."
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <h5 className="text-[10px] uppercase tracking-widest font-black opacity-40">Contato</h5>
                            <div className="space-y-4 text-sm font-bold tracking-tight">
                            <p className="hover:text-[#924032] cursor-pointer" data-cursor="hover">(62) 99655-8022</p>
                            <p className="hover:text-[#924032] cursor-pointer" data-cursor="hover">@ocantodepiri</p>
                            <p>R. Cedro Santa Luzia, Pirenópolis GO</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end text-right">
                            <div className="flex gap-6">
                            <Instagram className="hover:text-[#924032] cursor-pointer transition-colors" data-cursor="hover" />
                            <Phone className="hover:text-[#924032] cursor-pointer transition-colors" data-cursor="hover" />
                            </div>
                            <div className="mt-12 md:mt-0">
                            <p className="text-[10px] uppercase tracking-[0.3em] opacity-30">© 2025 Ô Canto de Piri</p>
                            <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mt-1">Desenvolvido com Alma</p>
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
                </>
            )}
        </div>
      );
};

const App = () => {
    return (
        <HouseProvider>
            <Router>
                <Layout />
            </Router>
        </HouseProvider>
    );
};

export default App;
