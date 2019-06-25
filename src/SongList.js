import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import SongTile from './SongTile';
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from './constants';

const { Value, event } = Animated;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function SongList({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onSongFavouriteToggle,
}) {
  const scrollY = new Value(0);

  const renderRow = item => {
    return (
      <SongTile
        item={item.item}
        onSongRemove={onSongRemove}
        onSongFavouriteToggle={onSongFavouriteToggle}
        onPress={() => {
          onSongPress(item.item);
        }}
      />
    );
  };

  return (
    <View>
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
      <CollapsibleHeader scrollY={scrollY} currentSong={currentSong} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT,
  },
});

export default SongList;
