import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { runLinearTiming } from './utils';

const { Clock, Value, block, concat, interpolate } = Animated;

export default class PlayPauseButton extends React.Component {
  clock = new Clock();
  progress = new Value(0);
  pauseOpacity = block([
    runLinearTiming(this.clock, this.progress, this.props.isPlaying),
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
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
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
                styles.control,
                {
                  opacity: this.pauseOpacity,
                },
              ]}
            >
              <Ionicons name="md-pause" size={26} color="white" />
            </Animated.View>

            <Animated.View
              style={[
                styles.control,
                styles.playIcon,
                {
                  opacity: this.playOpacity,
                },
              ]}
            >
              <Ionicons name="md-play" size={26} color="white" />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderColor: '#d9dae2',
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
});
