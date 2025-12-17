import { LoginFormData, LoginResponse, AuthError } from '../types';

// Mock API delay to simulate network request
const API_DELAY = 1500;

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    email: 'admin@indigonxt.com',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: '2',
    username: 'testuser',
    password: 'test123',
    email: 'test@indigonxt.com',
    firstName: 'Test',
    lastName: 'User',
  },
];

class AuthService {
  private static instance: AuthService;
  private authToken: string | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginFormData): Promise<LoginResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const { username, password } = credentials;

    // Find user in mock database
    const user = MOCK_USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new AuthError('INVALID_CREDENTIALS', 'Invalid username or password');
    }

    // Generate mock token
    this.authToken = `mock_token_${user.id}_${Date.now()}`;

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: this.authToken,
      message: 'Login successful',
    };
  }

  public async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    this.authToken = null;
  }

  public async forgotPassword(username: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      throw new AuthError('USER_NOT_FOUND', 'Username not found');
    }

    return {
      success: true,
      message: 'Password reset instructions have been sent to your email',
    };
  }

  public async forgotUsername(email: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      u => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      throw new AuthError('EMAIL_NOT_FOUND', 'Email address not found');
    }

    return {
      success: true,
      message: 'Your username has been sent to your email address',
    };
  }

  public getAuthToken(): string | null {
    return this.authToken;
  }

  public isAuthenticated(): boolean {
    return this.authToken !== null;
  }
}

// Custom error class for authentication errors
class AuthError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }
}

export { AuthService, AuthError };
export default AuthService.getInstance();