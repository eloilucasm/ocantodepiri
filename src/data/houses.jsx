import React from 'react';

export const houses = {
  casa1: {
    id: 'casa1',
    name: 'Casa Villa',
    modalImage: '/casavilla.webp',
    hero: {
      image: '/hero.webp',
      subtitle: 'Pirenópolis, Goiás',
      scrollText: 'Deslize para conhecer',
      bookingLink: 'https://www.airbnb.com.br/rooms/51765912?guests=1&adults=1&s=67&unique_share_id=5450d026-b60d-400d-b643-c1540a688a51',
      mapLink: 'https://maps.app.goo.gl/XrEgJbWkhjPDm9Tz5',
      instaLink: 'https://www.instagram.com/ocantodepiri/',
      instaHandle: '@ocantodepiri'
    },
    concept: {
      subtitle: 'O Conceito',
      title: <>Vínculos que <br /> <span className="text-[#924032] italic">duram para sempre</span>.</>,
      description: 'Inspirada pela energia positiva e boas vibrações de Pirenópolis, nossa casa foi projetada para ser um refúgio de leveza. Um lugar onde cada detalhe é um convite para o bem-estar.',
      image: '/quarto.webp',
      badge: 'Sinta o aconchego de casa.'
    },
    experiences: [
      { title: 'Suíte Master', desc: 'Conforto absoluto e luz natural.', img: '/suitemaster.webp' },
      { title: 'Canto Gourmet', desc: 'Sabor e convívio ao ar livre.', img: '/gourmet.webp' },
      { title: 'Lazer e Sol', desc: 'Piscina aquecida em meio ao jardim.', img: '/piscina.webp' },
      { title: 'Espaço de Jogos', desc: 'Diversão garantida.', img: '/jogos.webp' },
      { title: 'Sol e Braza', desc: 'Churrasco e bons momentos.', img: '/churrasqueira.webp' },
      { title: 'Piscina', desc: 'Refrescância e lazer.', img: '/piscina2.webp' },
      { title: 'Para toda família', desc: 'Espaço para todos.', img: '/familia.webp' },
    ],
    amenities: {
      "Vistas panorâmicas": ["Vista para as montanhas"],
      "Banheiro": ["Água quente"],
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
    name: 'Casa Jardim',
    modalImage: '/casajardim.webp',
    hero: {
      image: '/piscina2.webp', // Back to original placeholder
      subtitle: 'Refúgio Natural',
      scrollText: 'Deslize para conhecer',
      bookingLink: 'https://www.airbnb.com.br/rooms/1035663779596246726?guests=1&adults=1&s=67&unique_share_id=4e9fc871-1b21-4ab2-86a4-cfa30557e33c',
      mapLink: 'https://maps.app.goo.gl/dugy7GJ1n8dfnTNQ9',
      instaLink: 'https://www.instagram.com/ocantodepiri2/',
      instaHandle: '@ocantodepiri2'
    },
    concept: {
      subtitle: 'A Experiência',
      title: <>Natureza que <br /> <span className="text-[#924032] italic">abraça a alma</span>.</>,
      description: 'Cercada pelo verde e pelo canto dos pássaros, a Casa Jardim é um santuário particular. Perfeita para desconectar do mundo e reconectar com o que importa.',
      image: '/gourmet.webp', // Placeholder
      badge: 'Respire o ar puro.'
    },
    experiences: [
      { title: 'Jardim Secreto', desc: 'Um oásis particular.', img: '/familia.webp' }, // Placeholder images
      { title: 'Varanda Zen', desc: 'Redes e silêncio.', img: '/quarto.webp' },
      { title: 'Cozinha Viva', desc: 'Para chefs de fim de semana.', img: '/cozinha.webp' },
      { title: 'Piscina Natural', desc: 'Refrescância pura.', img: '/piscina.webp' },
      { title: 'Fogueira', desc: 'Histórias ao luar.', img: '/churrasqueira.webp' },
      { title: 'Suíte Jardim', desc: 'Acorde com os pássaros.', img: '/suitemaster.webp' },
      { title: 'Área Kids', desc: 'Liberdade para brincar.', img: '/jogos.webp' },
    ],
    amenities: {
      "Vistas panorâmicas": ["Vista para o horizonte da cidade", "Vista para as montanhas", "Vista para a piscina"],
      "Banheiro": ["Água quente"],
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
