import React, { useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Mountain, 
  Droplets, 
  Bed, 
  Tv, 
  Wind, 
  Shield, 
  Wifi, 
  Utensils, 
  Trees, 
  Car, 
  HeartHandshake, 
  MapPin, 
  MinusCircle,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHouse } from '../context/HouseContext';
import Magnetic from '../components/Magnetic';
import BrandSymbol from '../components/BrandSymbol';
import HouseSwitcher from '../components/HouseSwitcher';

const categoryIcons = {
  "Vistas panorâmicas": <Mountain size={20} />,
  "Banheiro": <Droplets size={20} />,
  "Quarto e lavanderia": <Bed size={20} />,
  "Entretenimento": <Tv size={20} />,
  "Climatização": <Wind size={20} />,
  "Segurança doméstica": <Shield size={20} />,
  "Internet e escritório": <Wifi size={20} />,
  "Cozinha e sala de jantar": <Utensils size={20} />,
  "Ar livre": <Trees size={20} />,
  "Estacionamento e instalações": <Car size={20} />,
  "Serviços": <HeartHandshake size={20} />,
  "Características da localização": <MapPin size={20} />,
  "Não incluso": <MinusCircle size={20} />
};

const AmenitySection = ({ title, items, index }) => (
  <Motion.div  
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    viewport={{ once: true }}
    className={`p-8 rounded-sm border border-[#924032]/10 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-500 ${title === "Não incluso" ? "opacity-60 grayscale-[0.5]" : ""}`}
  >
    <div className="flex items-center gap-4 mb-6 text-[#924032]">
      <div className="p-3 rounded-full bg-[#924032]/5">
        {categoryIcons[title] || <BrandSymbol className="h-5 w-auto" />}
      </div>
      <h3 className="text-xl font-serif italic">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#69725d]/80 leading-relaxed font-light">
          <span className="w-1 h-1 rounded-full bg-[#924032] mt-2 flex-shrink-0 opacity-40"></span>
          {item}
        </li>
      ))}
    </ul>
  </Motion.div>
);

const Amenities = () => {
  const navigate = useNavigate();
  const { currentHouse } = useHouse();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f5ece3] min-h-dvh selection:bg-[#924032] selection:text-white pb-32 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <Magnetic>
          <button 
            onClick={() => navigate('/')}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-[#924032]/20 text-[#69725d] hover:bg-[#69725d] hover:text-white transition-all duration-300 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
        </Magnetic>

        <div className="pointer-events-auto scale-90 md:scale-100">
            <HouseSwitcher />
        </div>

        <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-auto mix-blend-difference"
        >
            <BrandSymbol className="h-10 w-auto" />
        </Motion.div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 px-6 md:px-24">
        <Motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="max-w-4xl"
        >
          <h4 className="text-[#924032] text-xs font-bold uppercase tracking-[0.5em] mb-4">Comodidades • {currentHouse.name}</h4>
          <h1 className="text-5xl md:text-8xl font-serif text-[#69725d] italic leading-tight">
            O que esse lugar <br /> <span className="text-[#924032]">oferece para você</span>
          </h1>
          <p className="mt-8 text-[#69725d]/70 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Preparamos cada detalhe para que sua única preocupação seja aproveitar o momento. Descubra tudo o que espera por você.
          </p>
        </Motion.div>
      </header>

      {/* Amenities Grid */}
      <main className="px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(currentHouse.amenities || {}).map(([category, items], index) => (
             <AmenitySection key={category} title={category} items={items} index={index} />
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <div className="mt-40 flex flex-col items-center justify-center text-center px-6">
         <p className="text-[#924032] text-xs font-bold uppercase tracking-[0.3em] mb-6">Pronto para viver isso?</p>
         <h2 className="text-4xl md:text-7xl font-serif text-[#69725d] italic mb-12">Sua estadia começa aqui.</h2>
         <Magnetic>
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-[#924032] text-white rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl"
          >
            Reservar agora
          </button>
         </Magnetic>
      </div>

    </div>
  );
};

export default Amenities;
