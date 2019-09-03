import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from 'react-native';

import Login from './Login';
import ScreensToggleIcon from '../components/ScreensToggleIcon';
import SongList from '../components/SongList';
import Player from '../components/Player';
import songs from '../../assets/topTracks.json';

class Home extends React.Component {
  state = {
    currentSong: songs.tracks[0],
    currentSongDuration: 10,
    songs: songs.tracks,
    showLoginScreen: false,
  };

  handleSongPress = currentSong => {
    this.setState({ currentSong });
  };

  handleSongRemove = id => {
    this.setState(({ songs }) => ({
      songs: songs.filter(item => item.track.id !== id),
    }));
  };

  handleFavouriteToggle = id => {
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

  handleLoginScreenToggle = () => {
    this.setState(prevState => ({
      showLoginScreen: !prevState.showLoginScreen,
    }));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreensToggleIcon
            color={'#131313'}
            onPress={this.handleLoginScreenToggle}
          />
          <StatusBar barStyle={'dark-content'} />
          <Player
            currentSong={this.state.currentSong}
            duration={this.state.currentSongDuration}
          />
          <SongList
            onSongPress={this.handleSongPress}
            onSongRemove={this.handleSongRemove}
            onFavouriteToggle={this.handleFavouriteToggle}
            songs={this.state.songs}
            currentSong={this.state.currentSong}
          />
          {this.state.showLoginScreen && (
            <Login
              onLoginScreenToggle={this.handleLoginScreenToggle}
              onToggleDarkMode={this.props.onDarkThemeToggle}
              isDarkMode={this.props.isDarkMode}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
  },
});
