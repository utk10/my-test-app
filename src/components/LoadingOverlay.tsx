import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import { LoadingOverlayProps } from '../types';
import { COLORS, FONT_SIZES, SPACING } from '../utils';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      accessibilityViewIsModal
    >
      <View style={[styles.overlay, { backgroundColor }]}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text
            style={styles.message}
            accessibilityRole="text"
            accessibilityLiveRegion="polite"
          >
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.base,
    color: COLORS.gray[700],
    textAlign: 'center',
  },
});

export default LoadingOverlay;