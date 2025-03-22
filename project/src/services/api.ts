import axios from 'axios';
import { config } from '@/config';

const api = axios.create({
  baseURL: config.api.url,
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
  content: string;
  author: User;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const postService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  async createPost(content: string, image?: string): Promise<Post> {
    const response = await api.post<Post>('/posts', { content, image });
    return response.data;
  },

  async updatePost(id: string, content: string): Promise<Post> {
    const response = await api.put<Post>(`/posts/${id}`, { content });
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  async likePost(id: string): Promise<void> {
    await api.post(`/likes/post/${id}`);
  },

  async unlikePost(id: string): Promise<void> {
    await api.delete(`/likes/post/${id}`);
  },
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