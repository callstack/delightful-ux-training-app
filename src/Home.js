import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SongList from './SongList';
import Player from './Player';
import songs from '../assets/topTracks.json';

export default class Home extends React.Component {
  state = {
    currentSong: songs.tracks[0],
    currentSongDuration: 10,
    songs: songs.tracks,
  };

  handleSongPress = currentSong => {
    this.setState({ currentSong });
  };

  handleSongRemove = id => {
    this.setState(({ songs }) => ({
      songs: songs.filter(item => item.track.id !== id),
    }));
  };

  handleSongfavouriteToggle = id => {
    this.setState(({ songs }) => ({
      songs: songs.map(song =>
        song.track.id === id
          ? {
              ...song,
              isFavourite: !song.isFavourite,
            }
          : song
      ),
    }));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Player
          currentSong={this.state.currentSong}
          duration={this.state.currentSongDuration}
        />
        <SongList
          onSongPress={this.handleSongPress}
          onSongRemove={this.handleSongRemove}
          onSongFavouriteToggle={this.handleSongfavouriteToggle}
          songs={this.state.songs}
          currentSong={this.state.currentSong}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21262c',
  },
});
