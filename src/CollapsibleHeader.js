import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { NAV_BAR_HEIGHT } from './constants';

import info from '../assets/artistInfo.json';

const { interpolate, Extrapolate, multiply } = Animated;

class CollapsibleHeader extends React.Component {
  translateY = interpolate(this.props.scrollY, {
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: Extrapolate.CLAMP,
  });

  fontSize = interpolate(this.props.scrollY, {
    inputRange: [0, 80],
    outputRange: [24, 16],
    extrapolate: Extrapolate.CLAMP,
  });

  contentTranslateY = multiply(this.translateY, -1);

  imageScale = interpolate(this.props.scrollY, {
    inputRange: [0, 80],
    outputRange: [1, 0.6],
    extrapolate: Extrapolate.CLAMP,
  });

  imageTranslateY = interpolate(this.props.scrollY, {
    inputRange: [0, 80],
    outputRange: [0, -40],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
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
              transform: [
                {
                  translateY: this.contentTranslateY,
                },
              ],
            },
          ]}
        >
          {info.artist.name}
        </Animated.Text>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                {
                  translateY: this.imageTranslateY,
                },
              ],
            },
          ]}
        >
          <Animated.Image
            source={{
              uri:
                'https://i.scdn.co/image/b92d960031392953214e14700f5af195a910751c',
            }}
            style={[
              styles.image,
              {
                transform: [
                  {
                    translateY: this.contentTranslateY,
                    scale: this.imageScale,
                  },
                ],
              },
            ]}
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
