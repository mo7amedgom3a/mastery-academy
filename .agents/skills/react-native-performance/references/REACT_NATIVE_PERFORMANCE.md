# React Native Performance Reference Guide

This reference details the specific optimization techniques and coding standards for React Native mobile applications.

## 1. UI Thread vs. JS Thread Isolation
React Native runs JavaScript code on the JS thread, and UI rendering on the Main/UI thread. Communication between them is historically done via a JSON bridge. 
* **The Problem:** Sending large data objects (e.g. scroll offsets, touch data, or layout measurements) across the bridge repeatedly will saturate it, causing dropped frames (lags).
* **The Rule:** Keep communication across the bridge to a minimum.
* **Worklets (Reanimated V2/V3):** Write animation and gesture handlers that run entirely on the UI thread using worklets:
  ```tsx
  import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

  // Shared values live on the UI thread
  const scale = useSharedValue(1);

  // Animated styles run on the UI thread as a worklet
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  ```

## 2. Optimizing FlatLists & ScrollView performance
Large, unoptimized lists are the primary source of memory crashes in React Native.
* **Always implement `getItemLayout`** if your items have a fixed height/width. This bypasses the need for the native runtime to measure elements dynamically:
  ```tsx
  getItemLayout={(data, index) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  )}
  ```
* **FlatList Props Optimization Checklist:**
  * `initialNumToRender={10}`: Limit the items rendered on the first mount.
  * `maxToRenderPerBatch={10}`: Limit items rendered per scroll batch.
  * `windowSize={11}`: Limits memory consumption of off-screen items (default is 21).
  * `removeClippedSubviews={true}`: Free up native rendering memory for off-screen items.
* **Memoize Items:** Always wrap the list item component in `React.memo` and ensure the key is stable and unique:
  ```tsx
  const ListItem = React.memo(({ item }) => { ... });
  ```

## 3. High-Performance Image Handling
The default React Native `<Image>` component does not offer native disk caching on Android and has performance issues on iOS with large grids.
* **Use FastImage:** Always use `react-native-fast-image` (or Expo Image) for aggressive memory/disk caching, priorities, and performance improvements:
  ```tsx
  import FastImage from 'react-native-fast-image';

  <FastImage
    style={{ width: 200, height: 200 }}
    source={{
      uri: 'https://example.com/image.jpg',
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
  />
  ```

## 4. JSI (JavaScript Interface) & Native Bindings
In modern React Native (Fabric, TurboModules), choose libraries that utilize **JSI** (JavaScript Interface). JSI binds C++ host objects to JS, allowing direct synchronous calls between Javascript and Native modules, bypassing the asynchronous JSON bridge.
* Ensure heavy storage systems use JSI-backed libraries like `react-native-mmkv` instead of legacy, slow `AsyncStorage`.
