import { motion } from 'motion/react';

export function FloatingElements() {
  const elements = [
    { size: 'w-4 h-4', delay: 0, duration: 8, x: '10%', y: '20%' },
    { size: 'w-6 h-6', delay: 2, duration: 12, x: '80%', y: '10%' },
    { size: 'w-3 h-3', delay: 4, duration: 10, x: '90%', y: '60%' },
    { size: 'w-5 h-5', delay: 1, duration: 15, x: '15%', y: '80%' },
    { size: 'w-2 h-2', delay: 6, duration: 9, x: '70%', y: '75%' },
    { size: 'w-4 h-4', delay: 3, duration: 11, x: '5%', y: '50%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} bg-primary/10 rounded-full`}
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"
        style={{ left: '20%', top: '30%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-l from-accent/5 to-primary/5 rounded-full blur-3xl"
        style={{ right: '10%', bottom: '20%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}