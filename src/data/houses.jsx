import React from 'react';

export const houses = {
  casa1: {
    id: 'casa1',
    name: 'Casa Sublime',
    modalImage: '/sublime/casasublime.webp',
    hero: {
      image: '/sublime/casasublime.webp',
      subtitle: 'Pirenópolis, Goiás',
      scrollText: 'Deslize para conhecer',
      bookingLink: 'https://www.airbnb.com.br/rooms/51765912?guests=1&adults=1&s=67&unique_share_id=5450d026-b60d-400d-b643-c1540a688a51',
      mapLink: 'https://maps.app.goo.gl/XrEgJbWkhjPDm9Tz5',
      instaLink: 'https://www.instagram.com/ocantodepiri/',
      instaHandle: '@ocantodepiri'
    },
    concept: {
      subtitle: 'O Conceito',
      title: <>Pirenópolis com a liberdade de <br /> <span className="text-[#924032] italic">uma casa e o conforto de um hotel</span>.</>,
      description: `São duas casas pensadas para receber famílias e grupos que valorizam ambientes agradáveis, bem estruturados e uma experiência sem preocupações.

O conceito do Ô Canto de Piri é simples e bem definido: oferecer máximo conforto, praticidade e acolhimento, garantindo uma estadia leve, funcional e verdadeiramente prazerosa para toda a família.`,
      essenceText: `Aqui, o hóspede encontra uma estrutura completa de hotelaria: roupas de cama e banho de qualidade, organização, cuidado nos detalhes e a possibilidade de contratar uma auxiliar durante a estadia, seja para o preparo das refeições ou para apoio na limpeza ao longo do período. Tudo é pensado para que o grupo aproveite o tempo junto, sem a rotina de tarefas domésticas.`,
      image: '/sublime/detalhequarto.webp',
      badge: 'Sinta o aconchego de casa.'
    },
    experiences: [
      { title: 'Suíte Master', desc: 'Conforto absoluto.', img: '/sublime/suite.webp' },
      { title: 'Canto Gourmet', desc: 'Sabor e convívio.', img: '/sublime/cozinha.webp' },
      { title: 'Lazer e Sol', desc: 'Um espaço completo para você.', img: '/sublime/piscina.webp' },
      { title: 'Espaço de Jogos', desc: 'Diversão garantida.', img: '/sublime/jogoselazer.webp' },
      { title: 'Sol e Braza', desc: 'Churrasco e bons momentos.', img: '/sublime/churrasqueira.webp' },
      { title: 'Para toda família', desc: 'Espaço para todos.', img: '/sublime/espaçoamplo.webp' },
    ],
    amenities: {


      "Quarto e lavanderia": ["Cabides", "Roupa de cama", "Blackout nas cortinas", "Varal para secar roupas", "Local para guardar as roupas: cômoda"],
      "Entretenimento": ["TV", "Sistema de som com Bluetooth", "Mesa de bilhar"],
      "Climatização": ["Ar-condicionado portátil", "Ar-condicionado split", "Ventiladores portáteis"],
      "Segurança doméstica": ["Câmeras de segurança na parte externa da propriedade", "Monitoramento 24h (4 câmeras: entrada, rua, garagem e lazer)"],
      "Internet e escritório": ["Wi-Fi"],
      "Cozinha e sala de jantar": ["Cozinha", "Espaço onde os hóspedes podem preparar suas próprias refeições", "Refrigerador", "Microondas", "Louças e talheres", "Tigelas, hashi, pratos, copos, etc.", "Freezer", "Fogão elétrico", "Forno normal de aço inoxidável", "Cafeteira", "Taças de vinho", "Assadeira", "Liquidificador", "Mesa de jantar", "Máquina de pão"],
      "Características da localização": ["Entrada privada", "Entrada por outra rua ou prédio"],
      "Ar livre": ["Pátio ou varanda (Privativa)", "Quintal privado — totalmente cercado", "Móveis externos", "Rede", "Área de jantar externa", "Churrasqueira privativa: a carvão"],
      "Estacionamento e instalações": ["Estacionamento incluído", "Estacionamento gratuito na rua", "Piscina privativa - disponível o ano todo, aquecida"],
      "Serviços": ["Permitido animais", "Animas de assistência sempre são permitidos", "O anfitrião recebe você"],
      "Não incluso": ["Máquina de Lavar", "Secadora", "Detector de fumaça", "Alarme de monóxido de carbono", "Aquecimento"]
    }
  },
  'casa-jardim': {
    id: 'casa-jardim',
    name: 'Casa Essência',
    modalImage: '/essencia/casaessencia.webp',
    hero: {
      image: '/essencia/casaessencia.webp',
      subtitle: 'Refúgio Natural',
      scrollText: 'Deslize para conhecer',
      bookingLink: 'https://www.airbnb.com.br/rooms/1035663779596246726?guests=1&adults=1&s=67&unique_share_id=4e9fc871-1b21-4ab2-86a4-cfa30557e33c',
      mapLink: 'https://maps.app.goo.gl/dugy7GJ1n8dfnTNQ9',
      instaLink: 'https://www.instagram.com/ocantodepiri2/',
      instaHandle: '@ocantodepiri2'
    },
    concept: {
      subtitle: 'O Conceito',
      title: <>Pirenópolis com a liberdade de <br /> <span className="text-[#924032] italic">uma casa e o conforto de um hotel</span>.</>,
      description: `São duas casas pensadas para receber famílias e grupos que valorizam ambientes agradáveis, bem estruturados e uma experiência sem preocupações.

O conceito do Ô Canto de Piri é simples e bem definido: oferecer máximo conforto, praticidade e acolhimento, garantindo uma estadia leve, funcional e verdadeiramente prazerosa para toda a família.`,
      essenceText: `Aqui, o hóspede encontra uma estrutura completa de hotelaria: roupas de cama e banho de qualidade, organização, cuidado nos detalhes e a possibilidade de contratar uma auxiliar durante a estadia, seja para o preparo das refeições ou para apoio na limpeza ao longo do período. Tudo é pensado para que o grupo aproveite o tempo junto, sem a rotina de tarefas domésticas.`,
      image: '/essencia/detalhequarto.webp',
      badge: 'Leveza e aconchego.'
    },
    experiences: [
      { title: 'Sala de Estar', desc: 'Um lugar, múltiplos espaços.', img: '/essencia/salaessencia.webp' },
      { title: 'Detalhes que Encantam', desc: 'Aconchego em cada canto.', img: '/essencia/suitedetalhe.webp' },
      { title: 'Espaço Gourmet', desc: 'Perfeito para celebrar.', img: '/essencia/gourmet.webp' },
      { title: 'Piscina', desc: 'Lazer privativo o ano todo.', img: '/essencia/piscina.webp' },
      { title: 'Churrasqueira', desc: 'Momentos de sabor e alegria.', img: '/essencia/churrasqueira.webp' },
      { title: 'Suítes Acolhedoras', desc: 'Descanso absoluto.', img: '/essencia/suite.webp' },
      { title: 'Quarto Família', desc: 'Espaço para todos.', img: '/essencia/quartofamilia.webp' },
      { title: 'Lazer e Jogos', desc: 'Diversão para todas as idades.', img: '/essencia/jogoselazer.webp' },
    ],
    amenities: {


      "Quarto e lavanderia": ["Cabides", "Roupa de cama", "Cobertores e travesseiros extras", "Blackout nas cortinas", "Ferro de passar", "Varal para secar roupas", "Local para guardar as roupas: guarda-roupa e cômoda"],
      "Entretenimento": ["TV", "Mesa de bilhar"],
      "Climatização": ["Ar-condicionado central"],
      "Segurança doméstica": ["Extintor de incêndio"],
      "Internet e escritório": ["Wi-Fi"],
      "Cozinha e sala de jantar": ["Cozinha", "Espaço onde os hóspedes podem preparar suas próprias refeições", "Refrigerador", "Microondas", "Louças e talheres", "Tigelas, hashi, pratos, copos, etc.", "Freezer", "Fogão a gás", "Forno normal Suggar", "Cafeteira: cafeteira com coador", "Taças de vinho", "Assadeira", "Liquidificador", "Mesa de jantar"],
      "Ar livre": ["Pátio ou varanda (Privativa)", "Quintal privado — totalmente cercado", "Móveis externos", "Rede", "Área de jantar externa", "Churrasqueira", "Cadeira espreguiçadeira"],
      "Estacionamento e instalações": ["Estacionamento incluído", "Estacionamento gratuito na rua", "Piscina privativa - aquecida"],
      "Serviços": ["Permitido animais", "Animas de assistência sempre são permitidos", "Permitido fumar", "Estadias de longa duração são permitidas (28 dias ou mais)", "O anfitrião recebe você"],
      "Não incluso": ["Máquina de Lavar", "Secadora", "Detector de fumaça", "Alarme de monóxido de carbono", "Aquecimento"]
    }
  }
};
