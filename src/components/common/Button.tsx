import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'link';
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        if (isDisabled) baseStyle.push(styles.disabledButton);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        if (isDisabled) baseStyle.push(styles.disabledSecondaryButton);
        break;
      case 'link':
        baseStyle.push(styles.linkButton);
        break;
    }
    
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButtonText);
        if (isDisabled) baseStyle.push(styles.disabledButtonText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButtonText);
        if (isDisabled) baseStyle.push(styles.disabledSecondaryButtonText);
        break;
      case 'link':
        baseStyle.push(styles.linkButtonText);
        break;
    }
    
    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2E86AB'} size="small" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: '#2E86AB', // Indigo blue color
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2E86AB',
  },
  linkButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    minHeight: 'auto',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledSecondaryButton: {
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#2E86AB',
  },
  linkButtonText: {
    color: '#2E86AB',
    textDecorationLine: 'underline',
  },
  disabledButtonText: {
    color: '#999',
  },
  disabledSecondaryButtonText: {
    color: '#ccc',
  },
});