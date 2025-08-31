import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Shield, Users, Clock, ThumbsUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

interface Post {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  isAnonymous: boolean;
  tags: string[];
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  isAnonymous: boolean;
}

export function PeerSupport() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const posts: Post[] = [
    {
      id: '1',
      author: 'Anonymous Student',
      avatar: '',
      timeAgo: '2 hours ago',
      title: 'Dealing with exam anxiety',
      content: 'Has anyone found effective ways to manage anxiety during final exams? I get so overwhelmed that I can barely focus on studying.',
      category: 'anxiety',
      likes: 12,
      replies: 8,
      isAnonymous: true,
      tags: ['exams', 'anxiety', 'study-tips']
    },
    {
      id: '2',
      author: 'Sarah M.',
      avatar: '',
      timeAgo: '5 hours ago',
      title: 'Homesickness in first year',
      content: 'I\'m a freshman and really struggling with being away from home. Any advice on how to cope with homesickness?',
      category: 'adjustment',
      likes: 18,
      replies: 15,
      isAnonymous: false,
      tags: ['freshman', 'homesickness', 'adjustment']
    },
    {
      id: '3',
      author: 'Anonymous Student',
      avatar: '',
      timeAgo: '1 day ago',
      title: 'Imposter syndrome in STEM',
      content: 'I feel like I don\'t belong in my engineering program. Everyone seems so much smarter than me. How do you deal with imposter syndrome?',
      category: 'confidence',
      likes: 25,
      replies: 22,
      isAnonymous: true,
      tags: ['imposter-syndrome', 'stem', 'confidence']
    },
    {
      id: '4',
      author: 'Mike T.',
      avatar: '',
      timeAgo: '2 days ago',
      title: 'Building healthy study habits',
      content: 'I\'ve been working with a counselor and wanted to share some study techniques that have really helped my mental health.',
      category: 'success',
      likes: 34,
      replies: 12,
      isAnonymous: false,
      tags: ['study-habits', 'success-story', 'tips']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', color: 'bg-gray-500' },
    { id: 'anxiety', label: 'Anxiety & Stress', color: 'bg-red-500' },
    { id: 'adjustment', label: 'College Life', color: 'bg-blue-500' },
    { id: 'confidence', label: 'Self-Worth', color: 'bg-purple-500' },
    { id: 'success', label: 'Success Stories', color: 'bg-green-500' },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    // In a real app, this would create a new post
    setNewPost('');
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-primary">Peer Support Community</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow students in a safe, moderated environment. Share experiences, 
            get support, and help others on their mental health journey.
          </p>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-blue-800 font-medium">Safe Space Guidelines</p>
                <p className="text-blue-700 text-sm">
                  This community is moderated by trained volunteers. Be respectful, kind, and supportive.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
                <h3 className="mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Share with the community</span>
                </h3>
                
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, ask for advice, or offer support..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4 min-h-24"
                />
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-muted-foreground">Post anonymously</span>
                  </label>
                  
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Share Post
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/60 text-muted-foreground hover:bg-white/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Posts */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{post.timeAgo}</span>
                              {post.isAnonymous && (
                                <Badge variant="outline" className="text-xs">
                                  Anonymous
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h3 className="mb-2">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.button
                            className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </motion.button>
                          
                          <motion.button
                            className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{post.replies}</span>
                          </motion.button>
                          
                          <motion.button
                            className="flex items-center space-x-2 text-muted-foreground hover:text-green-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                          </motion.button>
                        </div>

                        <Badge 
                          variant="secondary" 
                          className={`${
                            categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
                          } text-white`}
                        >
                          {categories.find(c => c.id === post.category)?.label || post.category}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <h3 className="mb-4 text-green-800">Community Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Active Members</span>
                      <span className="font-medium text-green-800">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Posts Today</span>
                      <span className="font-medium text-green-800">43</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Support Given</span>
                      <span className="font-medium text-green-800">156</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Volunteer Moderators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Trained Moderators</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Alex R.', status: 'Online', specialty: 'Peer Counselor' },
                      { name: 'Jamie L.', status: 'Online', specialty: 'Crisis Support' },
                      { name: 'Taylor K.', status: 'Away', specialty: 'Academic Support' }
                    ].map((moderator, index) => (
                      <motion.div
                        key={moderator.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            moderator.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{moderator.name}</p>
                          <p className="text-xs text-muted-foreground">{moderator.specialty}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Community Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-purple-50 border-purple-200">
                  <h3 className="mb-4 text-purple-800">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Be respectful and supportive</li>
                    <li>• Maintain confidentiality</li>
                    <li>• No medical advice</li>
                    <li>• Report concerning content</li>
                    <li>• Seek professional help when needed</li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="text-center">
              <h2 className="mb-4 text-red-800">Need Immediate Help?</h2>
              <p className="text-red-700 mb-6 max-w-2xl mx-auto">
                If you're in crisis or having thoughts of self-harm, please reach out immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Crisis Helpline: 988
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  Campus Emergency: (555) 123-4567
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}