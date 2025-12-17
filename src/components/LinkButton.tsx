import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinkButtonProps } from '../types';
import { COLORS, FONT_SIZES, SPACING } from '../utils';

const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
    alignItems: 'center',
  },
  text: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default LinkButton;