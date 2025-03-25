import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { communityImages } from '@/assets/images';
import {
  Search,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
  Calendar,
  Clock
} from 'lucide-react';

const discussions = [
  {
    id: 1,
    title: 'Tips for Effective Time Management',
    description: 'Share your strategies for managing time effectively while balancing studies and personal life.',
    author: 'Sarah Johnson',
    avatar: communityImages.discussions.discussion1,
    likes: 24,
    comments: 12,
    category: 'Study Tips'
  },
  {
    id: 2,
    title: 'Career Path Discussion',
    description: 'Let\'s discuss different career paths and what skills are needed for success.',
    author: 'Michael Chen',
    avatar: communityImages.discussions.discussion2,
    likes: 18,
    comments: 8,
    category: 'Career'
  },
  {
    id: 3,
    title: 'Learning Resources',
    description: 'Share your favorite learning resources and study materials.',
    author: 'Emma Davis',
    avatar: communityImages.discussions.discussion3,
    likes: 32,
    comments: 15,
    category: 'Resources'
  },
  {
    id: 4,
    title: 'Exam Preparation Tips',
    description: 'What are your best tips for preparing for exams?',
    author: 'David Wilson',
    avatar: communityImages.discussions.discussion4,
    likes: 28,
    comments: 14,
    category: 'Study Tips'
  }
];

const events = [
  {
    id: 1,
    title: 'Study Group Meetup',
    description: 'Join us for a collaborative study session focused on mathematics.',
    date: '2024-03-25',
    time: '14:00',
    attendees: 15,
    image: communityImages.events.event1
  },
  {
    id: 2,
    title: 'Career Workshop',
    description: 'Learn about different career paths and how to prepare for them.',
    date: '2024-03-28',
    time: '16:00',
    attendees: 20,
    image: communityImages.events.event2
  },
  {
    id: 3,
    title: 'Peer Mentoring Session',
    description: 'Connect with experienced students for guidance and support.',
    date: '2024-03-30',
    time: '15:00',
    attendees: 12,
    image: communityImages.events.event3
  }
];

export function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(discussions.map(d => d.category)));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${communityImages.hero})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-60" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl font-bold mb-4">
              Join Our Learning Community
            </h1>
            <p className="text-xl mb-8">
              Connect with fellow learners, share experiences, and grow together.
            </p>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:bg-opacity-20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discussions */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Discussions List */}
            <div className="space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={discussion.avatar}
                      alt={discussion.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                          {discussion.category}
                        </span>
                        <button className="text-gray-400 hover:text-purple-600">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {discussion.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{discussion.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                            <Heart className="w-5 h-5" />
                            <span>{discussion.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                            <MessageCircle className="w-5 h-5" />
                            <span>{discussion.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          Posted by {discussion.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">
                Upcoming Events
              </h2>
              <div className="space-y-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {event.attendees} attendees
                        </div>
                        <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                          Join Event
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


