import { LoginFormData, User } from '../types';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = 'https://api.indigonxt.com';

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotUsernameResponse {
  success: boolean;
  message: string;
}

class AuthService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginFormData): Promise<LoginResponse> {
    // For development/demo purposes, simulate API call with mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login for demo credentials
        if (credentials.username === 'demo' && credentials.password === 'password123') {
          resolve({
            success: true,
            user: {
              id: '1',
              username: 'demo',
              email: 'demo@indigonxt.com',
            },
            token: 'mock-jwt-token',
            message: 'Login successful',
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid username or password',
          });
        }
      }, 1500); // Simulate network delay
    });

    // Uncomment below for actual API integration
    /*
    return this.makeRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    */
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Password reset instructions have been sent to your email.',
        });
      }, 1000);
    });

    // Uncomment below for actual API integration
    /*
    return this.makeRequest<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    */
  }

  async forgotUsername(email: string): Promise<ForgotUsernameResponse> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Your username has been sent to your email.',
        });
      }, 1000);
    });

    // Uncomment below for actual API integration
    /*
    return this.makeRequest<ForgotUsernameResponse>('/auth/forgot-username', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    */
  }

  async logout(): Promise<void> {
    // Clear any stored tokens or user data
    // In a real app, you might want to call an API endpoint to invalidate the token
    return Promise.resolve();
  }
}

export const authService = new AuthService();