import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class SmallSongImage extends React.Component {
  render() {
    return <Image style={styles.image} source={{ uri: this.props.uri }} />;
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
  },
});
