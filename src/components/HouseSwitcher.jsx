import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useHouse } from '../context/HouseContext';

const HouseSwitcher = ({ activeId, onSwitch, isModal = false }) => {
  const { currentHouseId, switchHouse, houses, isTransitioning: globalTransitioning } = useHouse();

  const currentId = activeId || currentHouseId;
  const handleSwitch = onSwitch || switchHouse;
  const isPending = onSwitch ? false : globalTransitioning;

  return (
    <div className={`flex backdrop-blur-md rounded-full p-0.5 md:p-1 border pointer-events-auto transition-colors duration-300
      ${isModal 
        ? 'bg-[#924032]/5 border-[#924032]/20' 
        : 'bg-white/10 md:bg-white/10 border-[#924032]/20'
      }
    `}>
      {Object.values(houses).map((house) => {
        const isActive = currentId === house.id;
        return (
          <button
            key={house.id}
            onClick={() => handleSwitch(house.id)}
            disabled={isPending}
            className={`
              relative px-2.5 py-1 md:px-4 md:py-2 text-[8px] md:text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-500
              ${isActive 
                ? 'text-[#f5ece3]' // Active text color (stays light)
                : isModal ? 'text-[#924032] hover:text-[#924032]/80' : 'text-[#69725d] hover:text-[#924032]' // Inactive text changes based on context
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId={isModal ? "activeHouseModal" : "activeHouse"}
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
