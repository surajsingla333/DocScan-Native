import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import RNFetchBlob from 'rn-fetch-blob';

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

  const makeDirectoryDoc = async () => {

    // const newPath = RNFS.ExternalStorageDirectoryPath;
    const absoluteDocPath = `${Directory.folderDocument}`
    try {
      // let doc = await RNFS.mkdir(absoluteDocPath);
      const isDir = await RNFetchBlob.fs.isDir(absoluteDocPath);
      console.log("Directory Exists doc in App", isDir);
      if (isDir) {
        setCreatedImage(true);
        return;
      }
      else {
        const doc = await RNFetchBlob.fs.mkdir(absoluteDocPath);
        console.log('result DOC', doc);
        setCreatedDoc(true);
        return;
      }
    } catch (err) {
      console.log("ERR in APP doc", err);
    }
  }

  const makeDirectoryImg = async () => {

    // const newPath = RNFS.ExternalStorageDirectoryPath;
    const absoluteImagePath = `${Directory.folderImage}`
    try {
      // let img = await RNFS.mkdir(absoluteImagePath);
      const isDir = await RNFetchBlob.fs.isDir(absoluteImagePath);
      console.log("Directory Exists img in app", isDir);
      if (isDir) {
        setCreatedImage(true);
        return;
      }
      else {
        const img = await RNFetchBlob.fs.mkdir(absoluteImagePath);
        console.log('result IMG', img);
        setCreatedImage(true);
        return;
      }
    } catch (err) {
      console.log("ERR in APP img", err);
    }
  }


  useEffect(() => {
    const initialize = async () => {
      await makeDirectoryDoc();
      makeDirectoryImg
    }
    initialize();
  }, [createdDoc])

  useEffect(() => {
    const initialize = async () => {
      await makeDirectoryImg();
    }
    initialize();
  }, [createdImage])

  // if (createdDoc && createdImage) {
  return (
    <Provider store={store}>
      <CameraNavigator />
    </Provider>
  );
  // }
  // else{
  //   return(<View><Text>LOADER</Text></View>)
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
