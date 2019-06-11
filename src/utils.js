import Animated, { Easing } from 'react-native-reanimated';
const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  color,
  round,
  not,
  eq,
} = Animated;

export function runTiming(clock, value, dest, duration = 1000) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(clock), // set the current value of clock
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(0),
    easing: Easing.linear,
  };

  const timeSyncedWithClock = new Value(0); // flag to track if we need to sync

  return block([
    cond(
      clockRunning(clock),
      // condition to sync the state.time with clock on first invocation
      cond(eq(timeSyncedWithClock, 0), [
        set(state.time, clock),
        set(timeSyncedWithClock, 1), // set flag to not update this value second time
      ]),
      [
        set(timeSyncedWithClock, 0), // reset the flag
        set(state.finished, 0),
        set(state.time, clock), //set the current value of clock
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position),
    state.position,
  ]);
}
