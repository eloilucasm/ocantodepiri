import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Star, Quote, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { testimonials } from '../data/testimonials';
import BrandSymbol from '../components/BrandSymbol';
import Magnetic from '../components/Magnetic';
import HouseSwitcher from '../components/HouseSwitcher';

const Testimonials = ({ onMenuOpen }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f5ece3] selection:bg-[#924032] selection:text-white pb-24 overflow-x-hidden">
            {/* Navigation Overlay */}
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

            {/* Header Section */}
            <div className="max-w-7xl mx-auto pt-40 mb-24 text-center px-6">
                <Motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[#924032] font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4"
                >
                    Experiências Reais
                </Motion.p>
                
                <Motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-7xl font-serif italic mb-8"
                >
                    O que dizem os <br /> <span className="text-[#924032]">nossos hóspedes</span>.
                </Motion.h1>
                
                <Motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="w-24 h-[1px] bg-[#924032] mx-auto"
                />
            </div>

            {/* Testimonials Mosaic Layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-24">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonials.map((item, index) => (
                        <Motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-white/40 backdrop-blur-sm border border-white/50 p-10 rounded-sm relative group hover:bg-white/60 transition-all duration-500 shadow-sm break-inside-avoid"
                        >
                            <Quote className="absolute top-6 right-6 text-[#924032]/10 w-12 h-12 group-hover:text-[#924032]/20 transition-colors duration-500" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="#924032" className="text-[#924032]" />
                                ))}
                            </div>

                            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-[#69725d] mb-10">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-[#924032]/10 pt-8">
                                <div className="w-12 h-12 rounded-full bg-[#924032]/5 border border-[#924032]/10 flex items-center justify-center overflow-hidden">
                                    {item.avatar ? (
                                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover opacity-80" onError={(e) => e.target.style.display = 'none'} />
                                    ) : (
                                        <span className="text-[#924032] font-serif italic text-xl">{item.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#924032]">{item.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] opacity-40 uppercase tracking-widest">{item.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#924032]/20" />
                                        <span className="text-[10px] text-[#924032]/60 uppercase tracking-widest font-bold">{item.house}</span>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Symbol - Space only */}
            <div className="mt-32 h-1 px-1" />
        </div>
    );
};

export default Testimonials;
