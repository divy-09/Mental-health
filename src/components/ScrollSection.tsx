import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollSection({ children, className = '' }: ScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ 
        duration: 0.8, 
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  );
}