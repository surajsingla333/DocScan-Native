import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import { Platform, Alert } from 'react-native'

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
//       backgroundColor: Colors.SET_COLOR,
//     },
//     headerTintColor: Colors.SET_COLOR_INVERSE
//   }
// });

const CameraNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Colors.SET_COLOR_INVERSE,
          headerStyle: { backgroundColor: Colors.SET_COLOR },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome', headerTitleAlign: 'center' }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen
          name="Pages"
          component={ImageCollectionScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>)
}

export default CameraNavigator;
