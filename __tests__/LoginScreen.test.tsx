import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../src/screens/LoginScreen';

// Mock dependencies
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('../src/services/authService', () => ({
  login: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('LoginScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required elements', () => {
    const { getByText, getByLabelText } = render(<LoginScreen />);

    // Header
    expect(getByText('INDIGO NXT')).toBeTruthy();
    
    // Welcome messages
    expect(getByText('Welcome to the Indigo NXT!')).toBeTruthy();
    expect(getByText('Enter your username and password to sign in to your account.')).toBeTruthy();
    
    // Form elements
    expect(getByLabelText('Username input field')).toBeTruthy();
    expect(getByLabelText('Password input field')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    
    // Links
    expect(getByText('Forgot Username?')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('updates form data when inputs change', () => {
    const { getByLabelText } = render(<LoginScreen />);

    const usernameInput = getByLabelText('Username input field');
    const passwordInput = getByLabelText('Password input field');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('shows validation errors for invalid inputs', async () => {
    const { getByLabelText, getByText, queryByText } = render(<LoginScreen />);

    const usernameInput = getByLabelText('Username input field');
    const passwordInput = getByLabelText('Password input field');

    // Trigger validation by interacting with inputs
    fireEvent.changeText(usernameInput, 'ab'); // Too short
    fireEvent.changeText(passwordInput, '123'); // Too short

    await waitFor(() => {
      expect(queryByText('Username must be at least 3 characters long')).toBeTruthy();
      expect(queryByText('Password must be at least 6 characters long')).toBeTruthy();
    });
  });

  it('enables sign in button when form is valid', () => {
    const { getByLabelText, getByText } = render(<LoginScreen />);

    const usernameInput = getByLabelText('Username input field');
    const passwordInput = getByLabelText('Password input field');
    const signInButton = getByText('Sign In');

    // Initially disabled
    expect(signInButton.props.accessibilityState.disabled).toBe(true);

    // Fill valid data
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    // Should be enabled now
    expect(signInButton.props.accessibilityState.disabled).toBe(false);
  });

  it('toggles password visibility', () => {
    const { getByLabelText } = render(<LoginScreen />);

    const passwordInput = getByLabelText('Password input field');
    const toggleButton = getByLabelText('Show password');

    // Initially hidden
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Toggle to show
    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(false);

    // Toggle to hide
    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('handles forgot username link press', () => {
    const { getByText } = render(<LoginScreen />);

    const forgotUsernameLink = getByText('Forgot Username?');
    fireEvent.press(forgotUsernameLink);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Forgot Username',
      'Please contact support or use the forgot username feature.',
      [{ text: 'OK' }]
    );
  });

  it('handles forgot password link press', () => {
    const { getByText } = render(<LoginScreen />);

    const forgotPasswordLink = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordLink);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Forgot Password',
      'Please contact support or use the forgot password feature.',
      [{ text: 'OK' }]
    );
  });

  it('handles register link press', () => {
    const { getByText } = render(<LoginScreen />);

    const registerLink = getByText('Register');
    fireEvent.press(registerLink);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Register',
      'Registration feature coming soon!',
      [{ text: 'OK' }]
    );
  });
});