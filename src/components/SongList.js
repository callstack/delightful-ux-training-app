import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CollapsibleHeader from './CollapsibleHeader';
// import HeaderTitle from './HeaderTitle';
import SongItem from './SongItem';
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from '../utils/constants';

const SongList = ({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onFavouriteToggle,
}) => {
  const renderRow = item => {
    return (
      <SongItem
        item={item.item}
        onSongRemove={onSongRemove}
        onSongFavouriteToggle={onFavouriteToggle}
        onPress={onSongPress}
      />
    );
  };

  return (
    <React.Fragment>
      <CollapsibleHeader currentSong={currentSong} />
      <FlatList
        data={songs}
        renderItem={renderRow}
        keyExtractor={item => item.track.id}
        bounces={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* We will need it later */}
      {/* <HeaderTitle currentSong={currentSong} /> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT,
  },
});

export default SongList;
