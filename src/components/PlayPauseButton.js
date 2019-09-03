import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class PlayPauseButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <View>
            <View style={[styles.control, { opacity: 0 }]}>
              <Ionicons name="md-pause" size={26} color={'#131313'} />
            </View>

            <View style={[styles.control, styles.playIcon]}>
              <Ionicons name="md-play" size={26} color={'#131313'} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PlayPauseButton;

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 23,
  },
  control: {
    position: 'absolute',
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginLeft: 2,
  },
});
