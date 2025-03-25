import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData, getUserData } from '@/services/storage';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, age: number) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAgeEligible: (age: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: Record<string, { user: User; password: string }> = {
  'test@example.com': {
    user: {
      id: '1',
      email: 'test@example.com',
      displayName: 'Test User',
      age: 18,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    },
    password: 'password123'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from storage on mount
    const loadUser = () => {
      try {
        const userData = getUserData();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const isAgeEligible = (age: number): boolean => {
    return age >= 12 && age <= 25;
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = mockUsers[email];
      if (!mockUser) {
        throw new Error('Account not found. Please check your email');
      }

      if (mockUser.password !== password) {
        throw new Error('Invalid password');
      }
      
      setUser(mockUser.user);
      saveUserData(mockUser.user);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string, age: number) => {
    try {
      setLoading(true);
      setError(null);

      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }
      
      if (!displayName.trim()) {
        throw new Error('Display name is required');
      }

      if (!isAgeEligible(age)) {
        throw new Error('You must be between 12 and 25 years old to register');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (mockUsers[email]) {
        throw new Error('An account with this email already exists');
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        displayName,
        age,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      mockUsers[email] = {
        user: newUser,
        password
      };

      setUser(newUser);
      saveUserData(newUser);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear local storage
      localStorage.removeItem('user');
      
      setUser(null);
      navigate('/');
    } catch (err) {
      const errorMessage = 'Failed to logout. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('No user logged in');
      }

      // Validate email if it's being updated
      if (data.email && data.email !== user.email) {
        if (mockUsers[data.email]) {
          throw new Error('An account with this email already exists');
        }
      }

      // Update user data
      const updatedUser = {
        ...user,
        ...data,
        lastActive: new Date().toISOString()
      };

      // Update context and storage
      setUser(updatedUser);
      saveUserData(updatedUser);

      // Update mock database
      if (data.email && data.email !== user.email) {
        // If email is changed, update the key in mockUsers
        mockUsers[data.email] = {
          ...mockUsers[user.email],
          user: updatedUser
        };
        delete mockUsers[user.email];
      } else {
        // Otherwise just update the user data
        mockUsers[user.email] = {
          ...mockUsers[user.email],
          user: updatedUser
        };
      }

      // Clear any existing error
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAgeEligible
      }}
    >
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