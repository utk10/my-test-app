import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/common/Button';

describe('Button Component', () => {
  it('should render correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should show loading indicator when loading is true', () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={() => {}} loading />
    );
    
    // ActivityIndicator should be present
    expect(() => getByTestId('activity-indicator')).not.toThrow();
  });

  it('should not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button title="Test Button" onPress={mockOnPress} loading />
    );
    
    const button = getByRole('button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should render different variants correctly', () => {
    const { getByText: getPrimaryText } = render(
      <Button title="Primary" onPress={() => {}} variant="primary" />
    );
    
    const { getByText: getSecondaryText } = render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />
    );
    
    const { getByText: getLinkText } = render(
      <Button title="Link" onPress={() => {}} variant="link" />
    );
    
    expect(getPrimaryText('Primary')).toBeTruthy();
    expect(getSecondaryText('Secondary')).toBeTruthy();
    expect(getLinkText('Link')).toBeTruthy();
  });

  it('should have proper accessibility properties', () => {
    const { getByRole } = render(
      <Button title="Test Button" onPress={() => {}} accessibilityLabel="Custom Label" />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Custom Label');
  });

  it('should have disabled accessibility state when disabled', () => {
    const { getByRole } = render(
      <Button title="Test Button" onPress={() => {}} disabled />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});