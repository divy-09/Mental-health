import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Heart, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high';
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm here to provide mental health support and guidance. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string; severity?: 'low' | 'medium' | 'high' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // High severity keywords
    const highSeverityKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'hopeless'];
    const mediumSeverityKeywords = ['depressed', 'anxious', 'panic', 'stressed', 'overwhelmed', 'lonely'];
    const positiveKeywords = ['good', 'better', 'happy', 'great', 'fine', 'okay'];

    if (highSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        text: "I'm really concerned about what you've shared. These feelings are serious, and I want you to know that help is available right away. Please consider calling the National Suicide Prevention Lifeline at 988 or speaking with a counselor immediately. Would you like me to help you book an urgent session?",
        severity: 'high'
      };
    }

    if (mediumSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        text: "I hear that you're going through a difficult time, and I want you to know that what you're feeling is valid. Many students experience similar challenges. Let's explore some coping strategies together. Would you like to try a brief breathing exercise, or would you prefer to talk about what's been troubling you?",
        severity: 'medium'
      };
    }

    if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        text: "I'm glad to hear you're doing well! It's wonderful when we have positive moments. Is there anything specific that's been helping you feel this way? Sometimes sharing what works can be beneficial for maintaining good mental health.",
        severity: 'low'
      };
    }

    // Default responses
    const responses = [
      "Thank you for sharing that with me. Can you tell me more about how this is affecting your daily life?",
      "It sounds like you're dealing with some challenges. What kind of support would be most helpful for you right now?",
      "I appreciate you opening up. Many students face similar situations. What coping strategies have you tried before?",
      "That sounds difficult to manage. Would you like to explore some techniques that might help you feel more balanced?",
    ];

    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      severity: 'low'
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        severity: aiResponse.severity,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-primary">AI Mental Health Support</h1>
          </div>
          <p className="text-muted-foreground">
            Chat with our AI assistant for immediate mental health support and guidance
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </motion.div>

                  {/* Message Bubble */}
                  <motion.div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : message.severity === 'high'
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : message.severity === 'medium'
                        ? 'bg-amber-50 border border-amber-200 text-amber-800'
                        : 'bg-gray-50 border border-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {!message.isUser && message.severity === 'high' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-medium">Urgent Support Needed</span>
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    <div className={`text-xs mt-2 ${
                      message.isUser ? 'text-blue-100' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind..."
                className="flex-1 border-0 bg-gray-50 focus:bg-white transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              This AI provides general guidance and is not a replacement for professional therapy. 
              In crisis situations, please contact emergency services or a crisis helpline.
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            'I need breathing exercises',
            'I\'m feeling anxious',
            'Help with sleep issues',
            'Academic stress support'
          ].map((suggestion, index) => (
            <motion.button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 text-left hover:bg-white/80 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{suggestion}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}