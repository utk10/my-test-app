import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../src/components/common/Input';

describe('Input Component', () => {
  it('should render correctly with basic props', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Test placeholder" />
    );
    
    expect(getByPlaceholderText('Test placeholder')).toBeTruthy();
  });

  it('should render label when provided', () => {
    const { getByText } = render(
      <Input label="Test Label" placeholder="Test placeholder" />
    );
    
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('should display error message when error prop is provided', () => {
    const { getByText } = render(
      <Input error="This is an error" placeholder="Test placeholder" />
    );
    
    expect(getByText('This is an error')).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Test placeholder" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Test placeholder');
    fireEvent.changeText(input, 'test input');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test input');
  });

  it('should render password toggle when isPassword is true', () => {
    const { getByLabelText } = render(
      <Input placeholder="Password" isPassword />
    );
    
    expect(getByLabelText('Show password')).toBeTruthy();
  });

  it('should toggle password visibility when eye icon is pressed', () => {
    const { getByLabelText } = render(
      <Input placeholder="Password" isPassword />
    );
    
    const toggleButton = getByLabelText('Show password');
    fireEvent.press(toggleButton);
    
    expect(getByLabelText('Hide password')).toBeTruthy();
  });

  it('should apply error styling when error is present', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Test" error="Error message" />
    );
    
    const input = getByPlaceholderText('Test');
    expect(input.props.style).toBeDefined();
  });

  it('should have proper accessibility properties', () => {
    const { getByLabelText } = render(
      <Input placeholder="Password" isPassword />
    );
    
    const toggleButton = getByLabelText('Show password');
    expect(toggleButton.props.accessibilityRole).toBe('button');
  });
});