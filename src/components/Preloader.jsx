import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2000); // 2 seconds load time simulation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-[#f5ece3] flex items-center justify-center flex-col"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 border-2 border-[#924032] rounded-full animate-spin border-t-transparent"></div>
                <span className="text-[#924032] uppercase tracking-[0.3em] text-xs font-bold animate-pulse">Carregando</span>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
