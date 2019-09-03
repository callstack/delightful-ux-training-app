import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import FavouriteIcon from './FavouriteIcon';
import SmallSongImage from './SmallSongImage';
import { ROW_HEIGHT } from '../utils/constants';

class SongItem extends React.Component {
  handleHideEnd = () => {
    this.props.onSongRemove(this.props.item.track.id);
  };

  handlePress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const {
      item: { track },
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.song}>
            <View style={styles.innerContainer}>
              <SmallSongImage uri={track.album.images[0].url} />
              <View style={styles.title}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {track.name}
                </Text>
                <Text style={styles.subtitleText} numberOfLines={1}>
                  {track.album.name}
                </Text>
              </View>
              <FavouriteIcon
                onToggle={() => this.props.onSongFavouriteToggle(track.id)}
                checked={this.props.item.isFavourite}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SongItem;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: ROW_HEIGHT,
  },
  song: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
  },
  innerContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleText: {
    color: '#131313',
  },
  subtitleText: {
    color: '#333',
  },
});
