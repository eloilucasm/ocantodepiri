import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Clock, Users, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandSymbol from '../components/BrandSymbol';

const colors = {
  cream: '#f5ece3',
  deepGreen: '#69725d',
  terracotta: '#924032',
};

const Section = ({ title, children, className = "" }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8 }}
    className={`mb-16 md:mb-24 ${className}`}
  >
    {title && (
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3" style={{ color: colors.terracotta }}>
        <span className="w-8 h-[1px] bg-[#924032/40]"></span>
        {title}
      </h3>
    )}
    {children}
  </motion.section>
);

const PackageCard = ({ title, price, description, features, recommended, delay = 0, theme = 'neutral' }) => {
    const themeStyles = {
        neutral: {
            border: 'border-[#69725d]/20',
            bg: 'bg-[#f5ece3]',
            title: '#69725d',
            price: '#924032',
            icon: '#69725d',
            button: 'border border-[#69725d] text-[#69725d] hover:bg-[#69725d] hover:text-[#f5ece3]'
        },
        green: {
            border: 'border-[#69725d]',
            bg: 'bg-[#69725d]/5',
            title: '#69725d',
            price: '#924032',
            icon: '#69725d',
             button: 'border border-[#69725d] bg-[#69725d] text-[#f5ece3] hover:bg-[#5a634e]'
        },
        terracotta: {
            border: 'border-[#924032]',
            bg: 'bg-[#924032]/5',
            title: '#924032',
            price: '#924032',
            icon: '#924032',
            button: 'border border-[#924032] bg-[#924032] text-[#f5ece3] hover:bg-[#7a3529]'
        }
    };

    const currentTheme = themeStyles[theme];

  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className={`relative p-8 md:p-10 border ${currentTheme.border} ${currentTheme.bg} flex flex-col h-full group hover:shadow-2xl transition-all duration-500`}
    >
        {recommended && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#69725d] text-[#f5ece3] text-[10px] font-bold uppercase tracking-widest px-4 py-1 shadow-lg">
                Mais escolhido
            </div>
        )}
        
        <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-2xl font-serif italic" style={{ color: currentTheme.title }}>{title}</h4>
                {/* Visual Indicator of Tier */}
                <div className="flex gap-1 mt-2">
                    <div className={`w-2 h-2 rounded-full ${theme === 'neutral' || theme === 'green' || theme === 'terracotta' ? (theme === 'neutral' ? 'bg-[#69725d]/40' : 'bg-[#69725d]') : 'bg-transparent'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${theme === 'green' || theme === 'terracotta' ? (theme === 'green' ? 'bg-[#69725d]' : 'bg-[#69725d]') : 'bg-[#69725d]/20'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${theme === 'terracotta' ? 'bg-[#924032]' : 'bg-[#69725d]/20'}`}></div>
                </div>
            </div>
            
            <div className="flex items-baseline gap-1" style={{ color: currentTheme.price }}>
                <span className="text-sm opacity-60">R$</span>
                <span className="text-4xl font-light tracking-tight">{price}</span>
            </div>
        </div>

        <p className="text-sm leading-relaxed opacity-80 mb-8 flex-grow" style={{ color: colors.deepGreen }}>
        {description}
        </p>

        <ul className="space-y-4 text-sm opacity-80 mb-8" style={{ color: colors.deepGreen }}>
        {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: currentTheme.icon }} />
                <span>{feature}</span>
            </li>
        ))}
        </ul>
        
        <a 
            href="https://api.whatsapp.com/send/?phone=5562996558022&text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+os+pacotes&type=phone_number&app_absent=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`mt-auto w-full py-4 text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 ${currentTheme.button}`}
        >
            Consultar Disponibilidade
        </a>
    </motion.div>
  );
};
    
