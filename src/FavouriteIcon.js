import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

import { runTiming } from './utils';
import iconHeart from '../assets/icon_heart.png';

const { Clock, Value, color, round } = Animated;

class FavIcon extends React.Component {
  state = {
    favourite: false,
  };

  clock = new Clock();
  colorValue = new Value(200);

  recolor = () => {
    if (this.state.favourite) {
      this.colorValue = runTiming(this.clock, 0, 200);
      this.setState({ favourite: false });
    } else {
      this.colorValue = runTiming(this.clock, 200, 0);
      this.setState({ favourite: true });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.recolor}>
        <Animated.Image
          source={iconHeart}
          style={[
            style.icon,
            { tintColor: color(round(this.colorValue), 200, 150) },
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});

export default FavIcon;
