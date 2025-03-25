import axios from 'axios';
import { config } from '@/config';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  displayName: string;
  avatar: string;
  age: number;
  category: string;
  parent_consent: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  age: number;
  category: string;
  parent_consent: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  isAnonymous: boolean;
  anonymousId?: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  isAnonymous: boolean;
  anonymousId?: string;
  createdAt: string;
  updatedAt: string;
}

export const postService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get<{ data: { posts: Post[] } }>('/posts');
    return response.data.data.posts;
  },

  async createPost(data: { title: string; content: string; isAnonymous?: boolean }): Promise<Post> {
    const response = await api.post<{ data: { post: Post } }>('/posts', data);
    return response.data.data.post;
  },

  async updatePost(id: string, content: string): Promise<Post> {
    const response = await api.put<{ data: { post: Post } }>(`/posts/${id}`, { content });
    return response.data.data.post;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  async getPost(id: string): Promise<Post> {
    const response = await api.get<{ data: { post: Post } }>(`/posts/${id}`);
    return response.data.data.post;
  },

  async createComment(postId: string, data: { content: string; isAnonymous?: boolean }): Promise<Comment> {
    const response = await api.post<{ data: { comment: Comment } }>(`/posts/${postId}/comments`, data);
    return response.data.data.comment;
  },

  async updateComment(id: string, content: string): Promise<Comment> {
    const response = await api.put<{ data: { comment: Comment } }>(`/comments/${id}`, { content });
    return response.data.data.comment;
  },

  async deleteComment(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  }
};

export const commentService = {
  async getComments(postId: string): Promise<Comment[]> {
    const response = await api.get<Comment[]>(`/comments/post/${postId}`);
    return response.data;
  },

  async createComment(postId: string, content: string): Promise<Comment> {
    const response = await api.post<Comment>(`/comments/post/${postId}`, { content });
    return response.data;
  },

  async updateComment(id: string, content: string): Promise<Comment> {
    const response = await api.put<Comment>(`/comments/${id}`, { content });
    return response.data;
  },

  async deleteComment(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  },

  async likeComment(id: string): Promise<void> {
    await api.post(`/likes/comment/${id}`);
  },

  async unlikeComment(id: string): Promise<void> {
    await api.delete(`/likes/comment/${id}`);
  },
};

export default api; 