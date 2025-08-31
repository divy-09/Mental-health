import { motion } from 'motion/react';

export function AnimatedCards() {
  const cards = [
    {
      title: 'Smooth Transitions',
      description: 'Seamless animations that guide user attention',
      icon: '🎯',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Interactive Elements',
      description: 'Engaging hover effects and micro-interactions',
      icon: '✨',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Performance First',
      description: 'Optimized animations for smooth 60fps experience',
      icon: '⚡',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Mobile Ready',
      description: 'Responsive animations that work on all devices',
      icon: '📱',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
          >
            {/* Card Background with Gradient */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-border">
              {/* Animated Gradient Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                initial={{ scale: 0, rotate: 180 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0,
                  transition: { duration: 0.6 }
                }}
              />
              
              {/* Card Content */}
              <div className="relative p-6 z-10">
                {/* Animated Icon */}
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {card.icon}
                </motion.div>
                
                {/* Title with Letter Animation */}
                <motion.h3 
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {card.title.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      className="inline-block"
                      whileHover={{ 
                        y: -2,
                        color: '#3b82f6',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {card.description}
                </motion.p>
                
                {/* Animated Arrow */}
                <motion.div
                  className="mt-4 text-primary"
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.div>
              </div>
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-1 h-1 bg-primary rounded-full opacity-0"
                    style={{
                      left: `${20 + particleIndex * 30}%`,
                      top: `${30 + particleIndex * 20}%`
                    }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      y: [-20, -40, -60],
                      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                      transition: {
                        duration: 1,
                        delay: particleIndex * 0.2
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}