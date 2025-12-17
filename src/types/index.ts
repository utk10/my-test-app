// Type definitions for the application

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ValidationErrors {
  username?: string;
  password?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  email?: string;
}

export type RootStackParamList = {
  Login: undefined;
  ForgotUsername: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  Home: undefined;
};