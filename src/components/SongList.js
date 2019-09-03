import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import HeaderTitle from './HeaderTitle';
import SongItem from './SongItem';
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from '../utils/constants';

const { Value, event } = Animated;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SongList = ({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onFavouriteToggle,
}) => {
  const scrollY = new Value(0);

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
      <CollapsibleHeader scrollY={scrollY} currentSong={currentSong} />
      <AnimatedFlatList
        data={songs}
        renderItem={renderRow}
        keyExtractor={item => item.track.id}
        bounces={false}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContainer}
      />

      {/* We need it here because it should be above the list */}
      <HeaderTitle scrollY={scrollY} currentSong={currentSong} />
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
