/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock dependencies
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('../src/services/authService', () => ({
  login: jest.fn(),
}));

test('renders correctly', () => {
  const { getByText } = render(<App />);
  
  // Check if the main elements are rendered
  expect(getByText('INDIGO NXT')).toBeTruthy();
  expect(getByText('Welcome to the Indigo NXT!')).toBeTruthy();
  expect(getByText('Sign In')).toBeTruthy();
});
