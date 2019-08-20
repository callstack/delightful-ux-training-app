import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import { withTheme } from './theming';

const { interpolate, Extrapolate } = Animated;

class HeaderTitle extends React.Component {
  titleOpacity = interpolate(this.props.scrollY, {
    inputRange: [50, 100],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    const { currentSong } = this.props;
    const computedStyles = styles(this.props.theme);

    return (
      <Animated.View
        style={[
          computedStyles.container,
          {
            opacity: this.titleOpacity,
          },
        ]}
      >
        <Text style={computedStyles.text}>
          {currentSong.track.artists[0].name}
        </Text>
      </Animated.View>
    );
  }
}

export default withTheme(HeaderTitle);

const styles = theme =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: theme.secondaryBackgroundColor,
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.secondaryBackgroundColor,
      elevation: 5,
    },
    text: {
      color: theme.primaryTextColor,
      fontSize: 15,
    },
  });
