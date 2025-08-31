import { motion } from 'motion/react';
import { Heart, MessageCircle, Calendar, BookOpen, Users, Shield } from 'lucide-react';

interface MentalHealthHeroProps {
  onNavigate: (section: string) => void;
}

export function MentalHealthHero({ onNavigate }: MentalHealthHeroProps) {
  const features = [
    {
      id: 'chat',
      title: 'AI Support Chat',
      description: 'Instant mental health support with our compassionate AI assistant',
      icon: MessageCircle,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'booking',
      title: 'Book Counseling',
      description: 'Schedule confidential sessions with professional counselors',
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'resources',
      title: 'Wellness Resources',
      description: 'Access guided meditation, wellness videos, and self-help tools',
      icon: BookOpen,
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      id: 'community',
      title: 'Peer Support',
      description: 'Connect with fellow students in a safe, moderated environment',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-20">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700">100% Confidential & Secure</span>
          </motion.div>
          
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Mental Wellness Journey Starts Here
          </h1>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10 text-muted-foreground"
        >
          A comprehensive digital platform designed specifically for college students to access 
          mental health support, connect with peers, and build resilience in a stigma-free environment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            onClick={() => onNavigate('chat')}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start Chat Support</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => onNavigate('booking')}
            className="border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Counseling Session
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: 'Students Helped', value: '15,000+' },
            { label: 'Support Languages', value: '12+' },
            { label: 'Active Counselors', value: '150+' },
            { label: 'Success Rate', value: '94%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-primary mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => onNavigate(feature.id)}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}
                  whileHover={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Content */}
                <h3 className="mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>

                {/* Arrow */}
                <motion.div
                  className="text-primary"
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  whileHover={{ 
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}