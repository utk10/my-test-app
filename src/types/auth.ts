export interface LoginFormData {
  username: string;
  password: string;
}

export interface ValidationErrors {
  username?: string;
  password?: string;
  general?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface AuthError {
  code: string;
  message: string;
}