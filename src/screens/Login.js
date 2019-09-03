import React from 'react';
import {
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreensToggleIcon from '../components/ScreensToggleIcon';
import { withTheme } from '../utils/theming';

class Login extends React.Component {
  state = {
    loginValue: '',
    passwordValue: '',
    rememberPasswordChecked: false,
  };

  setEmail = loginValue => this.setState({ loginValue });

  setPassword = passwordValue => this.setState({ passwordValue });

  toggleSwitch = () =>
    this.setState(prevState => ({
      rememberPasswordChecked: !prevState.rememberPasswordChecked,
    }));

  render() {
    const { theme, onLoginScreenToggle } = this.props;
    const computedStyles = styles(theme);

    return (
      <View style={computedStyles.container}>
        <ScreensToggleIcon
          color={theme.primaryTextColor}
          onPress={onLoginScreenToggle}
          shouldClose
        />
        <StatusBar barStyle={'dark-content'} />
        <Text style={computedStyles.header}>Nice to see you!</Text>
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
              value={this.state.loginValue}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="e-mail"
              placeholderTextColor={theme.primaryTextColor}
            />
          </View>
          <View style={[computedStyles.row, computedStyles.inputRow]}>
            <Ionicons name="md-lock" size={26} color={theme.primaryTextColor} />
            <TextInput
              style={computedStyles.input}
              onChangeText={this.setPassword}
              value={this.state.passwordValue}
              returnKeyType="go"
              autoCapitalize="none"
              placeholder="password"
              placeholderTextColor={theme.primaryTextColor}
              secureTextEntry
            />
          </View>
          <View style={computedStyles.row}>
            <Switch
              value={this.state.rememberPasswordChecked}
              onValueChange={this.toggleSwitch}
              trackColor={{
                false: theme.secondaryBackgroundColor,
                true: theme.accentColor,
              }}
            />
            <Text style={computedStyles.toggleLabel}>Remember me</Text>
          </View>
          <View style={computedStyles.row}>
            <Switch
              value={this.props.isDarkMode}
              onValueChange={this.props.onToggleDarkMode}
              trackColor={{
                false: theme.secondaryBackgroundColor,
                true: theme.accentColor,
              }}
            />
            <Text style={computedStyles.toggleLabel}>Dark mode</Text>
          </View>
        </View>
        <TouchableHighlight style={computedStyles.button}>
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
    );
  }
}

export default withTheme(Login);

const styles = theme => {
  let themeObj = {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 999999,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: theme.backgroundColor,
      elevation: 18,
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
      color: theme.primaryTextColor,
    },
  };
  return StyleSheet.create(themeObj);
};
