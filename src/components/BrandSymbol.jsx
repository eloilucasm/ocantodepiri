import { Link } from 'react-router-dom';

const BrandSymbol = ({ className, filled = false }) => {
  const src = filled ? '/janelapreenchida.svg' : '/logo2.svg';
  
  return (
    <Link to="/" className="block">
      <img 
        src={src} 
        alt="Ô Canto de Piri" 
        className={className}
        style={{ display: 'block' }} 
      />
    </Link>
  );
};

import React from 'react';

export default React.memo(BrandSymbol);
