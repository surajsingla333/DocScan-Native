import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native'

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ImageCollectionScreen from '../screens/ImageCollectionScreen';

const Stack = createStackNavigator();
//   {
//   Home: {
//     screen: HomeScreen,
//   },
//   Camera: {
//     screen: CameraScreen,
//   },
// }, {
//   defaulNavigationOptions: {
//     headerStyle: {
//       backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.accent,
//     },
//     headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
//   }
// });

const CameraNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary,
          headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.accent },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Pages" component={ImageCollectionScreen} />

      </Stack.Navigator>
    </NavigationContainer>)
}

export default CameraNavigator;
