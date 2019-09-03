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
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import ScreensToggleIcon from '../components/ScreensToggleIcon';
import { withTheme } from '../utils/theming';
import { en, pl, ar } from '../utils/translations';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;

i18n.translations = {
  en: en,
  pl: pl,
  ar: ar,
};

const currentLocale = Localization.locale;
i18n.locale = currentLocale;

const isRTL = currentLocale.indexOf('ar') === 0;
I18nManager.allowRTL = isRTL;
I18nManager.forceRTL(isRTL);

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
        <StatusBar
          barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Text
          style={computedStyles.header}
          accessibilityLabel={i18n.t('header')}
          accessibilityRole="text"
        >
          {i18n.t('header')}
        </Text>
        <View style={computedStyles.inputGroup}>
          <View style={[computedStyles.row, computedStyles.inputRow]}>
            <Ionicons
              name="md-person"
              size={26}
              color={theme.primaryTextColor}
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
            <TextInput
              style={computedStyles.input}
              onChangeText={this.setEmail}
              value={this.state.loginValue}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={i18n.t('email')}
              placeholderTextColor={theme.secondaryTextColor}
              accessibilityLabel={i18n.t('email')}
              accessibilityHint={i18n.t('email_hint')}
            />
          </View>
          <View style={[computedStyles.row, computedStyles.inputRow]}>
            <Ionicons
              name="md-lock"
              size={26}
              color={theme.primaryTextColor}
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
            <TextInput
              style={computedStyles.input}
              onChangeText={this.setPassword}
              value={this.state.passwordValue}
              returnKeyType="go"
              autoCapitalize="none"
              placeholder={i18n.t('password')}
              placeholderTextColor={theme.secondaryTextColor}
              accessibilityLabel={i18n.t('password')}
              accessibilityHint={i18n.t('password_hint')}
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
              accessibilityLabel={i18n.t('remember_me')}
              accessibilityHint={i18n.t('remember_me_hint')}
            />
            <Text
              style={computedStyles.toggleLabel}
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            >
              {i18n.t('remember_me')}
            </Text>
          </View>
          <View style={computedStyles.row}>
            <Switch
              value={this.props.isDarkMode}
              onValueChange={this.props.onToggleDarkMode}
              trackColor={{
                false: theme.secondaryBackgroundColor,
                true: theme.accentColor,
              }}
              accessibilityLabel={i18n.t('dark_mode')}
              accessibilityHint={i18n.t('dark_mode_hint')}
            />
            <Text
              style={computedStyles.toggleLabel}
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            >
              {i18n.t('dark_mode')}
            </Text>
          </View>
        </View>
        <TouchableHighlight
          style={computedStyles.button}
          accessibilityLabel={i18n.t('login')}
          accessibilityHint={i18n.t('login_hint')}
          accessibilityRole="button"
        >
          <View style={computedStyles.row}>
            <Text style={computedStyles.buttonText}>{i18n.t('login')}</Text>
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
      textAlign: isRTL ? 'right' : 'left',
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
