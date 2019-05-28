import React from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import SongTile from './SongTile';
import songs from '../assets/topTracks.json';

const { interpolate, Extrapolate } = Animated;

class SongsList extends React.Component {
  state = {
    data: songs.tracks,
  };

  scrollY = new Animated.Value(0);

  headerImageOffset = interpolate(this.scrollY, {
    inputRange: [0, 100],
    outputRange: [50, -70],
    extrapolate: Extrapolate.CLAMP,
  });

  headerHeight = interpolate(this.scrollY, {
    inputRange: [0, 100],
    outputRange: [180, 51],
    extrapolate: Extrapolate.CLAMP,
  });

  fontSize = interpolate(this.scrollY, {
    inputRange: [0, 100],
    outputRange: [20, 16],
    extrapolate: Extrapolate.CLAMP,
  });

  processScroll = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: this.scrollY,
        },
      },
    },
  ]);

  onSongRemove = id => {
    const index = this.state.data.findIndex(item => item.track.id === id);

    if (index != -1) {
      this.setState(({ data }) => {
        [...data.slice(0, index), ...data.slice(index + 1)];
      });
    }
  };

  render() {
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    return (
      <Animated.View>
        <AnimatedFlatList
          data={this.state.data}
          renderItem={item => (
            <SongTile item={item.item} onSongRemove={this.onSongRemove} />
          )}
          keyExtractor={item => item.track.id}
          ListHeaderComponent={
            <CollapsibleHeader
              imageOffset={this.headerImageOffset}
              height={this.headerHeight}
              fontSize={this.fontSize}
            />
          }
          stickyHeaderIndices={[0]}
          onScroll={this.processScroll}
          scrollEventThrottle={16}
        />
      </Animated.View>
    );
  }
}

export default SongsList;
