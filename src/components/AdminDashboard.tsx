import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageCircle, Calendar, AlertTriangle, Heart, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Mock data for dashboard
  const monthlyUsage = [
    { month: 'Jan', chatSessions: 234, bookings: 89, resources: 456 },
    { month: 'Feb', chatSessions: 312, bookings: 123, resources: 567 },
    { month: 'Mar', chatSessions: 428, bookings: 156, resources: 634 },
    { month: 'Apr', chatSessions: 387, bookings: 178, resources: 723 },
    { month: 'May', chatSessions: 445, bookings: 203, resources: 812 },
    { month: 'Jun', chatSessions: 523, bookings: 234, resources: 891 },
  ];

  const severityData = [
    { name: 'Low Severity', value: 65, color: '#10b981' },
    { name: 'Medium Severity', value: 25, color: '#f59e0b' },
    { name: 'High Severity', value: 10, color: '#ef4444' },
  ];

  const weeklyTrends = [
    { day: 'Mon', stress: 45, anxiety: 32, depression: 18 },
    { day: 'Tue', stress: 52, anxiety: 38, depression: 22 },
    { day: 'Wed', stress: 48, anxiety: 35, depression: 20 },
    { day: 'Thu', stress: 58, anxiety: 42, depression: 25 },
    { day: 'Fri', stress: 62, anxiety: 45, depression: 28 },
    { day: 'Sat', stress: 35, anxiety: 25, depression: 15 },
    { day: 'Sun', stress: 28, anxiety: 20, depression: 12 },
  ];

  const stats = [
    {
      title: 'Total Students Helped',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Chat Sessions Today',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Bookings This Week',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: Calendar,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Crisis Interventions',
      value: '12',
      change: '-5.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500'
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Activity className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-primary">Mental Health Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor student mental health trends and platform usage (All data is anonymized)
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Last updated: Just now
            </Badge>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant={stat.trend === 'up' ? 'default' : 'secondary'}
                      className={stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{stat.title}</p>
                  <p className="font-medium">{stat.value}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <Tabs defaultValue="usage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Platform Usage</TabsTrigger>
            <TabsTrigger value="severity">Issue Severity</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="usage">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
                <h3 className="mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Monthly Platform Usage</span>
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="chatSessions" fill="#3b82f6" name="Chat Sessions" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#10b981" name="Bookings" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resources" fill="#8b5cf6" name="Resources Accessed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="severity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
                <h3 className="mb-6">Issue Severity Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
                <h3 className="mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <motion.button
                    className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-left hover:bg-red-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Crisis Alerts</p>
                        <p className="text-red-600 text-sm">3 pending reviews</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl text-left hover:bg-blue-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Counselor Schedule</p>
                        <p className="text-blue-600 text-sm">Manage availability</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    className="w-full p-4 bg-green-50 border border-green-200 rounded-xl text-left hover:bg-green-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Wellness Programs</p>
                        <p className="text-green-600 text-sm">Create new initiatives</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="trends">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
                <h3 className="mb-6">Weekly Mental Health Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      name="Stress"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="anxiety" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      name="Anxiety"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="depression" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      name="Depression"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20">
            <h3 className="mb-6">Recent Platform Activity</h3>
            <div className="space-y-4">
              {[
                {
                  action: 'High severity chat session flagged for review',
                  time: '2 minutes ago',
                  type: 'alert',
                  icon: AlertTriangle,
                  color: 'text-red-600'
                },
                {
                  action: 'New counselor Dr. Amanda Lee joined the platform',
                  time: '1 hour ago',
                  type: 'info',
                  icon: Users,
                  color: 'text-green-600'
                },
                {
                  action: '15 new students registered for mental health resources',
                  time: '3 hours ago',
                  type: 'info',
                  icon: Heart,
                  color: 'text-blue-600'
                },
                {
                  action: 'Weekly wellness workshop scheduled for Thursday',
                  time: '5 hours ago',
                  type: 'info',
                  icon: Calendar,
                  color: 'text-purple-600'
                },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className={`${activity.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-800">Privacy & Confidentiality</p>
                <p className="text-blue-700 text-sm">
                  All data is anonymized and aggregated. Individual student information is never displayed. 
                  This dashboard helps identify trends to improve mental health support services.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}