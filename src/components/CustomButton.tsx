import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { CustomButtonProps } from '../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../utils';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  containerStyle,
  textStyle,
  onPress,
  ...touchableProps
}) => {
  const isDisabled = disabled || isLoading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: isDisabled ? COLORS.gray[300] : COLORS.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: isDisabled ? COLORS.gray[100] : COLORS.gray[200],
          borderWidth: 1,
          borderColor: isDisabled ? COLORS.gray[300] : COLORS.gray[400],
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDisabled ? COLORS.gray[300] : COLORS.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...styles[`buttonText${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: isDisabled ? COLORS.gray[500] : COLORS.white,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: isDisabled ? COLORS.gray[400] : COLORS.gray[700],
        };
      case 'outline':
        return {
          ...baseStyle,
          color: isDisabled ? COLORS.gray[400] : COLORS.primary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), containerStyle]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
      accessibilityHint={isLoading ? 'Loading' : undefined}
      {...touchableProps}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
  },
  buttonSmall: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 36,
  },
  buttonMedium: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 48,
  },
  buttonLarge: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    minHeight: 56,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: FONT_SIZES.sm,
  },
  buttonTextMedium: {
    fontSize: FONT_SIZES.base,
  },
  buttonTextLarge: {
    fontSize: FONT_SIZES.lg,
  },
});

export default CustomButton;