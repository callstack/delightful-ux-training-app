/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import MainScreen from './MainScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainScreen);
