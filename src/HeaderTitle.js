import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const { interpolate, Extrapolate } = Animated;

class HeaderTitle extends React.Component {
  titleOpacity = interpolate(this.props.scrollY, {
    inputRange: [50, 100],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    const { currentSong } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.titleOpacity,
          },
        ]}
      >
        <Text style={styles.text}>{currentSong.track.artists[0].name}</Text>
      </Animated.View>
    );
  }
}

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#21262c',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#383e46',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
