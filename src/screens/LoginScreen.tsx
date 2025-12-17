import React, { useState, useCallback, useEffect } from 'react';
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
import {
  CustomInput,
  CustomButton,
  Header,
  LoadingOverlay,
  LinkButton,
} from '../components';
import { LoginFormData, ValidationErrors } from '../types';
import { validateLoginForm, isFormValid, COLORS, SPACING, FONT_SIZES } from '../utils';
import authService from '../services/authService';

const { height: screenHeight } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasInteracted(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    // Mark all fields as interacted for validation
    setHasInteracted({ username: true, password: true });
    
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authService.login(formData);
      
      if (response.success) {
        Alert.alert(
          'Login Successful',
          `Welcome back, ${response.user?.firstName || response.user?.username}!`,
          [{ text: 'OK' }]
        );
        // Here you would typically navigate to the main app screen
        // navigation.navigate('MainApp');
      }
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.code === 'INVALID_CREDENTIALS') {
        errorMessage = 'Invalid username or password. Please check your credentials and try again.';
      }
      
      setErrors({ general: errorMessage });
      
      Alert.alert('Login Failed', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleForgotUsername = useCallback(() => {
    Alert.alert(
      'Forgot Username',
      'Please contact support or use the forgot username feature.',
      [{ text: 'OK' }]
    );
    // Here you would navigate to forgot username screen
    // navigation.navigate('ForgotUsername');
  }, []);

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      'Forgot Password',
      'Please contact support or use the forgot password feature.',
      [{ text: 'OK' }]
    );
    // Here you would navigate to forgot password screen
    // navigation.navigate('ForgotPassword');
  }, []);

  const handleRegister = useCallback(() => {
    Alert.alert(
      'Register',
      'Registration feature coming soon!',
      [{ text: 'OK' }]
    );
    // Here you would navigate to registration screen
    // navigation.navigate('Register');
  }, []);

  const isFormValidForSubmission = isFormValid(formData);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header />

          {/* Main Content */}
          <View style={styles.content}>
            {/* Welcome Message */}
            <View style={styles.welcomeSection}>
              <Text
                style={styles.welcomeTitle}
                accessibilityRole="header"
                accessibilityLevel={1}
              >
                Welcome to the Indigo NXT!
              </Text>
              <Text
                style={styles.welcomeSubtitle}
                accessibilityRole="text"
              >
                Enter your username and password to sign in to your account.
              </Text>
            </View>

            {/* General Error Message */}
            {errors.general && (
              <View style={styles.errorContainer}>
                <Text
                  style={styles.generalError}
                  accessibilityRole="text"
                  accessibilityLiveRegion="polite"
                >
                  {errors.general}
                </Text>
              </View>
            )}

            {/* Login Form */}
            <View style={styles.form}>
              <CustomInput
                label="Username"
                placeholder="Enter your username"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                error={hasInteracted.username ? errors.username : undefined}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                returnKeyType="next"
                accessibilityLabel="Username input field"
              />

              <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                error={hasInteracted.password ? errors.password : undefined}
                isPassword
                showPasswordToggle={showPassword}
                onTogglePassword={handleTogglePassword}
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={isFormValidForSubmission ? handleLogin : undefined}
                accessibilityLabel="Password input field"
              />

              {/* Forgot Links */}
              <View style={styles.forgotLinksContainer}>
                <LinkButton
                  title="Forgot Username?"
                  onPress={handleForgotUsername}
                  style={styles.forgotLink}
                />
                <LinkButton
                  title="Forgot Password?"
                  onPress={handleForgotPassword}
                  style={styles.forgotLink}
                />
              </View>

              {/* Sign In Button */}
              <CustomButton
                title="Sign In"
                onPress={handleLogin}
                disabled={!isFormValidForSubmission}
                isLoading={isLoading}
                containerStyle={styles.signInButton}
              />

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <LinkButton
                  title="Register"
                  onPress={handleRegister}
                  textStyle={styles.registerLink}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
      <LoadingOverlay
        visible={isLoading}
        message="Signing you in..."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    minHeight: screenHeight * 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  welcomeTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.gray[900],
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  welcomeSubtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.error + '10',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  generalError: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  forgotLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  forgotLink: {
    flex: 1,
  },
  signInButton: {
    marginBottom: SPACING.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  registerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
  registerLink: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

export default LoginScreen;