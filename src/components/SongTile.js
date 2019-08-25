import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import FavouriteIcon from './FavouriteIcon';
import SmallSongImage from './SmallSongImage';
import { ROW_HEIGHT } from '../utils/constants';
import { withTheme } from '../utils/theming';
import {
  runLinearTiming,
  runSpring,
  runSwipeDecay,
} from '../utils/animationHelpers';

const {
  Value,
  interpolate,
  Extrapolate,
  Clock,
  cond,
  stopClock,
  event,
  eq,
  greaterThan,
  neq,
} = Animated;

class SongTile extends React.Component {
  constructor(props) {
    super(props);

    const dragX = new Value(0);
    const dragVX = new Value(0);
    this.gestureState = new Value(-1);

    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: x => set(dragX, cond(greaterThan(x, 0), x, 0)),
          velocityX: dragVX,
          state: this.gestureState,
        },
      },
    ]);

    const clock = new Clock();

    this.height = new Value(ROW_HEIGHT);

    this.translateX = cond(
      eq(this.gestureState, State.ACTIVE),
      [stopClock(clock), dragX],
      [
        cond(
          greaterThan(dragX, 80),
          [
            runLinearTiming({
              clock,
              toValue: new Value(0),
              position: this.height,
              callback: this.handleHideEnd,
            }),
            runSwipeDecay(dragX, dragVX),
          ],
          cond(neq(dragX, 0), runSpring(clock, dragX), 0)
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

    const computedStyles = styles(this.props.theme);

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={computedStyles.container}>
          <PanGestureHandler
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onGestureEvent}
            maxPointers={1}
            minDeltaX={10}
          >
            <Animated.View
              style={[
                computedStyles.song,
                {
                  transform: [{ translateX: this.translateX }],
                  opacity: this.opacity,
                  height: this.height,
                },
              ]}
            >
              <View style={computedStyles.innerContainer}>
                <SmallSongImage uri={track.album.images[0].url} />
                <View style={computedStyles.title}>
                  <Text style={computedStyles.titleText} numberOfLines={1}>
                    {track.name}
                  </Text>
                  <Text style={computedStyles.subtitleText} numberOfLines={1}>
                    {track.album.name}
                  </Text>
                </View>
                <FavouriteIcon
                  tapEnabled={this.gestureState !== State.ACTIVE}
                  onToggle={() => this.props.onSongFavouriteToggle(track.id)}
                  checked={this.props.item.isFavourite}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withTheme(SongTile);

const styles = theme =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    song: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.backgroundColor,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      shadowColor: theme.primaryTextColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 0.2,
      elevation: 1,
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
    titleText: {
      color: theme.primaryTextColor,
    },
    subtitleText: {
      color: theme.secondaryTextColor,
    },
  });
