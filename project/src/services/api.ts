import axios from 'axios';
import { User } from '@/types/user';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  displayName: string;
  age?: number;
  category?: string;
  parent_consent?: boolean;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

// API instance configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
        const { token } = response.data.data;
        
        // Store the new token
        localStorage.setItem('token', token);
        
        // Update authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Post and Comment interfaces
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

// Post service
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
  }
};

// Comment service
export const commentService = {
  async getComments(postId: string): Promise<Comment[]> {
    const response = await api.get<Comment[]>(`/comments/post/${postId}`);
    return response.data;
  },

  async createComment(postId: string, content: string, isAnonymous?: boolean): Promise<Comment> {
    const response = await api.post<Comment>(`/comments/post/${postId}`, { content, isAnonymous });
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
  }
};

export default api; 