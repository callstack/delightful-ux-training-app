import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

import { runLinearTiming } from './utils';
import { withTheme } from './theming';
import iconHeart from '../assets/icon_heart.png';

const { Clock, Value } = Animated;

class FavouriteIcon extends React.Component {
  clock = new Clock();
  toValue = new Value(this.props.checked ? 1 : 0.2);
  opacity = runLinearTiming(
    this.clock,
    this.toValue,
    new Value(this.props.checked ? 1 : 0.2)
  );

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.toValue.setValue(this.props.checked ? 1 : 0.2);
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
            opacity: this.opacity,
          }}
        >
          <Animated.Image
            source={iconHeart}
            style={[style.icon, { tintColor: this.props.theme.accentColor }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withTheme(FavouriteIcon);

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    // tintColor: 'white',
  },
});
