import Animated, { Easing } from 'react-native-reanimated';
const {
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  block,
  SpringUtils,
  spring,
  decay,
} = Animated;

export function runLinearTiming({
  clock,
  toValue,
  position = new Value(0),
  duration = 200,
}) {
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

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ]);
}

export function runSwipeDecay(clock, value, velocity) {
  const state = {
    finished: new Value(0),
    velocity: velocity,
    position: value,
    time: new Value(0),
  };

  const config = {
    deceleration: new Value(0.99),
  };

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

export function runSpring(clock, position) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = SpringUtils.makeDefaultConfig();

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, position),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}
