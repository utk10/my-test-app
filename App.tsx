/**
 * Indigo NXT React Native App
 * Login Screen Implementation
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens';
import { COLORS } from './src/utils';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.primary}
        translucent={false}
      />
      <LoginScreen />
    </SafeAreaProvider>
  );
}

export default App;
