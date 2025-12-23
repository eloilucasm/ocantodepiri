import React from 'react';

export const houses = {
  casa1: {
    id: 'casa1',
    name: 'Casa Villa',
    hero: {
      image: '/hero.webp',
      subtitle: 'Pirenópolis, Goiás',
      scrollText: 'Role para respirar',
      bookingLink: 'https://www.airbnb.com.sg/rooms/51765912?source_impression_id=p3_1766451710_P3SosKO6DErHBi9x'
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
    ]
  },
  'casa-jardim': {
    id: 'casa-jardim',
    name: 'Casa Jardim',
    hero: {
      image: '/piscina2.webp', // Placeholder: using a different image to show change
      subtitle: 'Refúgio Natural',
      scrollText: 'Descubra a paz',
      bookingLink: 'https://www.airbnb.com.sg/rooms/1035663779596246726?source_impression_id=p3_1766451619_P3DNadaMO9LsE5yG'
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
    ]
  }
};
