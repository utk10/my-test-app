import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: object;
  inputStyle?: object;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor="#999"
          {...textInputProps}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    minHeight: 50,
  },
  inputContainerError: {
    borderColor: '#e74c3c',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 4,
  },
});