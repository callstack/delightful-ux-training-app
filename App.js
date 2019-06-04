import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SongList from './src/SongList';
import Player from './src/Player';

export default class App extends React.Component {
  state = {
    currentSong: '',
    currentSongDuration: 10,
  };

  setSong = title => {
    this.setState({ currentSong: title });
  };

  unsetSong = () => {
    this.setState({ currentSong: '' });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Player
          currentSong={this.state.currentSong}
          duration={this.state.currentSongDuration}
          unsetSong={this.unsetSong}
        />
        <SongList setSong={this.setSong} />
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
