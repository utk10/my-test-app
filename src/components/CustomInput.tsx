import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomInputProps } from '../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../utils';

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  isPassword = false,
  showPasswordToggle = false,
  onTogglePassword,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...textInputProps
}) => {
  const hasError = !!error;

  const handleTogglePassword = () => {
    if (onTogglePassword) {
      onTogglePassword();
      // Announce to screen readers
      AccessibilityInfo.announceForAccessibility(
        showPasswordToggle ? 'Password hidden' : 'Password visible'
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]} accessibilityRole="text">
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, hasError && styles.inputContainerError]}>
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !showPasswordToggle}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel={label}
          accessibilityHint={error}
          accessibilityState={{ invalid: hasError }}
          {...textInputProps}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={handleTogglePassword}
            accessibilityRole="button"
            accessibilityLabel={showPasswordToggle ? 'Hide password' : 'Show password'}
            accessibilityHint="Toggles password visibility"
          >
            <Icon
              name={showPasswordToggle ? 'visibility-off' : 'visibility'}
              size={24}
              color={COLORS.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <Text
          style={[styles.errorText, errorStyle]}
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    minHeight: 48,
  },
  inputContainerError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[900],
    paddingVertical: SPACING.sm,
  },
  passwordToggle: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default CustomInput;