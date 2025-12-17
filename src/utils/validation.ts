import { ValidationErrors, LoginFormData } from '../types';

export const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 50) {
    return 'Username must be less than 50 characters';
  }
  // Allow alphanumeric characters, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, underscores, and hyphens';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (password.length > 128) {
    return 'Password must be less than 128 characters';
  }
  return undefined;
};

export const validateLoginForm = (formData: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const usernameError = validateUsername(formData.username);
  if (usernameError) {
    errors.username = usernameError;
  }
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

export const isFormValid = (formData: LoginFormData): boolean => {
  const errors = validateLoginForm(formData);
  return !hasValidationErrors(errors) && formData.username.trim() !== '' && formData.password !== '';
};