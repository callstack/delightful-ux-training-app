import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SongList from '../components/SongList';
import Player from '../components/Player';
import { withTheme } from '../utils/theming';
import songs from '../../assets/topTracks.json';

class Login extends React.Component {
  state = {
    loginValue: '',
    passwordValue: '',
    rememberPasswordchecked: false,
  };

  setEmail = loginValue => this.setState({ loginValue });

  setPassword = passwordValue => this.setState({ passwordValue });

  toggleSwitch = () =>
    this.setState(prevState => ({
      rememberPasswordchecked: !prevState.rememberPasswordchecked,
    }));

  render() {
    const { theme } = this.props;
    const computedStyles = styles(theme);

    return (
      <SafeAreaView style={computedStyles.outerContainer}>
        <View style={computedStyles.container}>
          <StatusBar
            barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
          />
          <Text
            style={computedStyles.header}
            accessible={true}
            accessibilityLabel="Nice to see you!"
            accessibilityRole="text"
          >
            Nice to see you!
          </Text>
          <View style={computedStyles.inputGroup}>
            <View style={[computedStyles.row, computedStyles.inputRow]}>
              <Ionicons
                name="md-person"
                size={26}
                color={theme.primaryTextColor}
              />
              <TextInput
                style={computedStyles.input}
                onChangeText={this.setEmail}
                onFocus={this.activateEmail}
                value={this.state.loginValue}
                placeholder="e-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={theme.secondaryTextColor}
                accessible={true}
                accessibilityLabel="e-mail"
                accessibilityHint="Input for your account e-mail address"
              />
            </View>
            <View style={[computedStyles.row, computedStyles.inputRow]}>
              <Ionicons
                name="md-lock"
                size={26}
                color={theme.primaryTextColor}
              />
              <TextInput
                style={computedStyles.input}
                onChangeText={this.setPassword}
                onFocus={this.activatePassword}
                value={this.state.passwordValue}
                secureTextEntry
                returnKeyType="go"
                placeholder="password"
                autoCapitalize="none"
                placeholderTextColor={theme.secondaryTextColor}
                accessible={true}
                accessibilityLabel="password"
                accessibilityHint="Input for your account password"
              />
            </View>
            <View style={computedStyles.row}>
              <Switch
                value={this.state.rememberPasswordchecked}
                onValueChange={this.toggleSwitch}
                onTouchStart={this.activateSwitch}
                trackColor={{
                  false: theme.secondaryBackgroundColor,
                  true: theme.accentColor,
                }}
                accessible={true}
                accessibilityLabel="Remember me"
                accessibilityHint="Toggle to remember e-mail and password"
              />
              <Text
                style={computedStyles.toggleLabel}
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
              >
                Remember me
              </Text>
            </View>
          </View>
          <TouchableHighlight
            style={computedStyles.button}
            accessible={true}
            accessibilityLabel="Login"
            accessibilityHint="Press to login"
            accessibilityRole="button"
          >
            <View style={computedStyles.row}>
              <Text style={computedStyles.buttonText}>Login</Text>
              <Ionicons
                name="md-arrow-forward"
                size={16}
                color={theme.backgroundColor}
              />
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(Login);

const styles = theme =>
  StyleSheet.create({
    outerContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.primaryTextColor,
    },
    inputGroup: {
      alignItems: 'stretch',
      width: '100%',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    inputRow: {
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryTextColor,
      justifyContent: 'space-between',
    },
    input: {
      height: 40,
      flex: 0.9,
      fontSize: 16,
      color: theme.primaryTextColor,
      paddingVertical: 10,
    },
    button: {
      backgroundColor: theme.accentColor,
      borderRadius: 25,
      padding: 5,
    },
    buttonText: {
      color: theme.backgroundColor,
      fontSize: 16,
      textTransform: 'uppercase',
      marginRight: 10,
    },
    toggleLabel: {
      marginLeft: 10,
    },
  });
