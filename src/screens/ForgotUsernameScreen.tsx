import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Input, Button, Header } from '../components/common';
import { authService } from '../services/authService';

type ForgotUsernameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotUsername'>;

interface ForgotUsernameScreenProps {
  navigation: ForgotUsernameScreenNavigationProp;
}

export const ForgotUsernameScreen: React.FC<ForgotUsernameScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotUsername(email);
      
      if (response.success) {
        Alert.alert(
          'Success',
          response.message,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        setError('Failed to send username. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Header />
          
          <View style={styles.content}>
            <Text style={styles.title}>Forgot Username</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send your username to you.
            </Text>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            )}

            <Input
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <Button
              title="Send Username"
              onPress={handleSubmit}
              disabled={!email.trim() || isLoading}
              loading={isLoading}
              style={styles.submitButton}
            />

            <Button
              title="Back to Sign In"
              onPress={handleBack}
              variant="link"
              style={styles.backButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
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
  submitButton: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'center',
  },
});