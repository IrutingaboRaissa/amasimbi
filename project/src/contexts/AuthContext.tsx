import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-hot-toast';
import { User, UserUpdateData } from '@/types/user';
import { authService } from '@/services/auth.service';

interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, age?: number) => Promise<void>;
  logout: () => void;
  isAgeEligible: (age: number) => boolean;
  updateUser: (data: UserUpdateData) => Promise<void>;
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
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token and get user data
      api.get<AuthResponse>('/auth/me')
        .then(response => {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Auth check error:', error.response?.data);
          // If token is invalid, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          delete api.defaults.headers.common['Authorization'];
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
      const response = await authService.login(email, password);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success(response.message || 'Successfully logged in!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string, age?: number) => {
    try {
      setLoading(true);
      const response = await authService.register({
        email,
        password,
        displayName,
        age,
        category: 'student'
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success(response.message || 'Registration successful!');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Successfully logged out!');
  };

  const isAgeEligible = (age: number) => {
    return age >= 12 && age <= 100;
  };

  const updateUser = async (data: UserUpdateData) => {
    try {
      setLoading(true);
      const response = await api.put<AuthResponse>('/users/profile', data);
      setUser(response.data.data.user);
      toast.success(response.data.message || 'Profile updated successfully!');
    } catch (error: any) {
      console.error('Profile update error:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      isAgeEligible,
      updateUser
    }}>
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