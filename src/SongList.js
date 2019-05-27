import React from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import SongTile from './SongTile';
import songs from '../assets/topTracks.json';

const { interpolate, Extrapolate } = Animated;

class SongsList extends React.Component {
  scrollY = new Animated.Value(0);

  headerImageOffset = interpolate(this.scrollY, {
    inputRange: [0, 100],
    outputRange: [50, -70],
    extrapolate: Extrapolate.CLAMP,
  });

  headerHeight = interpolate(this.scrollY, {
    inputRange: [0, 100],
    outputRange: [160, 51],
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

  render() {
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    return (
      <Animated.View>
        <AnimatedFlatList
          data={songs.toptracks.track}
          renderItem={item => <SongTile item={item.item} />}
          keyExtractor={item => item.mbid + item.playcount}
          ListHeaderComponent={
            <CollapsibleHeader
              imageOffset={this.headerImageOffset}
              height={this.headerHeight}
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
