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
    const { onLoginScreenToggle } = this.props;
    return (
      <View style={styles.container}>
        <ScreensToggleIcon
          color={'#131313'}
          onPress={onLoginScreenToggle}
          shouldClose
        />
        <StatusBar barStyle={'dark-content'} />
        <Text style={styles.header}>Nice to see you!</Text>
        <View style={styles.inputGroup}>
          <View style={[styles.row, styles.inputRow]}>
            <Ionicons name="md-person" size={26} color={'#131313'} />
            <TextInput
              style={styles.input}
              onChangeText={this.setEmail}
              value={this.state.loginValue}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="e-mail"
              placeholderTextColor={'#131313'}
            />
          </View>
          <View style={[styles.row, styles.inputRow]}>
            <Ionicons name="md-lock" size={26} color={'#131313'} />
            <TextInput
              style={styles.input}
              onChangeText={this.setPassword}
              value={this.state.passwordValue}
              returnKeyType="go"
              autoCapitalize="none"
              placeholder="password"
              placeholderTextColor={'#131313'}
              secureTextEntry
            />
          </View>
          <View style={styles.row}>
            <Switch
              value={this.state.rememberPasswordChecked}
              onValueChange={this.toggleSwitch}
              trackColor={{
                false: '#f5f9ff',
                true: '#3903fc',
              }}
            />
            <Text style={styles.toggleLabel}>Remember me</Text>
          </View>
          <View style={styles.row}>
            <Switch
              value={this.props.isDarkMode}
              onValueChange={this.props.onToggleDarkMode}
              trackColor={{
                false: '#f5f9ff',
                true: '#3903fc',
              }}
            />
            <Text style={styles.toggleLabel}>Dark mode</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.button}>
          <View style={styles.row}>
            <Text style={styles.buttonText}>Login</Text>
            <Ionicons name="md-arrow-forward" size={16} color={'#FFF'} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF',
    elevation: 18,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#131313',
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
    borderBottomColor: '#131313',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    flex: 0.9,
    fontSize: 16,
    color: '#131313',
    paddingVertical: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#3903fc',
    borderRadius: 25,
    padding: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textTransform: 'uppercase',
    marginRight: 10,
  },
  toggleLabel: {
    marginLeft: 10,
    color: '#131313',
  },
});
