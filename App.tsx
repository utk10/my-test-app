/**
 * Indigo NXT Mobile App
 * Login Screen Implementation
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/types';
import {
  LoginScreen,
  ForgotUsernameScreen,
  ForgotPasswordScreen,
  RegisterScreen,
} from './src/screens';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#2E86AB"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Sign In',
            }}
          />
          <Stack.Screen
            name="ForgotUsername"
            component={ForgotUsernameScreen}
            options={{
              title: 'Forgot Username',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: 'Forgot Password',
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Register',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
