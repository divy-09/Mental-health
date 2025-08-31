import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MentalHealthNav } from './components/MentalHealthNav';
import { MentalHealthHero } from './components/MentalHealthHero';
import { AIChat } from './components/AIChat';
import { BookingSystem } from './components/BookingSystem';
import { ResourceHub } from './components/ResourceHub';
import { PeerSupport } from './components/PeerSupport';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingTherapyElements } from './components/FloatingTherapyElements';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8]);
  const gradientRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'chat':
        return <AIChat />;
      case 'booking':
        return <BookingSystem />;
      case 'resources':
        return <ResourceHub />;
      case 'community':
        return <PeerSupport />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <MentalHealthHero onNavigate={setCurrentSection} />;
    }
  };

  return (
    <motion.div 
      className="min-h-screen overflow-x-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
          opacity: gradientOpacity,
        }}
      />
      
      {/* Rotating Gradient Layer */}
      <motion.div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          background: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)',
          rotate: gradientRotation,
          transformOrigin: 'center',
        }}
      />
      
      {/* Mesh Gradient Overlay */}
      <div className="fixed inset-0 z-0 opacity-40 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50" />
      
      {/* Content Backdrop */}
      <div className="fixed inset-0 z-0 bg-white/70 backdrop-blur-sm" />
      <div className="relative z-20">
        <FloatingTherapyElements />
      </div>
      <div className="relative z-50">
        <MentalHealthNav 
          currentSection={currentSection} 
          onNavigate={setCurrentSection} 
        />
      </div>
      
      <motion.main
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative z-30"
      >
        {renderCurrentSection()}
      </motion.main>

      {/* Footer */}
      {currentSection === 'home' && (
        <footer className="py-16 px-4 text-center relative z-30">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="mb-4 text-primary">Neuro Nova - Mental Health Matters</h3>
            <p className="text-muted-foreground mb-6">
              Your mental well-being is our priority. Confidential, professional, and always here for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>🔒 100% Confidential</span>
              <span>🌍 Multilingual Support</span>
              <span>⏰ 24/7 AI Support</span>
              <span>👥 Trained Professionals</span>
            </div>
          </motion.div>
        </footer>
      )}
    </motion.div>
  );
}