// import * as FileSystem from 'expo-file-system';
import Directory from '../../constants/Directory';
import RNFetchBlob from 'rn-fetch-blob'

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
export const EMPTY_IMAGE = "EMPTY_IMAGE";
export const FILTER_IMAGE = "FILTER_IMAGE"

export const addImage = (id, image) => {

  return async dispatch => {

    // const fileName = image.fileName;
    // // const fileName = image.split('/').pop();

    // const newPath = `${Directory.folderImage}/${fileName}`;

    // try {
    //   let res = await RNFetchBlob.fs.mv(image.path, newPath);
    //   console.log("RES", res);
    // }
    // catch (err) {
    //   console.log(err);
    //   throw err;
    // }

    dispatch({ type: ADD_IMAGE, imageData: { id: id, image: image } });
  }
}

export const emptyImage = () => {

  return async dispatch => {

    // let len = img.length;
    // try {
    //   for (let i = 0; i < len; i++) {
    //     const del = await RNFetchBlob.fs.unlink(`${Directory.folderImage}/${img[i].fileName}`);
    //     console.log("IMAGE DELETED", del);
    //   }
    // } catch(err){
    //   console.log("Err", err);
    // }

    dispatch({ type: EMPTY_IMAGE});
  }
}

export const filterImages = (img) => {

  return async dispatch => {

    // let len = img.length;
    // try {
    //   for (let i = 0; i < len; i++) {
    //     const del = await RNFetchBlob.fs.unlink(`${Directory.folderImage}/${img[i].fileName}`);
    //     console.log("IMAGE DELETED", del);
    //   }
    // } catch(err){
    //   console.log("Err", err);
    // }

    dispatch({ type: FILTER_IMAGE, images: {image: img}});
  }
}
