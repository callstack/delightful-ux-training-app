import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { NAV_BAR_HEIGHT } from './constants';

const { interpolate, Extrapolate, multiply, add } = Animated;

class CollapsibleHeader extends React.Component {
  translateY = interpolate(this.props.scrollY, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: Extrapolate.CLAMP,
  });

  fontSize = interpolate(this.props.scrollY, {
    inputRange: [0, 25],
    outputRange: [24, 20],
    extrapolate: Extrapolate.CLAMP,
  });

  titleOpacity = interpolate(this.props.scrollY, {
    inputRange: [0, 25],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  contentTranslateY = multiply(this.translateY, -1);

  imageScale = interpolate(this.props.scrollY, {
    inputRange: [0, 100],
    outputRange: [1, 0.6],
    extrapolate: Extrapolate.CLAMP,
  });

  imageTranslateY = interpolate(this.props.scrollY, {
    inputRange: [0, 100],
    outputRange: [0, -70],
    extrapolate: Extrapolate.CLAMP,
  });

  borderRadius = interpolate(this.props.scrollY, {
    inputRange: [0, 100],
    outputRange: [10, 60],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    const { currentSong } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: this.translateY,
              },
            ],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.artistName,
            {
              fontSize: this.fontSize,
              opacity: this.titleOpacity,
              transform: [
                {
                  translateY: this.contentTranslateY,
                },
              ],
            },
          ]}
        >
          {currentSong.track.artists[0].name}
        </Animated.Text>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              borderRadius: this.borderRadius,
              transform: [
                {
                  translateY: add(this.imageTranslateY, this.contentTranslateY),
                  scale: this.imageScale,
                },
              ],
            },
          ]}
        >
          <Animated.Image
            source={{
              uri: currentSong.track.album.images[0].url,
            }}
            style={styles.image}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default CollapsibleHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT,
    alignItems: 'center',
    backgroundColor: '#21262c',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
  artistName: {
    color: '#fff',
  },
  imageContainer: {
    position: 'absolute',
    top: 50,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#5c7ea8',
  },
  image: {
    width: 120,
    height: 120,
  },
});
