import {
  validateUsername,
  validatePassword,
  validateLoginForm,
  hasValidationErrors,
  isFormValid,
} from '../src/utils/validation';
import { LoginFormData } from '../src/types';

describe('Validation Functions', () => {
  describe('validateUsername', () => {
    it('should return error for empty username', () => {
      expect(validateUsername('')).toBe('Username is required');
      expect(validateUsername('   ')).toBe('Username is required');
    });

    it('should return error for username too short', () => {
      expect(validateUsername('ab')).toBe('Username must be at least 3 characters long');
    });

    it('should return error for username too long', () => {
      const longUsername = 'a'.repeat(51);
      expect(validateUsername(longUsername)).toBe('Username must be less than 50 characters');
    });

    it('should return error for invalid characters', () => {
      expect(validateUsername('user@name')).toBe('Username can only contain letters, numbers, underscores, and hyphens');
      expect(validateUsername('user name')).toBe('Username can only contain letters, numbers, underscores, and hyphens');
      expect(validateUsername('user.name')).toBe('Username can only contain letters, numbers, underscores, and hyphens');
    });

    it('should return undefined for valid usernames', () => {
      expect(validateUsername('user123')).toBeUndefined();
      expect(validateUsername('user_name')).toBeUndefined();
      expect(validateUsername('user-name')).toBeUndefined();
      expect(validateUsername('User123')).toBeUndefined();
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Password is required');
    });

    it('should return error for password too short', () => {
      expect(validatePassword('12345')).toBe('Password must be at least 6 characters long');
    });

    it('should return error for password too long', () => {
      const longPassword = 'a'.repeat(129);
      expect(validatePassword(longPassword)).toBe('Password must be less than 128 characters');
    });

    it('should return undefined for valid passwords', () => {
      expect(validatePassword('password123')).toBeUndefined();
      expect(validatePassword('123456')).toBeUndefined();
      expect(validatePassword('P@ssw0rd!')).toBeUndefined();
    });
  });

  describe('validateLoginForm', () => {
    it('should return errors for invalid form data', () => {
      const formData: LoginFormData = {
        username: '',
        password: '123',
      };

      const errors = validateLoginForm(formData);
      expect(errors.username).toBe('Username is required');
      expect(errors.password).toBe('Password must be at least 6 characters long');
    });

    it('should return empty object for valid form data', () => {
      const formData: LoginFormData = {
        username: 'testuser',
        password: 'password123',
      };

      const errors = validateLoginForm(formData);
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });

  describe('hasValidationErrors', () => {
    it('should return true when errors exist', () => {
      const errors = { username: 'Username is required' };
      expect(hasValidationErrors(errors)).toBe(true);
    });

    it('should return false when no errors exist', () => {
      const errors = {};
      expect(hasValidationErrors(errors)).toBe(false);
    });
  });

  describe('isFormValid', () => {
    it('should return false for invalid form', () => {
      const formData: LoginFormData = {
        username: '',
        password: 'password123',
      };
      expect(isFormValid(formData)).toBe(false);
    });

    it('should return false for empty fields', () => {
      const formData: LoginFormData = {
        username: '   ',
        password: '',
      };
      expect(isFormValid(formData)).toBe(false);
    });

    it('should return true for valid form', () => {
      const formData: LoginFormData = {
        username: 'testuser',
        password: 'password123',
      };
      expect(isFormValid(formData)).toBe(true);
    });
  });
});