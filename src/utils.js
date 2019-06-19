import Animated, { Easing } from 'react-native-reanimated';
const {
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
} = Animated;

export function runLinearTiming(clock, position, toValue, duration = 200) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: position,
    time: new Value(0),
  };

  const config = {
    toValue,
    duration,
    easing: Easing.linear,
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, position),
      set(state.frameTime, 0),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}
