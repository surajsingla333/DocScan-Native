import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';

import { RNPhotoEditor } from 'react-native-photo-editor'
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

import * as imagesActions from '../store/image/action';
import Colors from '../constants/Colors';

import ImageCard from '../components/ImageCard';
import AddImage from '../components/AddImage';
import CreatePdf from '../components/CreatePdf';

const ImageCollectionScreen = props => {

  const [selectedImage, setSelectedImage] = useState([]);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const images = useSelector(state => state.images.images);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(
      !settingsMenu ?
        {
          headerLeft: () => (
            <HeaderBackButton
              // {...props}
              tintColor={Colors.SET_COLOR_INVERSE}
              onPress={() => {
                console.log("PRESSED");
                Alert.alert(
                  "Are you sure?",
                  "All the data will be discarded",
                  [
                    {
                      text: "Discard",
                      onPress: () => {
                        console.log("Cancel Pressed");
                        goBack();
                      },
                      style: "cancel"
                    },
                    { text: "Stay", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
              }}
              color={'white'} />
          ),
          headerTitle: "Pages",
          headerTintColor: Colors.SET_COLOR_INVERSE,
          headerStyle: { backgroundColor: Colors.SET_COLOR },
        } :
        {

          headerTitle: "Image Settings",
          headerTintColor: Colors.SET_COLOR,
          headerStyle: { backgroundColor: Colors.SET_COLOR_INVERSE },
          headerLeft: () => (
            <HeaderBackButton
              // {...props}
              tintColor={Colors.SET_COLOR}
              onPress={() => {
                setSelectedImages([]);
                setSettingsMenu(false);
              }}
              color={Colors.SET_COLOR} />
          ),
          headerRight: () => (
            selectedImages.length == 1 ?
              <View style={{ flexDirection: "row" }}>
                <IconFeather name="edit-2" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={() => onEditImageHandler(selectedImages[0])} />
                <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteImages} />
              </View> :
              <View style={{ flexDirection: "row" }}>
                <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteImages} />
              </View>
          )

        }
    );
  }, [selectedImages, settingsMenu]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedImage(images);
  }, [images])


  const goBack = () => {
    dispatch(imagesActions.emptyImage());
    props.navigation.goBack();
  }

  const deleteImages = () => {
    console.log("IN DELETING IMAGES", selectedImages);
    dispatch(imagesActions.filterImages(selectedImages));
    setSelectedImages([]);
    setSettingsMenu(false);
  }

  const imageTakenHandler = imagePath => {
    setSelectedImage(img => img.concat({ id: img.length, uri: imagePath }));
    dispatch(imagesActions.addImage(+selectedImage.length, imagePath));
  }

  const generatePdfHandler = () => {
    dispatch(imagesActions.emptyImage());
    props.navigation.navigate("Home");
    console.log("Genrate PDF");
  }

  const onEditImageHandler = async (id) => {
    console.log("CLICKED IMAGE EDIT", id, selectedImage[id], "EDIT IMAGE");

    const PATH = selectedImage[id].uri.path.split('/').slice(3).join('/');

    console.log("PATH", PATH);

    // ImagePicker.openCropper({
    //   path: PATH,
    //   width: 300,
    //   height: 400,
    //   freeStyleCropEnabled: true,
    // }).then(image => {
    //   console.log(image);
    // }).catch(err => {
    //   console.log("ERROR", err);
    // });

    // const dest = `${RNFS.DocumentDirectoryPath}/${selectedImage[id].uri.fileName}`

    // console.log("IMAGEPATH", selectedImage[id].uri.path);
    // console.log("IMAGEPATH uri", selectedImage[id].uri.path);
    // console.log("IMAGEname ", selectedImage[id].uri.fileName);
    // console.log("IMAGEname uri", selectedImage[id].uri.fileName);
    // try {

    //   const isDir = await RNFetchBlob.fs.mv(selectedImage[id].uri.path, dest);

    // } catch (err) {
    //   console.log("Err in HOME", err);
    // }

    // console.log("PATH", RNFS.DocumentDirectoryPath);
    
    RNPhotoEditor.Edit({
      path: PATH,
      onDone: (edit) => {
        console.log("ON DONE", edit);
        setSelectedImages([]);
        setSettingsMenu(false);
      },
      onCancel: (edit) => {
        console.log("CANCEL EDIT", edit);
        setSelectedImages([]);
        setSettingsMenu(false);
      },
      hiddenControls: [],
    });

  }

  const onImageSettingsHandler = (id) => {
    console.log("HANDLING SETTINGS", id);
    setSelectedImages(current => current.concat(id));
    setSettingsMenu(true);
  }

  const onUnSelectHandler = (id) => {
    let arr = selectedImages.filter(img => img != id);
    setSelectedImages(arr);
    if (!arr.length) {
      setSettingsMenu(false);
    }
  }

  const renderImage = itemData => {
    return <ImageCard fileName={itemData.item} id={itemData.item.id} image={itemData.item.uri} settingMenu={settingsMenu} imageSettings={onImageSettingsHandler} onEditImage={onEditImageHandler} imageSelected={selectedImages.indexOf(itemData.item.id) >= 0} unSelect={onUnSelectHandler} />
  }

  return (
    <View style={{ ...styles.screen, alignItems: !selectedImage.length ? 'center' : null, justifyContent: !selectedImage.length ? 'center' : null }}>
      {!selectedImage.length ?
        (
          <View>
          </View>
        ) :
        (
          <View style={styles.pages}>
            <FlatList data={selectedImage} keyExtractor={item => item.id} numColumns={2} renderItem={renderImage} />
          </View>
        )
      }
      {!settingsMenu ?
        <View style={!selectedImage.length ? null : styles.buttonView}>
          {!selectedImage.length ?
            (
              <View>
              </View>
            ) :
            (
              <View style={styles.button}>
                <CreatePdf pages={selectedImage} onCreatePdf={generatePdfHandler} />
              </View>
            )
          }

          <View style={styles.button}>
            <AddImage onImageTaken={imageTakenHandler} />
          </View>

        </View>
        : <View></View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center'
  },
  pages: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 50
  }
})

export default ImageCollectionScreen;