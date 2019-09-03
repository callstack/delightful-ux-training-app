import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class HeaderTitle extends React.Component {
  render() {
    const { currentSong } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{currentSong.track.artists[0].name}</Text>
      </View>
    );
  }
}

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f9ff',
    elevation: 5,
  },
  text: {
    color: '#131313',
    fontSize: 15,
  },
});
