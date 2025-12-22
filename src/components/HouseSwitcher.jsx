import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useHouse } from '../context/HouseContext';

const HouseSwitcher = () => {
  const { currentHouseId, switchHouse, houses, isTransitioning } = useHouse();

  return (
    <div className="flex bg-white/10 md:bg-white/10 backdrop-blur-md rounded-full p-0.5 md:p-1 border border-[#924032]/20 pointer-events-auto">
      {Object.values(houses).map((house) => {
        const isActive = currentHouseId === house.id;
        return (
          <button
            key={house.id}
            onClick={() => switchHouse(house.id)}
            disabled={isTransitioning}
            className={`
              relative px-2.5 py-1 md:px-4 md:py-2 text-[8px] md:text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-500
              ${isActive ? 'text-[#f5ece3]' : 'text-[#69725d] hover:text-[#924032]'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeHouse"
                className="absolute inset-0 bg-[#924032] rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{house.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default HouseSwitcher;
