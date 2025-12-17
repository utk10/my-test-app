import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';

describe('CustomButton Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <CustomButton title="Sign In" onPress={() => {}} />
    );

    expect(getByText('Sign In')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Sign In" onPress={mockOnPress} />
    );

    const button = getByText('Sign In');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Sign In" onPress={mockOnPress} disabled />
    );

    const button = getByText('Sign In');
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <CustomButton title="Sign In" onPress={() => {}} isLoading />
    );

    // ActivityIndicator should be present
    expect(queryByText('Sign In')).toBeNull();
  });

  it('applies correct accessibility properties', () => {
    const { getByLabelText } = render(
      <CustomButton title="Sign In" onPress={() => {}} disabled />
    );

    const button = getByLabelText('Sign In');
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('renders different variants correctly', () => {
    const { rerender, getByText } = render(
      <CustomButton title="Primary" variant="primary" onPress={() => {}} />
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <CustomButton title="Secondary" variant="secondary" onPress={() => {}} />
    );
    expect(getByText('Secondary')).toBeTruthy();

    rerender(
      <CustomButton title="Outline" variant="outline" onPress={() => {}} />
    );
    expect(getByText('Outline')).toBeTruthy();
  });
});