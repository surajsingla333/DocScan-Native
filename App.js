import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as RNFS from 'react-native-fs';

import Directory from './constants/Directory';
import CameraNavigator from './navigation/CameraNavigator'

import imageReducer from './store/image/reducer';
import documentReducer from './store/document/reducer';
// import { init } from './helpers/db';

// init().then(() => {
//   console.log("Initialized database");
// }).catch(err => {
//   console.log("Initializing db failed.");
//   console.log(err);
// })

const rootReducer = combineReducers({
  images: imageReducer,
  documents: documentReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  const [createdDoc, setCreatedDoc] = useState(false);
  const [createdImage, setCreatedImage] = useState(false);

  makeDirectory = async () => {

    // const newPath = RNFS.ExternalStorageDirectoryPath;
    const absoluteDocPath = `${Directory.folderDocument}`
    const absoluteImagePath = `${Directory.folderImage}`
    try {
      let doc = await RNFS.mkdir(absoluteDocPath);
      console.log('result DOC', doc);
      setCreatedDoc(true);

      let img = await RNFS.mkdir(absoluteImagePath);
      console.log('result IMG', img);
      setCreatedImage(true);
    } catch (err) {
      console.log("ERR", err);
    }
  }


  useEffect(() => {
    const initialize = async () => {
      await makeDirectory();
    }
    initialize();
  }, [createdDoc, createdImage])

  return (
    <Provider store={store}>
      <CameraNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
