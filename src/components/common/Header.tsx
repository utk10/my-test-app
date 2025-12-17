import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  style?: object;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'INDIGO NXT',
  showLogo = true,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E86AB', // Indigo blue color
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
});