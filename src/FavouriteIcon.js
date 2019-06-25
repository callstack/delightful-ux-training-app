import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { runLinearTiming } from './utils';
import iconHeart from '../assets/icon_heart.png';

const { Clock, Value, block } = Animated;

class FavouriteIcon extends React.Component {
  clock = new Clock();
  progress = new Value(this.props.checked ? 1 : 0.2);
  animation = new Value(this.props.checked ? 1 : 0.2);
  color = block([runLinearTiming(this.clock, this.progress, this.animation)]);

  onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      // this.animation.setValue(this.props.checked ? 0.2 : 1);
      this.props.onToggle();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.animation.setValue(this.props.checked ? 1 : 0.2);
    }
  }

  render() {
    return (
      <TapGestureHandler
        enabled={this.props.tapEnabled}
        onHandlerStateChange={this.onTapHandlerStateChange}
        ref={this.props.handlerRef}
      >
        <Animated.View
          style={{
            opacity: this.color,
          }}
        >
          <Animated.Image source={iconHeart} style={[style.icon]} />
        </Animated.View>
      </TapGestureHandler>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: 'white',
  },
});

export default FavouriteIcon;
