import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

import { runLinearTiming } from './utils';
import iconHeart from '../assets/icon_heart.png';

const { Clock, Value, block } = Animated;

class FavouriteIcon extends React.Component {
  clock = new Clock();
  progress = new Value(this.props.checked ? 1 : 0.2);
  animation = new Value(this.props.checked ? 1 : 0.2);
  color = block([runLinearTiming(this.clock, this.progress, this.animation)]);

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.animation.setValue(this.props.checked ? 1 : 0.2);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        enabled={this.props.tapEnabled}
        onPress={this.props.onToggle}
      >
        <Animated.View
          style={{
            opacity: this.color,
          }}
        >
          <Animated.Image source={iconHeart} style={[style.icon]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default FavouriteIcon;

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: 'white',
  },
});
