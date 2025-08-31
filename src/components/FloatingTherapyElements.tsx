import { motion } from 'motion/react';

export function FloatingTherapyElements() {
  const elements = [
    { 
      emoji: '🌸', 
      size: 'text-2xl', 
      delay: 0, 
      duration: 12, 
      x: '10%', 
      y: '20%',
      color: 'text-pink-300'
    },
    { 
      emoji: '🍃', 
      size: 'text-xl', 
      delay: 2, 
      duration: 15, 
      x: '85%', 
      y: '15%',
      color: 'text-green-300'
    },
    { 
      emoji: '💙', 
      size: 'text-lg', 
      delay: 4, 
      duration: 10, 
      x: '90%', 
      y: '70%',
      color: 'text-blue-300'
    },
    { 
      emoji: '🌟', 
      size: 'text-xl', 
      delay: 1, 
      duration: 18, 
      x: '5%', 
      y: '80%',
      color: 'text-yellow-300'
    },
    { 
      emoji: '☁️', 
      size: 'text-3xl', 
      delay: 6, 
      duration: 20, 
      x: '75%', 
      y: '25%',
      color: 'text-gray-300'
    },
    { 
      emoji: '🦋', 
      size: 'text-lg', 
      delay: 3, 
      duration: 14, 
      x: '15%', 
      y: '60%',
      color: 'text-purple-300'
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Emojis */}
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color}`}
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
      
      {/* Calming Gradient Orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        style={{ left: '10%', top: '20%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-l from-green-200/20 to-blue-200/20 rounded-full blur-3xl"
        style={{ right: '5%', top: '40%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        style={{ left: '60%', bottom: '10%' }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Breathing Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Mindfulness Circles */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`circle-${index}`}
          className="absolute border border-blue-200/30 rounded-full"
          style={{
            width: `${100 + index * 50}px`,
            height: `${100 + index * 50}px`,
            left: '50%',
            top: '50%',
            marginLeft: `-${50 + index * 25}px`,
            marginTop: `-${50 + index * 25}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            delay: index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}