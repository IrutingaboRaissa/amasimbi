import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/services/api';
import type { User, AuthResponse } from '@/services/api';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAgeEligible: (age: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token and user data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      api.get<{ data: { user: User } }>('/auth/me')
        .then(response => {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // If token is invalid, clear it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      const { user, token } = response.data;
      
      // Store the token
      localStorage.setItem('token', token);
      
      // Set user data and authentication state
      setUser(user);
      setIsAuthenticated(true);

      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      // Call logout endpoint if it exists
      api.post('/auth/logout').catch(() => {
        // Ignore error if endpoint doesn't exist
      });

      // Clear stored token
      localStorage.removeItem('token');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);

      toast.success('Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAgeEligible = (age: number) => {
    return age >= 12 && age <= 25;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, isAgeEligible }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 