import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SongList from './src/SongList';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SongList />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
