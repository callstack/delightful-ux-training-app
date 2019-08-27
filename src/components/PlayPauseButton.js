import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { runLinearTiming } from '../utils/animationHelpers';
import { withTheme } from '../utils/theming';

const { Clock, block, concat, interpolate } = Animated;

class PlayPauseButton extends React.Component {
  clock = new Clock();
  pauseOpacity = block([
    runLinearTiming({ clock: this.clock, toValue: this.props.isPlaying }),
  ]);

  playOpacity = interpolate(this.pauseOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  rotation = interpolate(this.pauseOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  render() {
    const computedStyles = styles(this.props.theme);
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={computedStyles.container}>
          <Animated.View
            style={{
              transform: [
                {
                  rotateY: concat(this.rotation, 'deg'),
                },
              ],
            }}
          >
            <Animated.View
              style={[
                computedStyles.control,
                {
                  opacity: this.pauseOpacity,
                },
              ]}
            >
              <Ionicons
                name="md-pause"
                size={26}
                color={this.props.theme.primaryTextColor}
              />
            </Animated.View>

            <Animated.View
              style={[
                computedStyles.control,
                computedStyles.playIcon,
                {
                  opacity: this.playOpacity,
                },
              ]}
            >
              <Ionicons
                name="md-play"
                size={26}
                color={this.props.theme.primaryTextColor}
              />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withTheme(PlayPauseButton);

const styles = theme => {
  let themeObj = {
    container: {
      width: 46,
      height: 46,
      borderColor: theme.secondaryTextColor,
      borderWidth: 1,
      borderRadius: 23,
    },
    control: {
      position: 'absolute',
      width: 46,
      height: 46,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      marginLeft: 2,
    },
  };
  return StyleSheet.create(themeObj);
};
