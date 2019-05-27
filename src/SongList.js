import React from 'react';
import { FlatList } from 'react-native';

import SongTile from './SongTile';
import songs from '../assets/topTracks.json';

const SongsList = () => {
  function keyExtractor(item) {
    return item.name;
  }

  function renderItem({ item }) {
    return <SongTile item={item} />;
  }

  return (
    <FlatList
      data={songs.toptracks.track}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default SongsList;
