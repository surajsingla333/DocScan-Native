import React, { useState, useRef } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';


import { RNCamera } from 'react-native-camera';
import Colors from '../constants/Colors';

const ImageSelector = props => {

  console.log("IN IMAGE SELECTOR");

  const [pickedImage, setPickedImage] = useState();
  const camera = useRef();

  const takeImageHandler = () => {

    ImagePicker.showImagePicker((response) => {
      // console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log("RESP", response);
        const source = { uri: response.uri };

        console.log("TYPE OF RESP", typeof (response));

        setPickedImage(response);
        props.onImageTaken(response);

      }
    });
  };

  const takePicture = (e) => {
    console.log("EVENT ", e);
    // camera.capture({metadata: options}).then((data) => {
    //   console.log("DATA", data);
    // }).catch(err => {
    //   console.log("ERR", err);
    // })
  }

  return (
    <View style={styles.imagePicker}>
      <RNCamera
        ref={camera}
        // style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Permission to use audio recording',
        //   message: 'We need your permission to use your audio',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <Button title="CAMERA TAKE" onPress={takePicture} />
      {/* </CameraKitCamera> */}
      {/* <View style={styles.imagePreview}>
        {!pickedImage ? (<Text>No image picked yet.</Text>) :
          (<Image style={{ width: (pickedImage.width) / 10, height: (pickedImage.height) / 10 }} source={{ uri: pickedImage.uri, width: (pickedImage.width) / 10, height: (pickedImage.height) / 10 }} />)}

      </View>
      <View style={styles.buttonView}>
        <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
      </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  imagePreview: {
    flex: 1,
    height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    alignItems: "center",
  },

})

export default ImageSelector;