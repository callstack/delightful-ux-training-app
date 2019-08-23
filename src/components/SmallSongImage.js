import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class SmallSongImage extends React.Component {
  render() {
    const { style, uri } = this.props;

    return <Image style={[styles.image, style]} source={{ uri: uri }} />;
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
