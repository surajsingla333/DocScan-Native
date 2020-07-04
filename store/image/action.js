// import * as FileSystem from 'expo-file-system';
import * as RNFS from 'react-native-fs';

// // create a path you want to write to
// // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
// var path =  + '/test.txt';

// // write the file
// RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
//   .then((success) => {
//     console.log('FILE WRITTEN!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

export const ADD_IMAGE = "ADD_IMAGE";

export const addImage = (image) => {

  return async dispatch => {

    // const fileName = image.fileName;
    // const fileName = image.split('/').pop();

    // const newPath = RNFS.DocumentDirectoryPath + fileName;

    // try {
    //   await RNFS.copyFile(image, newPath);
    // }
    // catch (err) {
    //   console.log(err);
    //   throw err;
    // }
    dispatch({ type: ADD_IMAGE, imageData: { image: image.uri } });
  }
}