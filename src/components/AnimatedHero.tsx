import { motion } from 'motion/react';

export function AnimatedHero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };

  const title = "Beautiful Animations";
  const subtitle = "Create stunning web experiences with smooth, engaging animations";

  return (
    <div className="text-center px-4 max-w-4xl mx-auto">
      {/* Animated Title */}
      <motion.h1 className="mb-6 relative">
        {title.split('').map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ fontSize: '3.5rem', lineHeight: 1.2 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        
        {/* Animated underline */}
        <motion.div
          className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0, x: '-50%' }}
          animate={{ width: '60%', x: '-50%' }}
          transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
        />
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        custom={1}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 text-muted-foreground max-w-2xl mx-auto"
        style={{ fontSize: '1.25rem' }}
      >
        {subtitle}
      </motion.p>

      {/* Animated Buttons */}
      <motion.div
        custom={2}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Explore Animations
        </motion.button>
        
        <motion.button
          className="border border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Learn More
        </motion.button>
      </motion.div>

      {/* Floating Animation Indicator */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary rounded-full mx-auto flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
        <p className="text-muted-foreground mt-2">Scroll to explore</p>
      </motion.div>
    </div>
  );
}