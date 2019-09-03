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
### Toggle active screen
Since now we'll be working on `Login` screen. To make it more handy, edit `state.showLoginScreen` in `Home`, so the `Login` screen will be initially visible. 

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

#### Play/Pause button 

- Toggle `opacity` of **play** and **pause** buttons.
- Toggle `rotation` of the **container**.
- Use `runLinearTiming` again on `pauseOpacity`.
- You can use `this.prop.isPlaying` prop directly in `runLinearTiming` - as it evaluates to `1` or `0`.
- Use `interpolate` to get `playOpacity` and `rotateY` (from 0 to 180).
- Use `concat` node to add 'deg' sufix to the `rotateY`.
- Use opacity and rotate values in `transform` style of proper elements.

#### Progressbar

If you have some time now, try to implement a progress bar! A progress bar should:

- animate or stop when play or pause is pressed - translateX property of progress bar indicator
- animate equally long to current song duration
- resume animation from the position where stopped
- reset when song changes

You will need:

- `block`, `eq`, `set`, `cond`
- math functions - `multiply`, `divide`, `sub`
- `runLinearTiming` function we created before
- `Value` and `Clock` - of course

#### Collapsible header

In `SongList`:
- First set `scrollEventThrottle` prop of the `Flatlist` to 16 - this will provide smooth performance.
- Use `Flatlist`'s `onScroll` event.
- Extract `nativeEvent.contentOffset.y` value from the `event` and save it to the `scrollY` class field (`Animated.Value`).
- Pass `scrollY` to `CollapsibleHeader` and `HeaderTitle` components.

In `CollapsibleHeader`:
- Interpolate `translateY` ([0, 130] => [0, 130]), `opacity` ([0, 200] => [1, 0]) and `scale` ([0, 130] => [1, 0.6]) values basing on `scrollY` prop.
- Add `Extrapolate.CLAMP` to the interpolations - you don't want to exceed the range.
- Change regular `View` to `Animated.View` where necessary.
- Use interpolated values in styles.

In `HeaderTitle`:
- Interpolate `titleOpacity` (50, 100) => (0, 1), value basing on `scrollY` prop.
- Add `Extrapolate.CLAMP` to the interpolation.
- Change regular `View` to `Animated.View` where necessary.
- Use interpolated value in styles.

### Gesture handler

Documentation for RN Gesture Handler: https://kmagiera.github.io/react-native-gesture-handler/

Install Gesture Handler: 
```sh
yarn add react-native-gesture-handler
```

#### Remove song from the list

Work in `SongItem`:
- Remember to change song container from `View` to `Animated.View` - you can't animate regular View, right?
- Wrap `Animated.View` using `PanGestureHandler`.
- Use `onGestureEvent` prop of `PanGestureHandler`. 
- Use `activeOffsetX` prop to allow only swipe right. 
- Similar way to flatlist scroll, exctract `translationX`, `velocityX` and `state` from the `event`.
- Use `translationX` in `Animated.Value` style.

// TBD

### Theming 

Documentation for the theme provider: https://github.com/callstack/react-theme-provider

- Install theme provider: 
```sh
yarn add @callstack/react-theme-provider
```

In `utils/theming`:
- Create `ThemeProvider` and `withTheme` using `createTheming` method. 

In `App`:
- Import `ThemeProvider` and 2 themes.
- Wrap main entry point using `ThemeProvider`. 
- Pass `theme` prop to the `ThemeProvider` - this will help us to toggle theme in the app.

In `Login`: 
- Import `withTheme` HOC.
- Wrap exported component with the HOC.
- Edit `styles` to method - it should consume `theme` prop and return computed style using theme values.
- Change hardcoded color values to these from `theme` (e.g. `theme.primaryTextColor`).

Check if theme works using toggle!
