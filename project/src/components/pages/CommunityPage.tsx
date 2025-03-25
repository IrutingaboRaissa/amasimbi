import { useState, useEffect } from 'react';
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
import { postService } from '@/services/api';
import { AnonymousPost } from '@/components/AnonymousPost';
import { AnonymousComment } from '@/components/AnonymousComment';
import { Post, Comment } from '@/types';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = () => {
    loadPosts();
  };

  const handleCommentCreated = async () => {
    if (selectedPost) {
      const updatedPost = await postService.getPost(selectedPost.id);
      setSelectedPost(updatedPost);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Discussions</h1>
      
      <AnonymousPost onPostCreated={handlePostCreated} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center mb-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium">{post.author.displayName}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {post.comments.length} comments
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPost && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Post Details</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.displayName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium">{selectedPost.author.displayName}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{selectedPost.title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
            </div>

            <AnonymousComment
              postId={selectedPost.id}
              onCommentCreated={handleCommentCreated}
            />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Comments</h3>
              {selectedPost.comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.displayName}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium">{comment.author.displayName}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


