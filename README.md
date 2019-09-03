# Delightful UX with React Native

## Running application
- clone repo

```sh
git clone https://github.com/callstack-internal/delightful-ux-training-app
```

- install dependencies

```sh
yarn install
```

- run expo app

```sh
yarn start
```

- open App on device or simulator
  - for Android - open app on the device and scan QR code
  - for iOS - type app ip in Safari browser on iOS device
  - Android/iOS simulator - press "Run on iOS simulator"/"Run on Android device/emulator" in Expo web tools

## Exercises

### Animations

Reanimated documentation: https://github.com/kmagiera/react-native-reanimated

Install Reanimated:
```sh
yarn add react-native-reanimated
```

#### Heart icon animation
Toggle `FavouriteButton` opacity smoothly.
- Use `Animated.Value`, let's call it `toValue`.
- Use `Clock`, `clock`.
- Create function returning `block`. Let's call it `runLinearTiming`. 
- `runLinearTiming` should accept `clock`, `toValue` (value which should be at the end of the animation) and `duration`.
- Start with preparing `state = { finished, frameTime, position, time }` and `config = { toValue, duration, easing }`.
- Block you'll return should: 
  * Check if clock is running (`cond`, `clockRunning`),
  * If not yet, reset the clock (`set`) and the state, update `config.toValue` and start the clock (`startClock`),
  * Run `timing` using `clock`, `state` and `config` we already have,
  * Check if clock is finished, if positive, stop it (`stopClock`),
  * Call (and return at the same time) `state.position`.
- Assign newly created function to `opacity` class property.
- Apply value we just animated to `opacity` style in `render`.
- Remember to update manually `toValue` when component updates.
- Remember to use `Animated.View`!


