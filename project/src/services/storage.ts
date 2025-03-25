import { User, Post, Comment } from '@/types';

const STORAGE_KEYS = {
  USER: 'user',
  POSTS: 'posts',
  COMMENTS: 'comments',
  ACTIVITIES: 'activities'
} as const;

// Helper function to safely access localStorage
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// User data storage
export const saveUserData = (user: User) => {
  safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUserData = (): User | null => {
  const userData = safeStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

// Posts storage
export const savePosts = (posts: Post[]) => {
  safeStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
  const posts = safeStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts) : [];
};

export const addPost = (post: Post) => {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
  return post;
};

// Comments storage
export const saveComments = (postId: string, comments: Comment[]) => {
  safeStorage.setItem(`${STORAGE_KEYS.COMMENTS}_${postId}`, JSON.stringify(comments));
};

export const getComments = (postId: string): Comment[] => {
  const comments = safeStorage.getItem(`${STORAGE_KEYS.COMMENTS}_${postId}`);
  return comments ? JSON.parse(comments) : [];
};

export const addComment = (postId: string, comment: Comment) => {
  const comments = getComments(postId);
  comments.push(comment);
  saveComments(postId, comments);
  return comment;
};

// User activity storage
export const saveUserActivity = (userId: string, activity: any) => {
  const activities = getUserActivities(userId);
  activities.unshift(activity);
  safeStorage.setItem(`${STORAGE_KEYS.ACTIVITIES}_${userId}`, JSON.stringify(activities));
};

export const getUserActivities = (userId: string): any[] => {
  const activities = safeStorage.getItem(`${STORAGE_KEYS.ACTIVITIES}_${userId}`);
  return activities ? JSON.parse(activities) : [];
}; 