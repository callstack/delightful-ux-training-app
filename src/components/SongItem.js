import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import FavouriteIcon from './FavouriteIcon';
import SmallSongImage from './SmallSongImage';
import { ROW_HEIGHT } from '../utils/constants';
import {
  runSpring,
  runLinearTiming,
  runSwipeDecay,
} from '../utils/animationHelpers';

const {
  event,
  Value,
  Clock,
  cond,
  eq,
  stopClock,
  interpolate,
  Extrapolate,
  greaterThan,
} = Animated;

class SongItem extends React.Component {
  constructor(props) {
    super(props);

    const dragX = new Value(0);
    const dragVelocityX = new Value(0);

    const springClock = new Clock();
    const clock = new Clock();
    const swipeClock = new Clock();

    this.gestureState = new Value(State.UNDETERMINED);

    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: dragX,
          velocityX: dragVelocityX,
          state: this.gestureState,
        },
      },
    ]);

    this.height = new Value(ROW_HEIGHT);

    this.translateX = cond(
      eq(this.gestureState, State.ACTIVE),
      [stopClock(clock), stopClock(swipeClock), stopClock(springClock), dragX],
      [
        cond(
          greaterThan(dragX, 80),
          [
            runLinearTiming({
              clock,
              toValue: new Value(0),
              position: this.height,
            }),
            runSwipeDecay(swipeClock, dragX, dragVelocityX),
          ],
          runSpring(springClock, dragX)
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

  handlePress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const {
      item: { track },
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <PanGestureHandler
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onGestureEvent}
            maxPointers={1}
            activeOffsetX={10}
          >
            <Animated.View
              style={[
                styles.song,
                {
                  transform: [{ translateX: this.translateX }],
                  opacity: this.opacity,
                  height: this.height,
                },
              ]}
            >
              <View style={styles.innerContainer}>
                <SmallSongImage uri={track.album.images[0].url} />
                <View style={styles.title}>
                  <Text style={styles.titleText} numberOfLines={1}>
                    {track.name}
                  </Text>
                  <Text style={styles.subtitleText} numberOfLines={1}>
                    {track.album.name}
                  </Text>
                </View>
                <FavouriteIcon
                  onToggle={() => this.props.onSongFavouriteToggle(track.id)}
                  checked={this.props.item.isFavourite}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SongItem;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  song: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
  },
  innerContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleText: {
    color: '#131313',
  },
  subtitleText: {
    color: '#333',
  },
});
