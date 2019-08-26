import React from 'react';
import { Image, StyleSheet } from 'react-native';

const SmallSongImage = ({ uri }) => (
  <Image style={styles.image} source={{ uri }} />
);

export default SmallSongImage;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
  },
});
