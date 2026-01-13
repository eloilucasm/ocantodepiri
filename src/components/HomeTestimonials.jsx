import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { testimonials } from '../data/testimonials';
import Magnetic from './Magnetic';

const HomeTestimonials = () => {
    const navigate = useNavigate();
    
    // Select a few featured testimonials (one for each house + one more)
    const featuredTestimonials = [
        testimonials.find(t => t.id === 14), // Casa Sublime
        testimonials.find(t => t.id === 13), // Casa Essência
        testimonials.find(t => t.id === 16), // Casa Sublime (Best house in Piri)
    ].filter(Boolean);

    return (
        <section className="py-32 md:py-48 px-6 lg:px-24 bg-[#f5ece3] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#924032]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <Motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#924032] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4"
                        >
                            Experiências Reais
                        </Motion.p>
                        <Motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif italic"
                        >
                            O que dizem os <br /> <span className="text-[#924032]">nossos hóspedes</span>.
                        </Motion.h2>
                    </div>

                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Magnetic>
                            <button 
                                onClick={() => navigate('/depoimentos')}
                                className="group flex items-center gap-3 px-8 py-4 border border-[#924032] text-[#924032] rounded-full hover:bg-[#924032] hover:text-white transition-all duration-500 whitespace-nowrap"
                            >
                                <span className="text-xs font-bold uppercase tracking-widest">Ver todos</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </Magnetic>
                    </Motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredTestimonials.map((item, index) => (
                        <Motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-white/40 backdrop-blur-sm border border-[#924032]/10 p-8 md:p-10 rounded-sm relative group hover:bg-white/80 transition-all duration-500 flex flex-col h-full shadow-sm"
                        >
                            <Quote className="absolute top-6 right-6 text-[#924032]/10 w-10 h-10 group-hover:text-[#924032]/20 transition-colors duration-500" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={12} fill="#924032" className="text-[#924032]" />
                                ))}
                            </div>

                            <p className="text-base md:text-lg font-serif italic leading-relaxed text-[#69725d] mb-8 flex-grow">
                                "{item.text.length > 200 ? `${item.text.substring(0, 200)}...` : item.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-[#924032]/5 pt-6 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-[#924032]/5 border border-[#924032]/10 flex items-center justify-center overflow-hidden shrink-0">
                                    <span className="text-[#924032] font-serif italic text-lg">{item.name.charAt(0)}</span>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#924032] truncate">{item.name}</h4>
                                    <p className="text-[9px] text-[#924032]/60 uppercase tracking-widest font-bold mt-0.5">{item.house}</p>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;
