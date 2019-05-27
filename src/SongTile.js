import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FavouriteIcon from './FavouriteIcon';

const SongTile = props => (
  <View style={styles.song}>
    <FavouriteIcon />
    <Text>{props.item.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  song: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginBottom: 3,
  },
});

export default SongTile;
