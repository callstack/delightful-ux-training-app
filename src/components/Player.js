import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import PlayPauseButton from './PlayPauseButton';
import { PLAYER_HEIGHT } from '../utils/constants';
import { runLinearTiming } from '../utils/animationHelpers';
import { withTheme } from '../utils/theming';

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

    const cumputedStyles = styles(this.props.theme);

    return (
      <View style={cumputedStyles.container}>
        <Animated.Code key={this.props.currentSong}>
          {() =>
            block([
              // progressbar animation
              cond(
                eq(this.playingState, 1),
                runLinearTiming({
                  clock: this.progressBarClock,
                  toValue: this.maxProgressBarPosition,
                  position: this.progressBarPosition,
                  duration: multiply(
                    divide(
                      sub(
                        this.maxProgressBarPosition,
                        this.progressBarInitialPosition
                      ),
                      this.maxProgressBarPosition
                    ),
                    this.props.duration * 1000
                  ),
                }),
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
        <View style={cumputedStyles.content}>
          <View style={cumputedStyles.textContainer}>
            <Text style={cumputedStyles.title}>
              {this.props.currentSong.track.name}
            </Text>
            <Text style={cumputedStyles.subTitle}>
              {this.props.currentSong.track.album.name}
            </Text>
          </View>
          <View style={cumputedStyles.controls}>
            <PlayPauseButton
              onPress={this.togglePlay}
              isPlaying={this.playingState}
            />
          </View>
        </View>
        <View style={[cumputedStyles.progressBar]}>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onGestureEvent}
          >
            <Animated.View
              style={[
                cumputedStyles.progressIndicator,
                {
                  transform: [{ translateX: this.progressBarPosition }],
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

export default withTheme(Player);

const styles = theme =>
  StyleSheet.create({
    container: {
      height: PLAYER_HEIGHT,
      alignItems: 'stretch',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      paddingHorizontal: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 16,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: theme.secondaryBackgroundColor,
    },
    content: {
      flexDirection: 'row',
      flex: 1,
      alignContent: 'center',
      alignItems: 'stretch',
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      paddingVertical: 10,
      justifyContent: 'center',
    },
    subTitle: {
      color: theme.secondaryTextColor,
      fontSize: 14,
    },
    title: {
      color: theme.primaryTextColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
    progressBar: {
      alignSelf: 'stretch',
      height: 3,
      marginBottom: 15,
      backgroundColor: theme.primaryTextColor,
    },
    progressIndicator: {
      top: -4,
      height: 10,
      width: 10,
      left: 0,
      position: 'relative',
      borderRadius: 5,
      backgroundColor: theme.accentColor,
    },
  });
