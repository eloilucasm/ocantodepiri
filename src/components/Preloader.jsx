import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 4000); // 4 seconds load time simulation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-[#f5ece3] flex items-center justify-center flex-col"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-2"
            >
                {/* Fixed & Scaled Bird Drawing Animation */}
                <svg viewBox="140 0 160 140" className="w-[120px] h-auto translate-x-[15px]">
                  <motion.path
                    d="m242.29,68.1c-.96-3.9-2.86-7.59-5.5-10.65-1.14-1.34-2.46-2.36-3.74-3.36-1.42-1.11-2.77-2.16-3.61-3.46-.96-1.48-.7-3.74-.14-5.37.63-1.84,1.72-3.55,2.89-5.36.19-.31.4-.62.59-.93,1.08-1.72,2.18-3.6,2.87-5.7.04-.12.08-.23.11-.34.97-2.69-.22-4.01-1.39-4.64-1.1-.59-2.41-.5-3.48-.42-.21.01-.4.02-.55.03-1.62-.01-3.25.02-4.83.05-2.43.06-4.72.1-7.03-.02-4.2-.22-9.58-.06-13.86,3.18-3.87,2.95-6.27,8.33-6.08,13.72l5.02-.17c-.13-3.74,1.52-7.58,4.1-9.54,2.97-2.26,7.2-2.34,10.54-2.16,2.51.13,5,.08,7.41.03,1.54-.04,3.13-.07,4.66-.05.04,0,.07,0,.11,0-.47,1.07-1.11,2.15-1.88,3.36-.19.3-.38.6-.57.91-1.27,1.98-2.58,4.03-3.41,6.44-1.24,3.61-.99,7.16.68,9.74,1.3,2,3.04,3.36,4.73,4.68,1.14.88,2.21,1.72,3.02,2.67,2.13,2.47,3.66,5.44,4.43,8.58,3.11,12.66-6.83,23.2-17.28,32.91-4.97,4.63-10.3,8.88-15.84,12.65-3.17,2.16-3.46,4.49-3.52,7.54l-.4,19.2-.05,2.56,5.02.1.1-4.71.35-17.04c.05-2.4.16-2.69,1.33-3.49,5.74-3.91,11.27-8.33,16.43-13.13,8.54-7.93,22.81-21.2,18.74-37.79Z"
                    fill="none"
                    stroke="#924032"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="m215.41,59.03c-1.06-1.88-3.21-4.25-7.51-4.88-5.49-.8-10.62,2.45-14.92,5.74-7.11,5.45-11.6,13.18-15.95,21.28-3.15,5.86-6,11.98-8.77,17.92-.79,1.69-1.57,3.36-2.36,5.03-1.16,2.46-2.13,4.48-3.07,6.38-1.01,2.05-.88,3.97.35,5.14.35.32,1.08.85,2.21.85.7,0,1.54-.2,2.54-.78,17.19-9.9,38.59-22.21,47.3-42.88,1.64-3.89,2.54-9.57.16-13.8Zm-4.78,11.85c-7.49,17.75-25.78,29.24-41.61,38.42.45-.94.93-1.95,1.44-3.03.78-1.67,1.57-3.36,2.36-5.05,2.73-5.86,5.56-11.93,8.64-17.67,4.24-7.89,8.25-14.81,14.58-19.66,3.46-2.65,7.5-5.29,11.13-4.76,1.85.27,3.12,1.05,3.87,2.37,1.21,2.15,1.05,5.92-.41,9.38Z"
                    fill="none"
                    stroke="#924032"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  />
                </svg>

                <motion.div 
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className="text-[#924032] tracking-[0.2em] text-sm md:text-base font-light italic">Preparando seu aconchego</span>
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 rounded-full bg-[#924032]"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
