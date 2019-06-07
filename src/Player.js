import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { runTiming } from './utils';
import { PLAYER_HEIGHT } from './constants';

const {
  Clock,
  Value,
  stopClock,
  cond,
  set,
  block,
  eq,
  neq,
  event,
  add,
  sub,
} = Animated;

const backgroundColor = '#21262c';
const primaryColor = '#FFF';
const contrastColor = '#F8F32B';

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

  dragX = new Value(0);
  state = new Value(-1);
  prevDragX = new Value(0);

  componentDidUpdate(prevProps) {
    if (this.props.currentSong !== prevProps.currentSong) {
      this.playingState.setValue(0);
      this.progressBarPosition.setValue(0);
      this.visibilityState.setValue(this.props.currentSong ? 1 : 0);
    }
  }

  showPlayer = () => {
    this.visibilityState.setValue(1);
  };

  hidePlayer = () => {
    this.props.unsetSong();
  };

  play = () => {
    this.playingState.setValue(1);
  };

  pause = () => {
    this.playingState.setValue(0);
  };

  render() {
    this._onGestureEvent = event([
      { nativeEvent: { translationX: this.dragX, state: this.state } },
    ]);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor,
            transform: [{ translateY: this.playerPosition }],
          },
        ]}
      >
        <Animated.Code key={this.props.currentSong}>
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
              cond(
                eq(this.state, State.ACTIVE),
                [
                  set(
                    this.progressBarPosition,
                    add(
                      this.progressBarPosition,
                      sub(this.dragX, this.prevDragX)
                    )
                  ),
                  set(this.prevDragX, this.dragX),
                  set(this.playingState, 0),
                ],
                set(this.prevDragX, 0)
              ),
            ])
          }
        </Animated.Code>
        <Text style={{ color: primaryColor }}>{this.props.currentSong}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.pause}>
            <Ionicons name="md-pause" size={32} color={contrastColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.play}>
            <Ionicons name="md-play" size={32} color={contrastColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.hidePlayer}>
            <Ionicons name="md-square" size={32} color={contrastColor} />
          </TouchableOpacity>
        </View>
        <View style={[styles.progressBar, { backgroundColor: primaryColor }]}>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onGestureEvent}
          >
            <Animated.View
              style={[
                styles.progressIndicator,
                {
                  transform: [{ translateX: this.progressBarPosition }],
                  backgroundColor: contrastColor,
                },
              ]}
            />
          </PanGestureHandler>
        </View>
      </Animated.View>
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    height: PLAYER_HEIGHT,
    justifyContent: 'center',
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
    height: 20,
    width: 20,
    left: 0,
    position: 'relative',
    borderRadius: 5,
  },
});
