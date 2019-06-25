import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

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
  event,
  add,
  sub,
  multiply,
  divide,
  max,
  min,
} = Animated;

const primaryColor = '#FFF';
const contrastColor = '#F8F32B';

class Player extends React.PureComponent {
  static defaultProps = {
    currentSong: '',
    duration: 50,
  };

  playerClock = new Clock();
  playingState = new Value(0);

  progressBarClock = new Clock();
  progressBarPosition = new Value(0);
  progressBarInitialPosition = new Value(0);
  maxProgressBarPosition = new Value(
    (Dimensions.get('window').width || 27) - 27
  ); // paddings + indicator size / 2

  dragX = new Value(0);
  state = new Value(-1);
  prevDragX = new Value(0);

  componentDidUpdate(prevProps) {
    if (this.props.currentSong !== prevProps.currentSong) {
      this.playingState.setValue(0);
      this.progressBarPosition.setValue(0);
    }
  }

  togglePlay = () => {
    this.playingState.setValue(cond(eq(this.playingState, 0), 1, 0));
  };

  render() {
    this._onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
          state: this.state,
        },
      },
    ]);

    return (
      <View style={styles.container}>
        <Animated.Code key={this.props.currentSong}>
          {() =>
            block([
              // progressbar animation
              cond(
                eq(this.playingState, 1),
                runLinearTiming(
                  this.progressBarClock,
                  this.progressBarPosition,
                  this.maxProgressBarPosition,
                  multiply(
                    divide(
                      sub(
                        this.maxProgressBarPosition,
                        this.progressBarInitialPosition
                      ),
                      this.maxProgressBarPosition
                    ),
                    this.props.duration * 1000
                  )
                ),
                [
                  stopClock(this.progressBarClock),
                  set(
                    this.progressBarInitialPosition,
                    this.progressBarPosition
                  ),
                ]
              ),
              // animating progressbar during drag gesture
              cond(
                eq(this.state, State.ACTIVE),
                [
                  set(
                    this.progressBarPosition,
                    min(
                      this.maxProgressBarPosition,
                      max(
                        0,
                        add(
                          this.progressBarPosition,
                          sub(this.dragX, this.prevDragX)
                        )
                      )
                    )
                  ),
                  set(this.prevDragX, this.dragX),
                  set(this.playingState, 0),
                  set(
                    this.progressBarInitialPosition,
                    this.progressBarPosition
                  ),
                ],
                set(this.prevDragX, 0)
              ),
            ])
          }
        </Animated.Code>
        <View style={styles.content}>
          <Text style={styles.title}>
            {this.props.currentSong.track.album.name}
          </Text>
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
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            />
          </PanGestureHandler>
        </View>
      </View>
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
