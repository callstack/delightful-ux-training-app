import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
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
    const index = this.state.data.findIndex(item => item.track.id === id);

    if (index != -1) {
      this.setState(({ data }) => {
        [...data.slice(0, index), ...data.slice(index + 1)];
      });
    }
  };

  onSongSelect = song => {
    this.setState({ currentSong: song });
  };

  render() {
    const { data, currentSong } = this.state;
    return (
      <View>
        <AnimatedFlatList
          data={data}
          renderItem={item => (
            <SongTile
              item={item.item}
              onSongRemove={this.onSongRemove}
              onPress={() => {
                this.props.setSong(item.item.track.album.name);
                this.onSongSelect(item.item);
              }}
            />
          )}
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
