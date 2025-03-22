import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { getPosts, addPost, getComments, addComment } from '@/services/storage';
import { Post, Comment } from '@/types';
import {
  Search,
  MessageSquare,
  Heart,
  MessageCircle,
  Plus,
  Filter,
  X,
  Send,
  ThumbsUp,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { communityImages } from '@/assets/images';

const discussions = [
  {
    id: 1,
    title: 'Tips for Exam Preparation',
    description: 'Share your study techniques and exam preparation strategies.',
    author: 'Sarah Johnson',
    avatar: communityImages.discussions.discussion1,
    likes: 45,
    comments: 23,
    category: 'Academic'
  },
  {
    id: 2,
    title: 'Career Planning Advice',
    description: 'Discuss career paths and professional development opportunities.',
    author: 'Michael Chen',
    avatar: communityImages.discussions.discussion2,
    likes: 38,
    comments: 15,
    category: 'Career'
  }
];

const events = [
  {
    id: 1,
    title: 'Study Group Meetup',
    description: 'Join us for a collaborative study session focused on mathematics.',
    date: '2024-03-25',
    time: '14:00',
    location: 'Online',
    image: communityImages.events.event1,
    attendees: 45
  },
  {
    id: 2,
    title: 'Career Workshop',
    description: 'Learn about different career paths and how to prepare for them.',
    date: '2024-03-28',
    time: '15:00',
    location: 'Online',
    image: communityImages.events.event2,
    attendees: 32
  }
];

export function CommunityPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const categories = [
    'Health Education',
    'Family Resources',
    'External Resources',
    'General Discussion',
    'Support Group'
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = getPosts();
    setPosts(allPosts);
    
    // Load comments for each post
    const commentsMap: Record<string, Comment[]> = {};
    allPosts.forEach(post => {
      commentsMap[post.id] = getComments(post.id);
    });
    setComments(commentsMap);
  };

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const post: Post = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.displayName,
      authorAvatar: user.avatar,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      commentCount: 0
    };

    addPost(post);
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: '' });
    setShowNewPostForm(false);
  };

  const handleAddComment = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment[postId]) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      authorId: user.id,
      authorName: user.displayName,
      authorAvatar: user.avatar,
      content: newComment[postId],
      createdAt: new Date().toISOString(),
      likes: 0
    };

    addComment(postId, comment);
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center">
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
            <h1 className="text-4xl font-bold mb-4">Community Hub</h1>
            <p className="text-xl mb-8">
              Connect with peers, share experiences, and grow together in our supportive community.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Discussions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-900">Active Discussions</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                        <p className="text-sm text-gray-500">Posted by {discussion.author}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{discussion.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{discussion.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{discussion.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">{discussion.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Events */}
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Upcoming Events</h2>
            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees} attendees</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Join Event <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


