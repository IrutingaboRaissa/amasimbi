import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  age: number;
  category: string;
  parent_consent: boolean;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    // Load tokens from localStorage on initialization
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, refreshToken, user } = response.data;
      this.setTokens(token, refreshToken);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  public async register(data: RegisterData): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      const { token, refreshToken, user } = response.data;
      this.setTokens(token, refreshToken);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  public async refreshAccessToken(): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken: this.refreshToken,
      });
      const { token } = response.data;
      this.setTokens(token, this.refreshToken!);
      return token;
    } catch (error) {
      this.logout();
      throw new Error('Failed to refresh token');
    }
  }

  public logout(): void {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  public getToken(): string | null {
    return this.token;
  }

  private setTokens(token: string, refreshToken: string): void {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = AuthService.getInstance(); 