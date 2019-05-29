import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

import FavouriteIcon from './FavouriteIcon';
import SmallSongImage from './SmallSongImage';
import { ROW_HEIGHT } from './constants';

const { Value, interpolate, Extrapolate, Clock, timing } = Animated;

class SongTile extends React.Component {
  swipeX = new Value(0);
  opacity = new Value(1);
  clock = new Clock();
  height = new Value(ROW_HEIGHT);

  heightAnim = timing(this.height, {
    duration: 500,
    toValue: 0,
    easing: Easing.inOut(Easing.ease),
  });

  offsetX = interpolate(this.swipeX, {
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  processSwipe = Animated.event([
    {
      nativeEvent: {
        translationX: this.swipeX,
      },
    },
  ]);

  opacity = interpolate(this.height, {
    inputRange: [0, ROW_HEIGHT],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  removeTile = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && nativeEvent.translationX > 30) {
      this.heightAnim.start(() => {
        this.props.onSongRemove(this.props.item.track.id);
      });
    }
  };

  render() {
    const {
      item: { track },
      onPress,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={{ opacity: this.opacity, height: this.height }}>
          <PanGestureHandler
            onGestureEvent={this.processSwipe}
            onHandlerStateChange={this.removeTile}
            minOffsetX={10}
          >
            <Animated.View
              style={[
                styles.song,
                {
                  transform: [{ translateX: this.offsetX }],
                },
              ]}
            >
              <View style={styles.innerContainer}>
                <SmallSongImage uri={track.album.images[0].url} />
                <View>
                  <Text style={styles.text} numberOfLines={1}>
                    {track.name}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    {track.album.name}
                  </Text>
                </View>
              </View>
              <FavouriteIcon />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TouchableOpacity>
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
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

export default SongTile;
