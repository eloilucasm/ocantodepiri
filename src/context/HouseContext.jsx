import React, { createContext, useState, useContext, useMemo } from 'react';
import { houses } from '../data/houses.jsx';

const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
  const [currentHouseId, setCurrentHouseId] = useState('casa1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchHouse = (houseId) => {
    if (houseId === currentHouseId) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentHouseId(houseId);
      setIsTransitioning(false);
    }, 600); // Matches transition duration
  };

  const currentHouse = houses[currentHouseId];

  const value = useMemo(() => ({
    currentHouse,
    currentHouseId,
    switchHouse,
    isTransitioning,
    houses
  }), [currentHouse, currentHouseId, isTransitioning]);

  return (
    <HouseContext.Provider value={value}>
      {children}
    </HouseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHouse = () => useContext(HouseContext);
