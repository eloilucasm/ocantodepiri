import React, { useEffect, useMemo, useState } from 'react';
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
  ArrowLeft,
  X,
  Clock,
  Speaker,
  AlertTriangle,
  Users
} from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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

const AmenitySection = React.memo(({ title, items, index }) => (
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
));

const HostingPolicyModal = React.memo(({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('times');

  const tabs = [
    { id: 'times', label: 'Horários', icon: Clock },
    { id: 'occupancy', label: 'Ocupação', icon: Users },
    { id: 'noise', label: 'Silêncio', icon: Speaker },
    { id: 'cleaning', label: 'Limpeza', icon: Droplets },
    { id: 'security', label: 'Segurança', icon: Shield },
  ];

  const content = {
    times: {
      title: '1. Check-in e Check-out',
      items: [
        { label: 'Check-in', value: '15:00 h', sub: 'A partir de' },
        { label: 'Check-out', value: '15:00 h', sub: 'Até as' }
      ],
      desc: 'Saídas após o horário prejudicam a limpeza. Consulte late check-out com antecedência (sujeito a taxa). Perda de chaves/controles implica em cobrança para reposição.'
    },
    occupancy: {
      title: '2. Ocupação e Visitantes',
      rules: [
        'Capacidade máxima de 10 pessoas (incluindo crianças).',
        'Proibida a entrada ou pernoite de visitantes não autorizados.',
        'Estritamente proibido repassar a reserva ou sublocar o imóvel.'
      ]
    },
    noise: {
      title: '3. Festas e Barulho',
      rules: [
        'Festas e eventos são estritamente proibidos.',
        'Horário de silêncio total entre 22:00 e 08:00.',
        'Residencial familiar: evite som alto ou comportamentos incômodos.',
        'Multas da vizinhança serão repassadas integralmente.'
      ],
      note: 'Possuímos som Bluetooth integrado de alta fidelidade. Não é permitido o uso de equipamentos de som externos.'
    },
    cleaning: {
      title: '4. Limpeza e Conservação',
      rules: [
        'Recolha o lixo diariamente e deposite na lixeira externa.',
        'Taxa cobre higienização geral; favor não deixar louça suja na pia.',
        'Acidentes acontecem: avise-nos imediatamente se algo quebrar.',
        'Toalhas brancas não devem ser usadas para sapatos ou maquiagem.'
      ]
    },
    security: {
      title: '5. Segurança e Energia',
      rules: [
        'Tranque todas as janelas e portas ao sair do imóvel.',
        'Desligue ar-condicionado, luzes e ventiladores sempre que sair.',
        'PROIBIDO FUMAR INTERNAMENTE. Use áreas externas e cinzeiros.'
      ]
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          key="hosting-policy-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 overflow-hidden"
        >
          <Motion.div
            key="hosting-policy-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />
          <Motion.div
            key="hosting-policy-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#f5ece3] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[650px] border border-[#924032]/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#924032]/5 text-[#924032] transition-colors z-30"
            >
              <X size={20} />
            </button>

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white/30 backdrop-blur-sm p-4 md:p-8 flex flex-row md:flex-col gap-2 md:gap-3 border-b md:border-b-0 md:border-r border-[#924032]/5 overflow-x-auto md:overflow-x-visible items-center md:items-stretch">
              <header className="hidden md:block mb-8">
                <h4 className="text-[#924032] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Políticas</h4>
                <p className="text-[#69725d] font-serif italic text-lg leading-tight">Regras da<br/>Hospedagem</p>
              </header>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex flex-col md:flex-row items-center gap-1.5 md:gap-3 px-3 py-3 md:px-4 md:py-3 rounded-[1.25rem] md:rounded-2xl transition-all duration-300 flex-shrink-0 md:flex-shrink-1 min-w-[70px] md:min-w-0
                      ${isActive 
                        ? 'bg-[#924032] text-white shadow-lg' 
                        : 'text-[#69725d] hover:bg-[#924032]/5'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-widest whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8 md:p-14 overflow-y-auto relative bg-white/10">
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl"
                >
                  <h3 className="text-[#924032] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 opacity-60">
                    Seção {tabs.findIndex(t => t.id === activeTab) + 1}
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-serif italic text-[#69725d] mb-8">
                    {content[activeTab].title}
                  </h2>

                  {activeTab === 'times' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        {content.times.items.map((item, i) => (
                          <div key={i} className="bg-white/40 p-6 rounded-3xl border border-[#924032]/5 shadow-sm">
                            <p className="text-[9px] uppercase tracking-widest text-[#924032] font-bold mb-1 opacity-50">{item.sub}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[#69725d] font-bold mb-1">{item.label}</p>
                            <p className="text-3xl font-serif italic text-[#924032]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-[#69725d]/80 leading-relaxed font-light italic border-l-2 border-[#924032]/20 pl-6">
                        {content.times.desc}
                      </p>
                    </div>
                  )}

                  {activeTab !== 'times' && (
                    <div className="space-y-6">
                      <ul className="space-y-5">
                        {content[activeTab].rules.map((rule, i) => (
                          <li key={i} className="flex gap-4 text-sm md:text-base text-[#69725d] leading-relaxed">
                            <span className="text-[#924032] font-serif italic text-lg opacity-40 shrink-0">{i + 1}.</span>
                            <span className="font-light">{rule}</span>
                          </li>
                        ))}
                      </ul>
                      {content[activeTab].note && (
                        <div className="mt-10 p-6 bg-[#924032]/5 rounded-3xl border border-[#924032]/10">
                          <div className="flex items-center gap-3 mb-3 text-[#924032]">
                            <Speaker size={18} />
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Aviso Sonoro</p>
                          </div>
                          <p className="text-xs text-[#924032]/80 leading-relaxed italic">
                            {content[activeTab].note}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Motion.div>
              </AnimatePresence>

            </main>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
});

const Amenities = ({ onMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); // hook from react-router-dom
  const { currentHouse } = useHouse();
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.openPolicy) {
      setIsPolicyOpen(true);
      // Clear the state so it doesn't reopen on refresh/back
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const amenitiesList = useMemo(() => {
     return Object.entries(currentHouse.amenities || {});
  }, [currentHouse.amenities]);

  return (
    <div className="bg-[#f5ece3] min-h-dvh selection:bg-[#924032] selection:text-white pb-32 overflow-x-hidden">
      
      {/* Navigation */}
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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {amenitiesList.map(([category, items], index) => (
             <div key={category} className="break-inside-avoid">
               <AmenitySection title={category} items={items} index={index} />
             </div>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <div className="mt-40 flex flex-col items-center justify-center text-center px-6">
         <p className="text-[#924032] text-xs font-bold uppercase tracking-[0.3em] mb-6">Pronto para viver isso?</p>
         <h2 className="text-4xl md:text-7xl font-serif text-[#69725d] italic mb-12">Sua estadia começa aqui.</h2>
         <div className="flex flex-col md:flex-row gap-6 items-center">
            <Magnetic>
              <button 
                onClick={() => navigate('/')}
                className="px-10 py-5 bg-[#924032] text-white rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl"
              >
                Reservar agora
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => setIsPolicyOpen(true)}
                className="px-8 py-4 border border-[#924032]/20 text-[#924032] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#924032]/5 transition-all"
              >
                Política de hospedagem
              </button>
            </Magnetic>
         </div>
      </div>

      <HostingPolicyModal 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
      />

    </div>
  );
};

export default React.memo(Amenities);
