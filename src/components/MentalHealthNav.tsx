import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Heart, MessageCircle, Calendar, BookOpen, Users, BarChart3, Home } from 'lucide-react';

interface MentalHealthNavProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function MentalHealthNav({ currentSection, onNavigate }: MentalHealthNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'AI Support', icon: MessageCircle },
    { id: 'booking', label: 'Book Session', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'admin', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('home')}
        >
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-4 h-4 text-white" />
          </motion.div>
          <h1 className="text-primary">Neuro Nova</h1>
        </motion.div>

        {/* Navigation Items */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden xl:block">{item.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Emergency Button */}
        <motion.button
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="hidden sm:inline">Crisis Support</span>
          <span className="sm:hidden">SOS</span>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden px-4 pb-4">
        <div className="flex items-center justify-between space-x-1 bg-white/80 backdrop-blur-md rounded-full p-1 shadow-lg">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    layoutId="activeMobileTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}