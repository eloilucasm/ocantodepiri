import { useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Magnetic = ({ children, strength = 0.5 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    }

    const { x, y } = position;

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            <motion.div
                animate={{ x, y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default Magnetic;
