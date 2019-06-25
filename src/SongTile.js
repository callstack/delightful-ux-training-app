import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

import FavouriteIcon from './FavouriteIcon';
import SmallSongImage from './SmallSongImage';
import { ROW_HEIGHT } from './constants';

const {
  Value,
  interpolate,
  Extrapolate,
  Clock,
  timing,
  cond,
  clockRunning,
  set,
  startClock,
  stopClock,
  spring,
  decay,
  event,
  add,
  sub,
  defined,
  eq,
  greaterThan,
  call,
  and,
  neq,
} = Animated;

// Inertial slide animation - decay
function runSwipeDecay(value, velocity) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    deceleration: new Value(0.995),
  };

  const clock = new Clock();

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.deceleration, 0.99),
      startClock(clock),
    ]),
    decay(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}

// Hiding animation - going with row height to 0
function runHideTiming(clock, height, callback) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: height,
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration: new Value(300),
    easing: Easing.inOut(Easing.cubic),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, height),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock), call([state.finished], callback)]),
    state.position,
  ];
}

// Returning to the initial position animation
function runSpring(clock, position, velocity) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 50,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, position),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}

class SongTile extends React.Component {
  constructor(props) {
    super(props);

    const dragX = new Value(0);
    this.gestureState = new Value(-1);
    const dragVX = new Value(0);

    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: x => set(dragX, cond(greaterThan(x, 0), x, 0)),
          velocityX: dragVX,
          state: this.gestureState,
        },
      },
    ]);

    const transX = new Value(0);
    const prevDragX = new Value(0);

    const clock = new Clock();

    this.height = new Value(ROW_HEIGHT);
    this.handlerRef = React.createRef();

    this.translateX = cond(
      eq(this.gestureState, State.ACTIVE),
      [
        stopClock(clock),
        set(transX, add(transX, sub(dragX, prevDragX))),
        set(prevDragX, dragX),
      ],
      [
        set(prevDragX, 0),
        cond(
          greaterThan(transX, 80),
          cond(
            defined(transX),
            [
              runHideTiming(clock, this.height, this.handleHideEnd),
              runSwipeDecay(transX, dragVX),
            ],
            0
          ),
          cond(
            and(defined(transX), neq(dragX, 0)),
            runSpring(clock, transX, dragVX),
            0
          )
        ),
      ]
    );

    this.opacity = interpolate(this.height, {
      inputRange: [0, ROW_HEIGHT],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  handleHideEnd = () => {
    this.props.onSongRemove(this.props.item.track.id);
  };

  onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this.props.onPress();
    }
  };

  render() {
    const {
      item: { track },
    } = this.props;

    return (
      <TapGestureHandler
        enabled={this.gestureState !== State.ACTIVE}
        onHandlerStateChange={this.onTapHandlerStateChange}
        waitFor={this.handlerRef}
      >
        <Animated.View style={{ opacity: this.opacity, height: this.height }}>
          <PanGestureHandler
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onGestureEvent}
            maxPointers={1}
            minDeltaX={10}
          >
            <Animated.View
              style={[
                styles.song,
                {
                  transform: [{ translateX: this.translateX }],
                },
              ]}
            >
              <View style={styles.innerContainer}>
                <SmallSongImage uri={track.album.images[0].url} />
                <View style={styles.title}>
                  <Text style={styles.text} numberOfLines={1}>
                    {track.name}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    {track.album.name}
                  </Text>
                </View>
                <FavouriteIcon
                  tapEnabled={this.gestureState !== State.ACTIVE}
                  onToggle={() => this.props.onSongFavouriteToggle(track.id)}
                  checked={this.props.item.isFavourite}
                  handlerRef={this.handlerRef}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  song: {
    flex: 1,
    width: '100%',
    backgroundColor: '#21262c',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.2,
    elevation: 1,
    marginBottom: 3,
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
  },
});

export default SongTile;
