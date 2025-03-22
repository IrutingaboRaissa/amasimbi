import { User, Post, Comment } from '@/types';

// User data storage
export const saveUserData = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserData = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Posts storage
export const savePosts = (posts: Post[]) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
  const posts = localStorage.getItem('posts');
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
  localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
};

export const getComments = (postId: string): Comment[] => {
  const comments = localStorage.getItem(`comments_${postId}`);
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
  localStorage.setItem(`activities_${userId}`, JSON.stringify(activities));
};

export const getUserActivities = (userId: string): any[] => {
  const activities = localStorage.getItem(`activities_${userId}`);
  return activities ? JSON.parse(activities) : [];
}; 