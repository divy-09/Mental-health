import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Headphones, Download, Star, Clock, User } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'guide';
  duration: string;
  rating: number;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string;
}

export function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Deep Breathing for Anxiety Relief',
      description: 'Learn effective breathing techniques to manage anxiety and panic attacks',
      type: 'video',
      duration: '12 min',
      rating: 4.8,
      author: 'Dr. Sarah Johnson',
      category: 'anxiety',
      tags: ['breathing', 'anxiety', 'panic', 'beginner'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Guided Meditation for Sleep',
      description: 'Peaceful meditation to help you fall asleep naturally',
      type: 'audio',
      duration: '20 min',
      rating: 4.9,
      author: 'Michael Chen',
      category: 'sleep',
      tags: ['meditation', 'sleep', 'relaxation'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Managing Academic Stress',
      description: 'Comprehensive guide to handling college pressures and deadlines',
      type: 'article',
      duration: '8 min read',
      rating: 4.7,
      author: 'Prof. Lisa Wang',
      category: 'stress',
      tags: ['academic', 'stress', 'time-management', 'study'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Building Self-Confidence',
      description: 'Practical exercises to boost your self-esteem and confidence',
      type: 'guide',
      duration: '15 min',
      rating: 4.6,
      author: 'Dr. Priya Patel',
      category: 'confidence',
      tags: ['self-esteem', 'confidence', 'growth'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '5',
      title: 'Mindful Walking Exercise',
      description: 'Connect with the present moment through mindful movement',
      type: 'video',
      duration: '18 min',
      rating: 4.8,
      author: 'James Rodriguez',
      category: 'mindfulness',
      tags: ['mindfulness', 'walking', 'present-moment'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '6',
      title: 'Progressive Muscle Relaxation',
      description: 'Audio guide to release physical tension and mental stress',
      type: 'audio',
      duration: '25 min',
      rating: 4.9,
      author: 'Dr. Sarah Johnson',
      category: 'stress',
      tags: ['relaxation', 'tension', 'stress-relief'],
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'anxiety', label: 'Anxiety', count: resources.filter(r => r.category === 'anxiety').length },
    { id: 'stress', label: 'Stress', count: resources.filter(r => r.category === 'stress').length },
    { id: 'sleep', label: 'Sleep', count: resources.filter(r => r.category === 'sleep').length },
    { id: 'mindfulness', label: 'Mindfulness', count: resources.filter(r => r.category === 'mindfulness').length },
    { id: 'confidence', label: 'Confidence', count: resources.filter(r => r.category === 'confidence').length },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      case 'article':
        return <BookOpen className="w-5 h-5" />;
      case 'guide':
        return <Download className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'from-red-500 to-pink-500';
      case 'audio':
        return 'from-green-500 to-emerald-500';
      case 'article':
        return 'from-blue-500 to-indigo-500';
      case 'guide':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-primary">Wellness Resource Hub</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Access guided meditations, wellness videos, self-help articles, and mental health resources 
            in multiple languages to support your journey to better mental health.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto mb-6">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${getResourceColor(resource.type)} rounded-full flex items-center justify-center text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {getResourceIcon(resource.type)}
                    </motion.div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 backdrop-blur-sm text-gray-700 capitalize"
                      >
                        {resource.type}
                      </Badge>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="line-clamp-2 flex-1">{resource.title}</h3>
                      <div className="flex items-center space-x-1 ml-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{resource.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    {/* Author */}
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{resource.author}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className={`w-full bg-gradient-to-r ${getResourceColor(resource.type)} text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {getResourceIcon(resource.type)}
                      <span>
                        {resource.type === 'video' ? 'Watch Video' :
                         resource.type === 'audio' ? 'Listen Now' :
                         resource.type === 'guide' ? 'Download Guide' :
                         'Read Article'}
                      </span>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories
            </p>
          </motion.div>
        )}

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="text-center">
              <h2 className="mb-4 text-primary">Need Immediate Support?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out for immediate help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Crisis Helpline: 988
                </motion.button>
                <motion.button
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat with Counselor
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}