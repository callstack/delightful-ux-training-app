import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScreensToggleIcon = ({ color, onPress, shouldClose = false }) => (
  <Ionicons
    name={shouldClose ? 'md-close' : 'md-settings'}
    size={26}
    color={color}
    style={styles.icon}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 999,
  },
});

export default ScreensToggleIcon;
