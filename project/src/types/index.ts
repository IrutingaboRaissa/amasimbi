export interface User {
  id: string;
  displayName: string;
  email: string;
  age: number;
  avatar?: string;
  createdAt: string;
  lastActive: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'post' | 'comment' | 'like' | 'course_complete';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
} 