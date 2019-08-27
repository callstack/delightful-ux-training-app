import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ScreensToggleIcon = ({
  color,
  toggleLoginScreen,
  shouldClose = false,
}) => (
  <Ionicons
    name={shouldClose ? 'md-close' : 'md-settings'}
    size={26}
    color={color}
    style={{ position: 'absolute', top: 0, right: 20, zIndex: 999 }}
    onPress={toggleLoginScreen}
  />
);

export default ScreensToggleIcon;
