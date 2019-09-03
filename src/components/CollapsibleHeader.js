import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NAV_BAR_HEIGHT } from '../utils/constants';

class CollapsibleHeader extends React.Component {
  render() {
    const { currentSong } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: currentSong.track.album.images[0].url,
            }}
            style={styles.image}
          />
          <Text style={styles.artistName}>
            {currentSong.track.artists[0].name}
          </Text>
        </View>
        <View style={styles.shadowContainer} />
      </View>
    );
  }
}

export default CollapsibleHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  shadowContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    bottom: 0,
    position: 'absolute',
    elevation: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  artistName: {
    color: '#131313',
    padding: 15,
    fontSize: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});
