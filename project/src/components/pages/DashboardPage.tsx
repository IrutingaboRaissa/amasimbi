import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getUserActivities } from '@/services/storage';
import { UserActivity } from '@/types';
import { dashboardImages } from '@/assets/images';
import {
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  LogOut,
  Trophy,
  Clock,
  Star,
  ChevronRight,
  Heart,
  MessageCircle,
  Bookmark,
  Award,
  Image as ImageIcon
} from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
  illustration: string;
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<UserActivity[]>([]);

  useEffect(() => {
    if (user) {
      const userActivities = getUserActivities(user.id);
      setActivities(userActivities);
    }
  }, [user]);

  const quickActions: QuickAction[] = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Continue Learning',
      description: 'Pick up where you left off',
      link: '/learn',
      color: 'bg-purple-500',
      illustration: dashboardImages.learning
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community',
      description: 'Connect with others',
      link: '/community',
      color: 'bg-blue-500',
      illustration: dashboardImages.community
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Discussion',
      description: 'Share your thoughts',
      link: '/community',
      color: 'bg-green-500',
      illustration: dashboardImages.discussion
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Schedule',
      description: 'Plan your learning',
      link: '/learn',
      color: 'bg-orange-500',
      illustration: dashboardImages.schedule
    }
  ];

  const stats = [
    { icon: <Trophy className="w-6 h-6" />, label: 'Courses Completed', value: '3' },
    { icon: <Clock className="w-6 h-6" />, label: 'Days Active', value: '12' },
    { icon: <Star className="w-6 h-6" />, label: 'Achievement Points', value: '450' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-64 mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardImages.hero})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-between px-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.displayName}!
            </h1>
            <p className="text-lg opacity-90">Continue your learning journey</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-purple-600 hover:bg-purple-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-purple-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition-shadow group"
                >
                  <Link to={action.link} className="block">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <div className="mt-4 h-24 overflow-hidden rounded-lg">
                      <img
                        src={action.illustration}
                        alt={action.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        {activity.type === 'post' && <MessageSquare className="w-4 h-4" />}
                        {activity.type === 'comment' && <MessageCircle className="w-4 h-4" />}
                        {activity.type === 'like' && <Heart className="w-4 h-4" />}
                        {activity.type === 'course_complete' && <Award className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 