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
import { withTheme } from '../utils/theming';
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

  handleSongFavouriteToggle = id => {
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

  toggleLoginScreen = () => {
    this.setState(prevState => ({
      showLoginScreen: !prevState.showLoginScreen,
    }));
  };

  render() {
    const { theme } = this.props;
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={{ flex: 1 }}>
          <ScreensToggleIcon
            color={theme.primaryTextColor}
            toggleLoginScreen={this.toggleLoginScreen}
          />
          <StatusBar
            barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
          />
          <Player
            currentSong={this.state.currentSong}
            duration={this.state.currentSongDuration}
          />
          <SongList
            onSongPress={this.handleSongPress}
            onSongRemove={this.handleSongRemove}
            onSongFavouriteToggle={this.handleSongFavouriteToggle}
            songs={this.state.songs}
            currentSong={this.state.currentSong}
          />
          <Login
            styles={{ display: this.state.showLoginScreen ? 'block' : 'none' }}
            toggleLoginScreen={this.toggleLoginScreen}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
