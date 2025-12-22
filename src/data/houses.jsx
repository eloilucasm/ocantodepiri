import React from 'react';

export const houses = {
  casa1: {
    id: 'casa1',
    name: 'Casa Villa',
    hero: {
      image: '/hero.avif',
      subtitle: 'Pirenópolis, Goiás',
      scrollText: 'Role para respirar'
    },
    concept: {
      subtitle: 'O Conceito',
      title: <>Vínculos que <br /> <span className="text-[#924032] italic">duram para sempre</span>.</>,
      description: 'Inspirada pela energia positiva e boas vibrações de Pirenópolis, nossa casa foi projetada para ser um refúgio de leveza. Um lugar onde cada detalhe é um convite para o bem-estar.',
      image: '/quarto.avif',
      badge: 'Sinta o aconchego de casa.'
    },
    experiences: [
      { title: 'Suíte Master', desc: 'Conforto absoluto e luz natural.', img: '/suitemaster.avif' },
      { title: 'Canto Gourmet', desc: 'Sabor e convívio ao ar livre.', img: '/gourmet.avif' },
      { title: 'Lazer e Sol', desc: 'Piscina aquecida em meio ao jardim.', img: '/piscina.avif' },
      { title: 'Espaço de Jogos', desc: 'Diversão garantida.', img: '/jogos.avif' },
      { title: 'Sol e Braza', desc: 'Churrasco e bons momentos.', img: '/churrasqueira.avif' },
      { title: 'Piscina', desc: 'Refrescância e lazer.', img: '/piscina2.avif' },
      { title: 'Para toda família', desc: 'Espaço para todos.', img: '/familia.avif' },
    ]
  },
  casa2: {
    id: 'casa2',
    name: 'Casa Jardim',
    hero: {
      image: '/piscina2.avif', // Placeholder: using a different image to show change
      subtitle: 'Refúgio Natural',
      scrollText: 'Descubra a paz'
    },
    concept: {
      subtitle: 'A Experiência',
      title: <>Natureza que <br /> <span className="text-[#924032] italic">abraça a alma</span>.</>,
      description: 'Cercada pelo verde e pelo canto dos pássaros, a Casa Jardim é um santuário particular. Perfeita para desconectar do mundo e reconectar com o que importa.',
      image: '/gourmet.avif', // Placeholder
      badge: 'Respire o ar puro.'
    },
    experiences: [
      { title: 'Jardim Secreto', desc: 'Um oásis particular.', img: '/familia.avif' }, // Placeholder images
      { title: 'Varanda Zen', desc: 'Redes e silêncio.', img: '/quarto.avif' },
      { title: 'Cozinha Viva', desc: 'Para chefs de fim de semana.', img: '/cozinha.avif' },
      { title: 'Piscina Natural', desc: 'Refrescância pura.', img: '/piscina.avif' },
      { title: 'Fogueira', desc: 'Histórias ao luar.', img: '/churrasqueira.avif' },
      { title: 'Suíte Jardim', desc: 'Acorde com os pássaros.', img: '/suitemaster.avif' },
      { title: 'Área Kids', desc: 'Liberdade para brincar.', img: '/jogos.avif' },
    ]
  }
};
