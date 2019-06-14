import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import iconHeart from '../assets/icon_heart.png';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  color,
  round,
} = Animated;

function runColorAnimation(clock, from, to, duration = 1000) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(from),
    time: new Value(0),
  };

  const config = {
    toValue: to,
    duration,
    easing: Easing.linear,
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, from),
      set(state.frameTime, 0),
      set(config.toValue, to),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}

class FavIcon extends React.Component {
  state = {
    favourite: false,
  };

  clock = new Clock();
  colorValue = new Value(200);

  onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      if (this.state.favourite) {
        this.colorValue = runColorAnimation(this.clock, 0, 200);
        this.setState({ favourite: false });
      } else {
        this.colorValue = runColorAnimation(this.clock, 200, 0);
        this.setState({ favourite: true });
      }
    }
  };

  render() {
    return (
      <TapGestureHandler
        enabled={this.props.rowState !== 0}
        onHandlerStateChange={this.onTapHandlerStateChange}
        ref={this.props.handlerRef}
      >
        <Animated.Image
          source={iconHeart}
          style={[
            style.icon,
            { tintColor: color(round(this.colorValue), 200, 150) },
          ]}
        />
      </TapGestureHandler>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default FavIcon;
