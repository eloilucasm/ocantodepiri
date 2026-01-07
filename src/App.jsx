import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { X, Instagram, Phone, MapPin } from 'lucide-react';
import Lenis from 'lenis';

// Components
// import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Concept from './components/Concept';
import BrandSymbol from './components/BrandSymbol';
import AudioPlayer from './components/AudioPlayer';
import Magnetic from './components/Magnetic';
import { HouseProvider, useHouse } from './context/HouseContext';
import HouseSwitcher from './components/HouseSwitcher';
import { Suspense } from 'react';

// Lazy Load Heavy Components to reduce initial bundle
const BookingModal = React.lazy(() => import('./components/BookingModal'));
const Experiences = React.lazy(() => import('./components/Experiences'));
const Pirenopolis = React.lazy(() => import('./pages/Pirenopolis'));
const Amenities = React.lazy(() => import('./pages/Amenities'));
const Packages = React.lazy(() => import('./pages/Packages'));

const colors = {
  cream: '#f5ece3',
  deepGreen: '#69725d',
  terracotta: '#924032',
};

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';

// Layout and Global Logic
const Layout = () => {
    const { currentHouse } = useHouse();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(0);

    // Optimized Scroll Listener using Framer Motion to prevent Forced Reflows
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const handleCloseBooking = useCallback(() => setIsBookingOpen(false), []);

    const handleNavigation = useCallback((target) => {
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
          } else if (target === 'amenidades') {
              navigate('/amenidades');
          }
      }, [location.pathname, navigate]);

    const menuItems = useMemo(() => [
        { label: 'A Casa', img: '/cozinha.webp', action: () => handleNavigation('gallery') }, 
        { label: 'Pacotes', img: '/sublime/cozinha.webp', action: () => { setIsMenuOpen(false); navigate('/pacotes'); } },
        { label: 'Amenidades', img: '/piscina2.webp', action: () => handleNavigation('amenidades') }, 
        { label: 'Pirenópolis', img: '/hero.webp', action: () => handleNavigation('pirenopolis') }, 
        { label: 'Reservar', img: '/suitemaster.webp', action: () => { setIsMenuOpen(false); setTimeout(() => setIsBookingOpen(true), 800); } }
    ], [handleNavigation, navigate]);

    // Auto-rotate images when menu is open
    useEffect(() => {
        let interval;
        if (isMenuOpen) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % menuItems.length);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isMenuOpen, menuItems]);

    // Scroll to Top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

      useEffect(() => {
        if (loading) return;
        
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
          lerp: 0.1, // Smooth out interpolation
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false, // Mobile native scroll is often smoother for touch
        });
    
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
      }, [loading]);

      return (
        <div className="min-h-dvh font-sans selection:bg-[#924032] selection:text-white overflow-x-hidden" style={{ backgroundColor: colors.cream, color: colors.deepGreen }}>
            
            {/* Components */}
            <Preloader onComplete={() => setLoading(false)} />
            {/* <NoiseOverlay /> */}
            <AudioPlayer />
            <Suspense fallback={null}>
                <AnimatePresence>
                    {isBookingOpen && (
                        <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
                    )}
                </AnimatePresence>
            </Suspense>

                {/* Navegação - Only show on Home */}
                {location.pathname === '/' && (
                <nav className={`fixed w-full z-50 transition-all duration-700 px-4 py-4 md:px-12 flex justify-between items-center gap-2 md:gap-4 ${scrolled ? 'bg-[#f5ece3]/95 py-3 shadow-sm' : 'bg-transparent'}`}>
                    
                    {/* Logo - min-w-0 to prevent flex squash */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-2 group cursor-pointer flex-shrink-0 min-w-0"
                        data-cursor="hover"
                        onClick={() => navigate('/')}
                    >
                        <BrandSymbol className="h-8 md:h-12 w-auto" />
                    </motion.div>

                    {/* House Switcher - Centered */}
                    <div className="flex justify-center order-2 md:order-none scale-90 md:scale-100">
                        <HouseSwitcher />
                    </div>
                    
                    {/* Menu Button */}
                    <div className="order-3">
                        <Magnetic>
                            <motion.button 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                onClick={() => setIsMenuOpen(true)}
                                className="flex flex-col items-end group gap-1 outline-none p-2 md:p-4"
                                data-cursor="hover"
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Menu</span>
                                <div className="w-6 md:w-8 h-[2px] bg-[#924032] transition-all duration-300 group-hover:w-12"></div>
                                <div className="hidden md:block w-5 h-[2px] bg-[#924032] transition-all duration-300 group-hover:w-8"></div>
                            </motion.button>
                        </Magnetic>
                    </div>
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
                        <div className="flex-1 p-6 lg:p-12 flex flex-col justify-between text-[#f5ece3]" style={{ backgroundColor: colors.terracotta }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                            <BrandSymbol className="h-10 w-auto" />
                            </div>
                            <Magnetic>
                            <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center border border-[#f5ece3]/20 rounded-full hover:bg-[#f5ece3]/10 transition-colors group" data-cursor="hover">
                            <X size={24} className="transition-transform duration-500 group-hover:rotate-90" />
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
                                className="text-4xl md:text-8xl font-serif italic cursor-pointer hover:translate-x-6 hover:text-[#bebe53] transition-all duration-500 w-fit"
                                data-cursor="hover"
                                onClick={item.action}
                                >
                                {item.label}
                                </motion.h2>
                            </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 text-xs uppercase tracking-widest border-t border-white/20 pt-8">
                            <a href={currentHouse.hero.instaLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" data-cursor="hover">Instagram</a>
                            <a href="https://api.whatsapp.com/send/?phone=5562996558022&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" data-cursor="hover">WhatsApp</a>
                            <a href={currentHouse.hero.mapLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" data-cursor="hover">Localização</a>
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
                                <Hero showAnimations={!loading} />
                                <Concept />
                                <Suspense fallback={<div className="h-96" />}>
               <Experiences />
            </Suspense>
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
                                        className="text-4xl md:text-[8rem] font-serif leading-[1.1] md:leading-[0.9] tracking-tighter" style={{ color: colors.deepGreen }}
                                        >
                                            Reserve seu <br /> <span className="text-[#924032] italic">canto de paz</span>.
                                        </motion.h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 pt-10 px-4">
                                        <Link 
                                            to="/pacotes"
                                            className="w-full md:w-[260px] px-6 py-6 bg-[#924032] text-white rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#69725d] transition-all duration-500 hover:scale-105 text-center whitespace-nowrap"
                                            data-cursor="hover"
                                        >
                                        Conhecer Pacotes
                                        </Link>
                                        <Link 
                                            to="/pirenopolis"
                                            className="w-full md:w-[260px] px-6 py-6 bg-[#69725d] text-[#f5ece3] rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#924032] transition-all duration-500 hover:scale-105 text-center whitespace-nowrap"
                                            data-cursor="hover"
                                        >
                                        Conheça Piri
                                        </Link>
                                        <a 
                                            href="https://api.whatsapp.com/send/?phone=5562996558022&text&type=phone_number&app_absent=0" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-full md:w-[260px] px-6 py-6 border border-[#924032] text-[#924032] rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#924032] hover:text-white transition-all duration-500 text-center whitespace-nowrap" 
                                            data-cursor="hover"
                                        >
                                        Falar no WhatsApp
                                        </a>
                                    </div>
                                    </div>
                                </section>
                            </>
                        } />
                        <Route path="/pirenopolis" element={
            <Suspense fallback={null}>
              <Pirenopolis />
            </Suspense>
          } />
          <Route path="/amenidades" element={
            <Suspense fallback={null}>
              <Amenities />
            </Suspense>
          } />
          <Route path="/pacotes" element={
            <Suspense fallback={null}>
              <Packages />
            </Suspense>
          } />
                    </Routes>
                    </React.Suspense>
                </div>

                {/* Rodapé - Fixed & Revealed */}
                <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
                    <footer className="py-12 md:py-20 px-6 lg:px-24 border-t border-[#924032]/10" style={{ backgroundColor: colors.cream }}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
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
                            <div className="space-y-6 text-sm font-bold tracking-tight">
                            <a href="https://api.whatsapp.com/send/?phone=5562996558022&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#924032] cursor-pointer group transition-colors" data-cursor="hover">
                                <div className="w-10 h-10 rounded-full border border-[#924032]/20 flex items-center justify-center text-[#924032] group-hover:bg-[#924032] group-hover:text-white transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform">(62) 99655-8022</span>
                            </a>
                            
                            <a href={currentHouse.hero.instaLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#924032] cursor-pointer group transition-colors" data-cursor="hover">
                                <div className="w-10 h-10 rounded-full border border-[#924032]/20 flex items-center justify-center text-[#924032] group-hover:bg-[#924032] group-hover:text-white transition-colors">
                                    <Instagram size={18} />
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform">{currentHouse.hero.instaHandle}</span>
                            </a>

                             <a href={currentHouse.hero.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#924032] cursor-pointer group transition-colors" data-cursor="hover">
                                <div className="w-10 h-10 rounded-full border border-[#924032]/20 flex items-center justify-center text-[#924032] group-hover:bg-[#924032] group-hover:text-white transition-colors flex-shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform leading-relaxed">R. Cedro Santa Luzia,<br/> Pirenópolis GO</span>
                            </a>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-between md:justify-start items-start md:items-end text-left md:text-right h-full py-2 md:gap-1">
                            <div className="mt-0">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#924032] opacity-60">© 2025 Ô Canto de Piri</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#924032] opacity-60">Desenvolvido pela ACADI e <a href="https://atmosfera.vc/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity underline decoration-[#924032]/20 underline-offset-4">Atmosfera</a></p>
                            </div>
                        </div>
                        </div>

                    </footer>
                </div>
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
