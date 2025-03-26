import { api } from './api';
import type { AuthResponse, RegisterData } from './api';

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    // Load tokens from localStorage on initialization
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');

    // Set initial Authorization header if token exists
    if (this.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      const { token, refreshToken } = response.data.data;
      this.setTokens(token, refreshToken);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data);
      throw new Error(error.response?.data?.errors?.credentials || error.response?.data?.message || 'Login failed');
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      const { token, refreshToken } = response.data.data;
      this.setTokens(token, refreshToken);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data);
      throw new Error(error.response?.data?.errors?.email || error.response?.data?.message || 'Registration failed');
    }
  }

  public async refreshAccessToken(): Promise<string> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken: this.refreshToken,
      });
      const { token } = response.data.data;
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
    delete api.defaults.headers.common['Authorization'];
  }

  public getToken(): string | null {
    return this.token;
  }

  private setTokens(token: string, refreshToken: string): void {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = AuthService.getInstance(); 