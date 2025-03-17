import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, Users, Filter, Search, Plus, Send, MoreVertical, Flag, Bookmark } from 'lucide-react';
import community from '@/assets/images/community.png';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  category: string;
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah 🌸',
        avatar: '🌸'
      },
      content: 'Just attended my first AMASIMBI workshop and it was amazing! The support and guidance were incredible. Thank you to everyone who made it possible!',
      likes: 24,
      comments: [
        {
          id: 'c1',
          author: {
            name: 'Emma 🌷',
            avatar: '🌷'
          },
          content: 'I was there too! The workshop was so informative and the community support was amazing.',
          timestamp: '1 hour ago',
          likes: 5
        }
      ],
      timestamp: '2 hours ago',
      category: 'Workshop'
    },
    {
      id: '2',
      author: {
        name: 'Maria 🌺',
        avatar: '🌺'
      },
      content: 'Looking for study buddies for the upcoming exam. Anyone interested in forming a study group?',
      likes: 15,
      comments: [
        {
          id: 'c2',
          author: {
            name: 'Lisa 🌹',
            avatar: '🌹'
          },
          content: 'I would love to join! What subject are you studying?',
          timestamp: '30 minutes ago',
          likes: 2
        }
      ],
      timestamp: '5 hours ago',
      category: 'Study Group'
    },
    {
      id: '3',
      author: {
        name: 'Emma 🌷',
        avatar: '🌷'
      },
      content: 'Sharing my success story: After joining AMASIMBI, I found the confidence to pursue my dreams. The mentorship program is truly life-changing!',
      likes: 42,
      comments: [
        {
          id: 'c3',
          author: {
            name: 'Sophie 🌻',
            avatar: '🌻'
          },
          content: 'This is so inspiring! Thank you for sharing your journey.',
          timestamp: '2 hours ago',
          likes: 8
        }
      ],
      timestamp: '1 day ago',
      category: 'Success Story'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: {
        name: 'You 🌸',
        avatar: '🌸'
      },
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    setNewComment('');
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You 🌸',
        avatar: '🌸'
      },
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      category: 'General'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <img
            src={community}
            alt="community"
            className="w-16 h-16 text-purple-600 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Our Community</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with other young women, share experiences, and grow together in a safe and supportive environment.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 sticky top-8">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">Categories</h2>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="Workshop">Workshops</TabsTrigger>
                  <TabsTrigger value="Study Group">Study Groups</TabsTrigger>
                  <TabsTrigger value="Success Story">Success Stories</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-purple-100">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost(e.target.value)}
                className="mb-4 min-h-[100px] border-purple-200 focus:ring-purple-300"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700">
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700">
                    Add Category
                  </Button>
                </div>
                <Button onClick={handleCreatePost} className="bg-purple-600 hover:bg-purple-700">
                  Post
                </Button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{post.author.avatar}</span>
                      <div>
                        <h3 className="font-semibold text-purple-900">{post.author.name}</h3>
                        <p className="text-sm text-purple-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="text-purple-500 hover:text-purple-700">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-purple-500 mb-4">
                    <button 
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                      onClick={() => handleLikePost(post.id)}
                    >
                      <Heart size={18} />
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                      onClick={() => setSelectedPost(post)}
                    >
                      <MessageCircle size={18} />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-purple-100 pt-4">
                    <div className="space-y-4 mb-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <span className="text-xl">{comment.author.avatar}</span>
                          <div className="flex-1">
                            <div className="bg-purple-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-purple-900">{comment.author.name}</span>
                                <span className="text-sm text-purple-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-gray-700">{comment.content}</p>
                              <div className="flex items-center gap-4 mt-2 text-purple-500">
                                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                                  <Heart size={16} />
                                  <span className="text-sm">{comment.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                                  <Flag size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
                        className="flex-1 border-purple-200 focus:ring-purple-300"
                      />
                      <Button 
                        onClick={() => handleAddComment(post.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;


