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

#### Make song item draggable

Work in `SongItem`:
- Remember to change song container from `View` to `Animated.View` - you can't animate regular View, right?
- Wrap `Animated.View` using `PanGestureHandler`.
- Use `onGestureEvent` and `onHandlerStateChange` prop of `PanGestureHandler`. 
- Use `activeOffsetX` prop to allow only swipe right. 
- Use `maxPointers` prop to set number of fingers required for the gesture.
- Similar way to flatlist scroll, exctract `translationX`, `velocityX` and `state` from the `event`.
- Use `translationX` in `Animated.Value` style.

#### Revert translation when gesture ends

In `SongItem`:
- Assign `cond` to the `translationX`.
- Check if the gesture is still active (use `cond`, `eq`, `State.ACTIVE`).
- If is active, stop clocks and return `dragX`.
- If not active, animate back to the start position - run `runSpring` function you'll prepare in a moment. Call it with `springClock` and `dragX` arguments. 

In `utils/animationHelpers`:
- Create `runSpring` function with `clock` and `position` arguments.
- In the function body prepare `state` object containing `finished`, `velocity`, `position` and `time` values.
- Prepare config object using `SpringUtils.makeDefaultConfig()`.
- Return following `block`: 
  - If `clockRunning` (`cond`), reset state, restore `state.position` and `startClock`.
  - Run `spring` with `clock`, `state` and `config` arguments.
  - If `state.finished` (`cond`), `stopClock`.
  - Return `state.position`.
  
#### Hide the song if the gesture succeeded

In `SongItem`:
- In the class body create new `Animated.Value` equal to imported `ROW_HEIGHT`. Let's call it just `this.height`. 
- In the `cond` already assigned to the `translationX` nest another `cond` - check if gesture passed 80 breakpoint (`greaterThan`).
- If it didn't, it should revert as before.
- If succeeded, call block containing 2 functions:
  - `runLinearTiming` to animate `SongItem` height to 0. Your `position` argument will be `this.height`.
  - `runSwipeDecay` you'll create in a moment. Call it with `swipeClock`, `dragX` and `dragVelocityX` arguments.
  
In `utils/animationHelpers`:

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

### Internationalization

i18n-js documentation: https://github.com/fnando/i18n-js
Localization documentation: https://docs.expo.io/versions/latest/sdk/localization/

#### Multi-language support 

Install both libraries: 
```sh
yarn add i18n-js
expo install expo-localization
```

- Import `i18n-js`, `expo-localization` and translation objects (from `utils/translations`).
- Assign `Localization.locale` to `i18n.locale`.
- Assign translations to locales - create object and pass it to `i18n.translations`.
- Allow fallbacks using `i18n.fallbacks`.
- Set default locale using `i18n.defaultLocale`. 
- Insert dynamic strings using `i18n.t()` method. 

Test it out changing settings of your emulator or hardcoding `i18n.locale`!

#### RTL support 

- Import `I18nManager`.
- Create condition under which the layout should be RTL (`isRTL` variable you can use later).
- Set `I18nManager.allowRTL` and `I18nManager.forceRTL`.
- Test RTL layout and adjust styles if neccessary using `isRTL`.

### Accessibility 

Documentation: https://facebook.github.io/react-native/docs/accessibility

First, prepare your simulator / device (warning - for now you can't test in on iOS simulator).

#### Android preparation
For the emulator:
- Download apk from http://tiny.cc/androidreader 
- Drop the apk to the emulator

On emulator / device go to:
- Settings
- Accessibility
- TalkBack
- Use service

#### iOS preparation
On device go to: 
- Settings
- General
- Accessibility
- Vision
- VoiceOver

#### Implementation
- Apply `accessibilityLabel`, `accessibilityHint` where apropriate. 
- You can also use `i18n.t()` to make it internationalized!
- Hide labels next to `Toggle` components using `accessibilityElementsHidden` and `importantForAccessibility` - to serve both platforms.

If you have some spare time, try to create one `accessible` element in a place of few visual ones!
