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
expo install react-native-reanimated
```

#### Heart icon animation (branch `1-favicon`)

Create a function to animate `FavouriteButton` opacity smoothly.

In `utils/animationHelpers`:
- Create function returning `block` - `runLinearTiming`. 
- `runLinearTiming` should accept `clock`, `toValue` (value which should be at the end of the animation) and `duration`.
- Start with preparing `state = { finished, frameTime, position, time }` and `config = { toValue, duration, easing }` in the function body.
- `block` you'll return should: 
  * Check if clock is running (`cond`, `clockRunning`),
  * If not yet, reset the clock (`set`) and the state, update `config.toValue` and start the clock (`startClock`),
  * Run `timing` using `clock`, `state` and `config` we already have,
  * Check if clock is finished, if positive, stop it (`stopClock`),
  * Call (and return at the same time) `state.position`.

In `FavouriteButton`:
- Use `Animated.Value`, let's call it `toValue`.
- Use `Clock`, `clock`.
- Assign newly created `runLinearTiming` to `opacity` class property.
- Apply value we just animated to `opacity` style in `render`.
- Remember to update manually `toValue` when component updates (`ComponentDidUpdate`).
- Remember to use `Animated.View`!

#### Play/Pause button (branch `2-play-pause`)

In `Player`:
- In body class create new `playingState` `Animated.Value`.
- In `handlePlayToggle` toggle `playingState` value between 1 and 0. Use `setValue`, `cond` and `eq`.
- Pass `playingState` prop to the `PlayPauseButton`.

In `PlayPauseButton`:
- Toggle `opacity` of **play** and **pause** buttons.
- Toggle `rotation` of the **container**.
- Use `runLinearTiming` again on `pauseOpacity`. `toValue` argument should equal `isPlaying` prop.
- You can use `this.prop.isPlaying` prop directly in `runLinearTiming` - as it evaluates to `1` or `0`.
- Use `interpolate` to get `playOpacity` and `rotateY` (from 0 to 180).
- Use `concat` node to add 'deg' sufix to the `rotateY`.
- Use opacity and rotate values in `transform` style of proper elements.

#### Progressbar ★

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

#### Collapsible header (branch `3-header`)

In `SongList`:
- First create `AnimatedFlatList` using `Animated.createAnimatedComponent` and put it in a place of regular `FlatList` - it will provide more props for us. 
- Uncomment `HeaderTitle`.
- Create `scrollY` value before the `return` (`Animated.Value`)
- Set `scrollEventThrottle` prop of the `AnimatedFlatList` to 16 - this will provide smooth performance.
- Use `AnimatedFlatList`'s `onScroll` event.
- Extract `nativeEvent.contentOffset.y` value from the `event` and save it to the `scrollY`.
- Pass `scrollY` to `CollapsibleHeader` and `HeaderTitle` components.

In `CollapsibleHeader`:
- Interpolate `translateY` ([0, 130] => [0, 130]), `opacity` ([0, 200] => [1, 0]) and `scale` ([0, 130] => [1, 0.6]) values basing on `scrollY` prop.
- Add `Extrapolate.CLAMP` to the interpolations - you don't want to exceed the range.
- Change regular `View` to `Animated.View` where necessary.
- Use interpolated values in styles.
- In `imageContainer` styles apply translateY equal to `this.translateY` * 0.3 (use `multiply`).
- `shadowContainer` should have height equal to `this.translateY`.

In `HeaderTitle`:
- Interpolate `titleOpacity` class field ([50, 100] => [0, 1]) basing on `scrollY` prop.
- Add `Extrapolate.CLAMP` to the interpolation.
- Change regular `View` to `Animated.View` where necessary.
- Use interpolated value in styles.

### Gesture handler

Documentation for RN Gesture Handler: https://kmagiera.github.io/react-native-gesture-handler/

Install Gesture Handler: 
```sh
expo install react-native-gesture-handler
```

#### Make song item draggable (branch `4-drag-song-item`)

Work in `SongItem`:
- Remember to change song `container` from `View` to `Animated.View` - you can't animate regular View, right?
- Wrap `Animated.View` using `PanGestureHandler`.
- Use `activeOffsetX` prop to allow only swipe right. 
- Use `maxPointers` prop to set number of fingers required for the gesture.
- Create class constructor.
- In the constructor create `onGestureEvent` class field. Similar way to flatlist scroll, assign `Animated.event` to it and extract `translationX` from the `event` in the function.
- Assign `this.onGestureEvent` to `onGestureEvent` and `onHandlerStateChange` prop of `PanGestureHandler`. 
- Use `translationX` in `Animated.Value` style.

#### Revert translation when gesture ends (branch `5-revert-translation`)

In `SongItem`:
- Create `const dragX` - Animated Value - and `this.gestureState` Animated Value equal to `State.UNDETERMINED` in the constructor.
- Create `const springClock` - `Animated.Clock` - in the constructor.
- Extract also `state` from the `event`.
- Reassign `translationX` from the `event` - save it to our new `dragX` helper.
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
  
#### Hide the song if the gesture succeeded (branch `6-hide-song`)

In `SongItem`:
- In the constructor create new `Animated.Value` equal to imported `ROW_HEIGHT`. Let's call it just `this.height`. 
- In the constructor create helper `const dragVelocityX` - Animated Value.
- Exctract `velocityX` from the `event`.
- Create 2 new `clocks` in the constructor: `clock` and `swipeClock`.
- Stop those 2 `clocks` in the `cond` we have for checking if the gesture is `active`.
- In the `cond` already assigned to the `translationX` nest another `cond` - check if gesture passed 80 breakpoint (`greaterThan`) (in a place of current `runSpring` call).
- If it didn't, it should revert as before (call `runSpring` here).
- If succeeded, call block containing 2 functions:
  - `runLinearTiming` to animate `SongItem` height to 0. Your `position` argument will be `this.height`.
  - `runSwipeDecay` you'll create in a moment. Call it with `swipeClock`, `dragX` and `dragVelocityX` arguments.
- Apply `this.height` to `song` View style.
- For nice effect, create `opacity` Animated Value in constuctor and `interpolate` its value basing on `this.height`.
- Apply `this.opacity` to the styles of `song`.
  
In `utils/animationHelpers`:
- Create `runSwipeDecay` function. It should accept `clock`, `value` and `velocity` arguments.
- In the function body create :
  - `state` object containing `finished`, `velocity`, `position` and `time` values
  - `config` object containing `deceleration` value equal to 0.99
- Return `block` containing:
  - Checking if `clockRunning`; if **false** run `block`, in which reset `state` and `config` and run `startClock`.
  - Calling `decay` with `clock`, `state` and `config` arguments.
  - Checking if `state.finished`; if **true**, `stopClock`.
  - Returning `state.position`.
  
#### Remove the song from the state if hidden (branch `7-remove-song`)

In `SongItem`:
- You already implemented `runLinearTiming` if the gesture passed the breakpoint; add another key to that function config: `callback` with value `this.handleHideEnd`.

In `utils/animationHelpers`:
- Add another key to the config object - function argument - `callback`.
- Set default value to `() => {}`, so it won't break the function if called without `callback`.
- To the last `cond` in the `block` you return add callback call. Insert it to the same `block` as `stopClock`.
- Call callback using `call` node with arguments `[state.finished]` (must be an array; when any of the array values updates, the call will be triggered) and `callback`.


### Toggle active screen

Since now we'll be working on `Login` screen. To make it more comfortable, edit `state.showLoginScreen` in `Home`, so the `Login` screen will be initially visible. 

### Theming (branch `8-theme-provider`)

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

#### Multi-language support (branch `9-internationalization`) 

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

### Accessibility (branch `10-accessibility`) 

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
