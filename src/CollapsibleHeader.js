import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import info from '../assets/artistInfo.json';

const CollapsibleHeader = (props = { imageOffset: 0, height: 50 }) => {
  const { height } = props;
  const { name, image } = info.artist;
  const imageSource = image[2].text;

  return (
    <Animated.View style={{ ...styles.header, height }}>
      <Text style={styles.artistName}>{name}</Text>
      <Animated.Image
        source={{ uri: imageSource }}
        style={{ ...styles.artistImage, top: props.imageOffset }}
      />
    </Animated.View>
  );
};

export default CollapsibleHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderBottomWidth: 1,
    height: 160,
  },
  artistName: {
    fontSize: 20,
    marginBottom: 10,
    height: 50,
    zIndex: 2,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    padding: 10,
    textAlign: 'center',
  },
  artistImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 1,
  },
});
