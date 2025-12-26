import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Magnetic from './Magnetic';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Interaction listener to "unlock" audio
  useEffect(() => {
    // Attempt play immediately (will likely fail, but worth a shot)
    if (audioRef.current) {
        audioRef.current.volume = 0.22;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    const unlockAudio = () => {
        if (audioRef.current) {
            // This needs to be done DIRECTLY in the event handler
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    // Remove listeners only after success
                    ['click', 'touchstart', 'keydown'].forEach(e => 
                        window.removeEventListener(e, unlockAudio)
                    );
                })
                .catch((e) => console.log("Unlock failed", e));
        }
    };

    // Use specific, user-initiated events that browsers trust
    ['click', 'touchstart', 'keydown'].forEach(event => 
        window.addEventListener(event, unlockAudio)
    );

    return () => {
        ['click', 'touchstart', 'keydown'].forEach(event => 
            window.removeEventListener(event, unlockAudio)
        );
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-[100] flex flex-col items-end gap-2">
      <audio ref={audioRef} src="/song.mp3" loop />
      
      {/* Sound Waves Animation */}
      <AnimatePresence>
        {isPlaying && (
            <motion.div className="absolute inset-0 flex items-center justify-center -z-10">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                        className="absolute w-full h-full rounded-full border border-[#924032]/30 bg-[#924032]/5 will-change-[transform,opacity]"
                    />
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      <Magnetic>
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 lg:w-14 lg:h-14 bg-[#f5ece3] text-[#924032] rounded-full flex items-center justify-center shadow-lg border border-[#924032]/20 relative overflow-hidden group cursor-pointer"
      >
        <div className="relative z-10">
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </div>
        
        {/* Fill effect on hover - Desktop Only */}
        <div className="absolute inset-0 bg-[#924032] scale-y-0 [@media(hover:hover)]:group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </div>
      </motion.button>
      </Magnetic>
    </div>
  );
};


export default React.memo(AudioPlayer);
