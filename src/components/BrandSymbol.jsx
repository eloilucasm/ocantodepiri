import React from 'react';

const BrandSymbol = ({ className, filled = false }) => {
  const src = filled ? '/janelapreenchida.svg' : '/logo2.svg';
  
  return (
    <img 
      src={src} 
      alt="Ô Canto de Piri" 
      className={className}
      style={{ display: 'block' }} 
    />
  );
};

export default BrandSymbol;
