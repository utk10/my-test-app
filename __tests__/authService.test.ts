import authService, { AuthError } from '../src/services/authService';
import { LoginFormData } from '../src/types';

describe('AuthService', () => {
  beforeEach(() => {
    // Reset auth state
    authService.logout();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const credentials: LoginFormData = {
        username: 'admin',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.success).toBe(true);
      expect(response.user).toBeDefined();
      expect(response.user?.username).toBe('admin');
      expect(response.token).toBeDefined();
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should throw error with invalid credentials', async () => {
      const credentials: LoginFormData = {
        username: 'invalid',
        password: 'wrong',
      };

      await expect(authService.login(credentials)).rejects.toThrow(AuthError);
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should be case insensitive for username', async () => {
      const credentials: LoginFormData = {
        username: 'ADMIN',
        password: 'password123',
      };

      const response = await authService.login(credentials);
      expect(response.success).toBe(true);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      // First login
      await authService.login({
        username: 'admin',
        password: 'password123',
      });

      expect(authService.isAuthenticated()).toBe(true);

      // Then logout
      await authService.logout();
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getAuthToken()).toBeNull();
    });
  });

  describe('forgotPassword', () => {
    it('should return success for existing username', async () => {
      const response = await authService.forgotPassword('admin');
      
      expect(response.success).toBe(true);
      expect(response.message).toBe('Password reset instructions have been sent to your email');
    });

    it('should throw error for non-existing username', async () => {
      await expect(authService.forgotPassword('nonexistent')).rejects.toThrow(AuthError);
    });
  });

  describe('forgotUsername', () => {
    it('should return success for existing email', async () => {
      const response = await authService.forgotUsername('admin@indigonxt.com');
      
      expect(response.success).toBe(true);
      expect(response.message).toBe('Your username has been sent to your email address');
    });

    it('should throw error for non-existing email', async () => {
      await expect(authService.forgotUsername('nonexistent@email.com')).rejects.toThrow(AuthError);
    });

    it('should be case insensitive for email', async () => {
      const response = await authService.forgotUsername('ADMIN@INDIGONXT.COM');
      expect(response.success).toBe(true);
    });
  });

  describe('getAuthToken', () => {
    it('should return null when not authenticated', () => {
      expect(authService.getAuthToken()).toBeNull();
    });

    it('should return token when authenticated', async () => {
      await authService.login({
        username: 'admin',
        password: 'password123',
      });

      const token = authService.getAuthToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when not logged in', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true when logged in', async () => {
      await authService.login({
        username: 'admin',
        password: 'password123',
      });

      expect(authService.isAuthenticated()).toBe(true);
    });
  });
});