import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image } from 'react-native';

import { useDispatch } from 'react-redux';

import AddImage from '../components/AddImage';

import * as imagesActions from '../store/image/action';
import Colors from '../constants/Colors';

const CameraScreen = props => {

  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  }

  const saveImage = () => {
    console.log("Save Image", selectedImage);
    dispatch(imagesActions.addImage(selectedImage));
    props.navigation.navigate("Pages")
  }

  return (


    <View style={styles.screen}>
      <View style={styles.imageSelectorView}>
        <ImageSelector onImageTaken={imageTakenHandler} />
      </View>
      <View style={styles.cameraButtonView}>
        <Button color={Colors.primary} title="Save Image" onPress={saveImage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageSelectorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonView: {
    margin: 20,
    borderColor: Colors.accent
  }
})

export default CameraScreen;