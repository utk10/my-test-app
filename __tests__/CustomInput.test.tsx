import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from '../src/components/CustomInput';

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('CustomInput Component', () => {
  it('renders correctly with basic props', () => {
    const { getByDisplayValue, getByText } = render(
      <CustomInput
        label="Username"
        placeholder="Enter username"
        value="testuser"
        onChangeText={() => {}}
      />
    );

    expect(getByText('Username')).toBeTruthy();
    expect(getByDisplayValue('testuser')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <CustomInput
        label="Username"
        value=""
        onChangeText={() => {}}
        error="Username is required"
      />
    );

    expect(getByText('Username is required')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <CustomInput
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
      />
    );

    const input = getByDisplayValue('');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('renders password toggle button when isPassword is true', () => {
    const mockTogglePassword = jest.fn();
    const { getByLabelText } = render(
      <CustomInput
        isPassword
        showPasswordToggle={false}
        onTogglePassword={mockTogglePassword}
        value="password"
        onChangeText={() => {}}
      />
    );

    const toggleButton = getByLabelText('Show password');
    expect(toggleButton).toBeTruthy();
  });

  it('calls onTogglePassword when password toggle is pressed', () => {
    const mockTogglePassword = jest.fn();
    const { getByLabelText } = render(
      <CustomInput
        isPassword
        showPasswordToggle={false}
        onTogglePassword={mockTogglePassword}
        value="password"
        onChangeText={() => {}}
      />
    );

    const toggleButton = getByLabelText('Show password');
    fireEvent.press(toggleButton);

    expect(mockTogglePassword).toHaveBeenCalled();
  });

  it('applies correct accessibility properties', () => {
    const { getByDisplayValue } = render(
      <CustomInput
        label="Username"
        value="testuser"
        onChangeText={() => {}}
        error="Invalid username"
      />
    );

    const input = getByDisplayValue('testuser');
    expect(input.props.accessibilityLabel).toBe('Username');
    expect(input.props.accessibilityHint).toBe('Invalid username');
    expect(input.props.accessibilityState.invalid).toBe(true);
  });
});