import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import SongTile from './SongTile';
import songs from '../assets/topTracks.json';
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from './constants';

const { Value, event } = Animated;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SongsList extends React.Component {
  state = {
    data: songs.tracks,
    currentSong: songs.tracks[0],
  };

  scrollY = new Value(0);

  onSongRemove = id => {
    this.setState(({ data }) => ({
      data: data.filter(item => item.track.id !== id),
    }));
  };

  onSongSelect = song => {
    this.setState({ currentSong: song });
  };

  renderRow = item => {
    return (
      <SongTile
        item={item.item}
        onSongRemove={this.onSongRemove}
        onPress={() => {
          this.props.setSong(item.item.track.album.name);
          this.onSongSelect(item.item);
        }}
      />
    );
  };

  render() {
    const { data, currentSong } = this.state;
    return (
      <View>
        <AnimatedFlatList
          data={data}
          renderItem={this.renderRow}
          keyExtractor={item => item.track.id}
          bounces={false}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.scrollY,
                },
              },
            },
          ])}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContainer}
        />
        <CollapsibleHeader scrollY={this.scrollY} currentSong={currentSong} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT,
  },
});

export default SongsList;
