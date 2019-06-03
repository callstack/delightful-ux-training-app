import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
//import { withTheme } from '@callstack/react-theme-provider';

import { runTiming } from './utils';

const { Clock, Value, stopClock, cond, set, block, eq, neq } = Animated;

class Player extends React.PureComponent {
  static defaultProps = {
    currentSong: '',
    duration: 50,
  };

  playerClock = new Clock();
  visibilityState = new Value(0);
  playingState = new Value(0);
  progressBarClock = new Clock();
  playerPosition = new Value(100);
  progressBarPosition = new Value(0);
  maxProgressBarPosition = (Dimensions.get('window').width || 27) - 27; // paddings + indicator size / 2

  componentDidUpdate(prevProps) {
    if (this.props.currentSong !== prevProps.currentSong) {
      this.playingState.setValue(0);
      this.progressBarPosition.setValue(0);
      this.visibilityState.setValue(1);
    }
  }

  showPlayer = () => {
    this.visibilityState.setValue(1);
  };

  hidePlayer = () => {
    this.playingState.setValue(0);
    this.progressBarPosition.setValue(0);
    this.visibilityState.setValue(0);
  };

  play = () => {
    this.playingState.setValue(1);
  };

  pause = () => {
    this.playingState.setValue(0);
  };

  render() {
    const backgroundColor = '#21262c',
      primaryColor = '#FFF',
      contrastColor = '#F8F32B';

    return this.props.currentSong ? (
      <Animated.View
        style={[
          style.container,
          {
            backgroundColor,
            transform: [{ translateY: this.playerPosition }],
          },
        ]}
      >
        <Animated.Code>
          {() =>
            block([
              cond(
                eq(this.visibilityState, 1),
                runTiming(this.playerClock, this.playerPosition, 0, 300),
                cond(
                  neq(this.playerPosition, 100),
                  runTiming(this.playerClock, this.playerPosition, 100, 300)
                )
              ),
              cond(
                eq(this.playingState, 1),
                runTiming(
                  this.progressBarClock,
                  this.progressBarPosition,
                  this.maxProgressBarPosition,
                  this.props.duration * 1000
                ),
                stopClock(this.progressBarClock)
              ),
              cond(
                eq(this.progressBarPosition, this.maxProgressBarPosition),
                set(this.progressBarPosition, 0)
              ),
            ])
          }
        </Animated.Code>
        <Text style={{ color: primaryColor }}>{this.props.currentSong}</Text>
        <View style={style.controls}>
          <TouchableOpacity style={style.control} onPress={this.pause}>
            <Ionicons name="md-pause" size={32} color={contrastColor} />
          </TouchableOpacity>
          <TouchableOpacity style={style.control} onPress={this.play}>
            <Ionicons name="md-play" size={32} color={contrastColor} />
          </TouchableOpacity>
          <TouchableOpacity style={style.control} onPress={this.hidePlayer}>
            <Ionicons name="md-square" size={32} color={contrastColor} />
          </TouchableOpacity>
        </View>
        <View style={[style.progressBar, { backgroundColor: primaryColor }]}>
          <Animated.View
            style={[
              style.progressIndicator,
              {
                transform: [{ translateX: this.progressBarPosition }],
                backgroundColor: contrastColor,
              },
            ]}
          />
        </View>
      </Animated.View>
    ) : null;
  }
}

export default Player;

const style = StyleSheet.create({
  container: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    borderTopWidth: 1,
    borderColor: '#999',
    padding: 10,
  },
  controls: {
    flexDirection: 'row',
  },
  control: {
    margin: 10,
  },
  progressBar: {
    alignSelf: 'stretch',
    height: 3,
    backgroundColor: 'red',
    marginBottom: 15,
  },
  progressIndicator: {
    top: -4,
    height: 10,
    width: 10,
    left: 0,
    position: 'relative',
    borderRadius: 5,
  },
});
