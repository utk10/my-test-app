import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderProps } from '../types';
import { COLORS, FONT_SIZES, SPACING } from '../utils';

const Header: React.FC<HeaderProps> = ({
  title = 'INDIGO NXT',
  showLogo = true,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
  style,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <Text
            style={[styles.logoText, { color: textColor }]}
            accessibilityRole="text"
            accessibilityLabel="Indigo NXT Logo"
          >
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
});

export default Header;