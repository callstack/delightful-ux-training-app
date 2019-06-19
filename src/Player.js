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

import PlayPauseButton from './PlayPauseButton';
import { PLAYER_HEIGHT } from './constants';
import { runLinearTiming } from './utils';

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

const primaryColor = '#FFF';
const contrastColor = '#F8F32B';

class Player extends React.PureComponent {
  static defaultProps = {
    currentSong: '',
    duration: 50,
  };

  playerClock = new Clock();
  playerPosition = new Value(PLAYER_HEIGHT);
  playingState = new Value(0);
  visibilityState = new Value(0);

  progressBarClock = new Clock();
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

  hidePlayer = () => {
    this.visibilityState.setValue(0);
    this.props.unsetSong();
  };

  togglePlay = () => {
    this.playingState.setValue(cond(eq(this.playingState, 0), 1, 0));
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
            transform: [{ translateY: this.playerPosition }],
          },
        ]}
      >
        <Animated.Code key={this.props.currentSong}>
          {() =>
            block([
              // showing and hiding the player
              cond(
                eq(this.visibilityState, 1),
                runLinearTiming(this.playerClock, this.playerPosition, 0),
                cond(
                  neq(this.playerPosition, 100),
                  runLinearTiming(
                    this.playerClock,
                    this.playerPosition,
                    PLAYER_HEIGHT
                  )
                )
              ),
              // progressbar animation
              cond(
                eq(this.playingState, 1),
                runLinearTiming(
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
              // animating progressbar during drag gesture
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
        <View style={styles.content}>
          <TouchableOpacity style={styles.chevron} onPress={this.hidePlayer}>
            <Ionicons name="md-arrow-dropdown" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.currentSong}</Text>
          <View style={styles.controls}>
            <PlayPauseButton
              onPress={this.togglePlay}
              isPlaying={this.playingState}
            />
          </View>
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
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#455362',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controls: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
  },
  chevron: {
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