const Packages = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: colors.cream, color: colors.deepGreen }}>
            
             {/* Navigation Controls */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-start pointer-events-none">
                <button 
                    onClick={() => navigate('/')}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#924032] text-[#f5ece3] pointer-events-auto hover:scale-110 transition-transform shadow-lg cursor-pointer"
                >
                    <X size={24} />
                </button>
                
                <div 
                    onClick={() => navigate('/')}
                    className="pointer-events-auto cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
                >
                    <BrandSymbol className="h-12 w-auto text-[#924032]" />
                </div>
            </nav>

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#924032] mb-4 block">Casa de Temporada</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] text-[#69725d] mb-8">
                        Estrutura de <span className="italic text-[#924032]">Pacotes</span>
                    </h1>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm uppercase tracking-widest opacity-60"
                >
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>Período: 3 Dias</span>
                    </div>
                    <div className="w-px h-4 bg-[#69725d]/20 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Capacidade: Até 10 Hóspedes</span>
                    </div>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto">
                {/* Intro */}
                <Section className="max-w-3xl mx-auto text-center md:text-lg leading-relaxed opacity-80 mb-32">
                    <p className="mb-6">
                        Cada detalhe da casa de temporada foi pensado para que você se sinta verdadeiramente em casa — do seu jeito. Por isso, oferecemos três formas de viver a experiência, respeitando diferentes ritmos, desejos e níveis de conforto. Você pode escolher a liberdade de cuidar de tudo no seu tempo ou se permitir relaxar ainda mais, contando com apoio no preparo das refeições e na organização do espaço em momentos específicos da sua estadia. Tudo para que sua única preocupação seja aproveitar, descansar e viver Pirenópolis com leveza.
                    </p>
                    <p className="italic text-[#924032]">
                        O pacote escolhido determina o cuidado que acompanha a sua estadia, sem nunca abrir mão da exclusividade e da privacidade de viver a casa como se fosse sua.
                    </p>
                </Section>

                {/* Packages Grid */}
                <Section title="Pacotes Disponíveis">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 relative items-start">
                        <PackageCard 
                            title="Essencial" 
                            price="3.200" 
                            description="Indicado para grupos que preferem autonomia total durante a estadia."
                            features={[
                                "Hospedagem completa da casa para até 10 pessoas",
                                "Sem serviços adicionais",
                                "Privacidade total"
                            ]}
                            theme="neutral"
                            delay={0.1}
                        />
                         <PackageCard 
                            title="Conforto" 
                            price="3.600" 
                            description="Hospedagem + serviço de apoio doméstico no período da manhã."
                            recommended={true}
                            theme="green"
                            features={[
                                "Hospedagem completa",
                                "Preparo do café da manhã",
                                "Organização da cozinha após o café",
                                "Organização dos banheiros",
                                "Retirada dos lixos",
                                "Café servido das 8h30 às 10h",
                                "Serviço Sábado e Domingo"
                            ]}
                            delay={0.2}
                        />
                         <PackageCard 
                            title="Experiência" 
                            price="4.200" 
                            description="Hospedagem + apoio no preparo das refeições e organização ao longo do dia."
                            features={[
                                "Tudo do pacote Conforto",
                                "Preparo do almoço (início 11h30-12h)",
                                "Preparo de petiscos",
                                "Organização constante da cozinha e banheiros",
                                "Permanência da responsável até 15h",
                                "Serviço Sábado e Domingo"
                            ]}
                            theme="terracotta"
                            delay={0.3}
                        />
                    </div>
                </Section>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-32">
                    <Section title="Informações importantes">
                        <ul className="space-y-4 text-base leading-relaxed opacity-80">
                            {[
                                "Os alimentos e bebidas são gentilmente providenciados pelos hóspedes.",
                                "Os valores correspondem exclusivamente ao serviço de apoio contratado.",
                                "O cardápio é alinhado após a confirmação da reserva.",
                                "O serviço oferece suporte no preparo das refeições e na organização básica, não se caracterizando como serviço de chef de cozinha.",
                                "Disponível aos sábados e domingos, conforme o pacote escolhido."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#924032] mt-2 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Recomendações operacionais">
                        <ul className="space-y-4 text-base leading-relaxed opacity-80">
                             {[
                                "O serviço contempla apoio no preparo dos alimentos e na organização essencial dos ambientes utilizados.",
                                "Não inclui compras, reposição de itens ou deslocamentos externos.",
                                "Todos os alimentos e bebidas devem estar disponíveis na casa no início do período contratado.",
                                "Não contempla limpeza pesada, áreas externas ou limpeza final.",
                                "Os horários e o número de preparos seguem o pacote contratado, garantindo fluidez e conforto à experiência."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#69725d] mt-2 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>

                {/* Footer Note */}
                {/* Footer Note */}
                 <Section className="mt-20 pt-12 border-t border-[#69725d]/10 text-center max-w-3xl mx-auto">
                    <p className="font-serif italic text-2xl md:text-3xl text-[#924032] leading-relaxed">
                        "Mais tempo de descanso, convivência e conforto durante sua estadia."
                    </p>
                </Section>

            </div>
        </div>
    );
};

export default Packages;
