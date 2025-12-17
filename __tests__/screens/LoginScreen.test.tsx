import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../../src/screens/LoginScreen';
import { authService } from '../../src/services/authService';

// Mock the navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock the auth service
jest.mock('../../src/services/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all required elements', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    // Check header and welcome messages
    expect(getByText('INDIGO NXT')).toBeTruthy();
    expect(getByText('Welcome to the Indigo NXT!')).toBeTruthy();
    expect(getByText('Enter your username and password to sign in to your account.')).toBeTruthy();

    // Check form elements
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Forgot Username?')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('should disable sign in button when fields are empty', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const signInButton = getByText('Sign In');
    expect(signInButton.props.accessibilityState.disabled).toBe(true);
  });

  it('should enable sign in button when valid data is entered', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    await waitFor(() => {
      const signInButton = getByText('Sign In');
      expect(signInButton.props.accessibilityState.disabled).toBe(false);
    });
  });

  it('should show validation errors for invalid input', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');

    // Enter invalid data
    fireEvent.changeText(usernameInput, 'ab'); // Too short
    fireEvent.changeText(passwordInput, '123'); // Too short

    await waitFor(() => {
      expect(getByText('Username must be at least 3 characters long')).toBeTruthy();
      expect(getByText('Password must be at least 8 characters long')).toBeTruthy();
    });
  });

  it('should call authService.login when sign in is pressed', async () => {
    mockedAuthService.login.mockResolvedValue({
      success: true,
      user: { id: '1', username: 'testuser' },
      token: 'mock-token',
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockedAuthService.login).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('should show error message for failed login', async () => {
    mockedAuthService.login.mockResolvedValue({
      success: false,
      message: 'Invalid credentials',
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('should navigate to forgot username screen', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    fireEvent.press(getByText('Forgot Username?'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ForgotUsername');
  });

  it('should navigate to forgot password screen', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    fireEvent.press(getByText('Forgot Password?'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('should navigate to register screen', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    fireEvent.press(getByText('Register'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });

  it('should show loading state during authentication', async () => {
    // Mock a delayed response
    mockedAuthService.login.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    // Should show loading state
    expect(getByText('Signing you in...')).toBeTruthy();
  });
});