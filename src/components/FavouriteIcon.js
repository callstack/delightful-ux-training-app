import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
import iconHeart from '../../assets/icon_heart.png';

class FavouriteIcon extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        enabled={this.props.tapEnabled}
        onPress={this.props.onToggle}
      >
        <View
          style={{
            opacity: this.props.checked ? 1 : 0.2,
          }}
        >
          <Image source={iconHeart} style={style.icon} />
        </View>
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
    tintColor: '#3903fc',
  },
});
