import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import info from '../assets/artistInfo.json';

const CollapsibleHeader = (
  props = { imageOffset: 0, height: 50, fontSize: 20 }
) => {
  const { height } = props;
  const { name, image } = info.artist;
  const imageSource = image[2].text;

  return (
    <Animated.View style={{ ...styles.header, height }}>
      <Animated.Text
        style={[
          styles.artistName,
          {
            fontSize: props.fontSize,
          },
        ]}
      >
        {name}
      </Animated.Text>
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
    backgroundColor: '#21262c',
    overflow: 'hidden',
    height: 180,
  },
  artistName: {
    color: '#fff',
    marginBottom: 10,
    height: 50,
    zIndex: 2,
    backgroundColor: '#21262c',
    alignSelf: 'stretch',
    padding: 10,
    textAlign: 'center',
  },
  artistImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
  },
});
