import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, LoginFormData, ValidationErrors, AuthState } from '../types';
import { Input, Button, Header, LoadingSpinner } from '../components/common';
import { validateLoginForm, isFormValid } from '../utils/validation';
import { authService } from '../services/authService';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    isAuthenticated: false,
    error: null,
  });
  
  const [hasInteracted, setHasInteracted] = useState({
    username: false,
    password: false,
  });

  // Real-time validation
  useEffect(() => {
    if (hasInteracted.username || hasInteracted.password) {
      const validationErrors = validateLoginForm(formData);
      setErrors(validationErrors);
    }
  }, [formData, hasInteracted]);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasInteracted(prev => ({ ...prev, [field]: true }));
    
    // Clear auth error when user starts typing
    if (authState.error) {
      setAuthState(prev => ({ ...prev, error: null }));
    }
  };

  const handleSignIn = async () => {
    // Mark all fields as interacted for validation display
    setHasInteracted({ username: true, password: true });
    
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    
    if (!isFormValid(formData)) {
      return;
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.login(formData);
      
      if (response.success) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        }));
        
        // Navigate to home screen or show success message
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => console.log('Navigate to home screen') }
        ]);
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Login failed',
        }));
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error. Please check your connection and try again.',
      }));
    }
  };

  const handleForgotUsername = () => {
    navigation.navigate('ForgotUsername');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const isSignInDisabled = !isFormValid(formData) || authState.isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header />
          
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome to the Indigo NXT!</Text>
            <Text style={styles.welcomeSubtitle}>
              Enter your username and password to sign in to your account.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {authState.error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{authState.error}</Text>
              </View>
            )}

            <Input
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              error={hasInteracted.username ? errors.username : undefined}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
              accessibilityLabel="Username input field"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={hasInteracted.password ? errors.password : undefined}
              isPassword
              textContentType="password"
              accessibilityLabel="Password input field"
            />

            {/* Forgot Links */}
            <View style={styles.forgotLinksContainer}>
              <Button
                title="Forgot Username?"
                onPress={handleForgotUsername}
                variant="link"
                style={styles.forgotLink}
                accessibilityLabel="Forgot username link"
              />
              <Button
                title="Forgot Password?"
                onPress={handleForgotPassword}
                variant="link"
                style={styles.forgotLink}
                accessibilityLabel="Forgot password link"
              />
            </View>

            {/* Sign In Button */}
            <Button
              title="Sign In"
              onPress={handleSignIn}
              disabled={isSignInDisabled}
              loading={authState.isLoading}
              style={styles.signInButton}
              accessibilityLabel="Sign in button"
            />

            {/* Loading State */}
            {authState.isLoading && (
              <LoadingSpinner
                message="Signing you in..."
                style={styles.loadingSpinner}
              />
            )}
          </View>

          {/* Register Section */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <Button
              title="Register"
              onPress={handleRegister}
              variant="link"
              accessibilityLabel="Register for new account"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#e74c3c',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
  forgotLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  forgotLink: {
    flex: 1,
    alignItems: 'center',
  },
  signInButton: {
    marginBottom: 20,
  },
  loadingSpinner: {
    marginVertical: 10,
  },
  registerSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});