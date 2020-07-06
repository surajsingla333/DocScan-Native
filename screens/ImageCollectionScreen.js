import React from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image, Button } from 'react-native';

import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

import Directory from '../constants/Directory';

import { useSelector, useDispatch } from 'react-redux';

import * as imagesActions from '../store/image/action';
import Colors from '../constants/Colors';

import ImagePage from '../components/ImagePage';

const ImageCollectionScreen = props => {

  const images = useSelector(state => state.images.images);

  const dispatch = useDispatch();

  console.log("IMAGE", images);
  try {
    console.log("IMAGE 0", images[0], "IMAGE 0 end");
    console.log("IMAGE 0 uri", images[0].uri.uri);
  }
  catch (err) {
    console.log(err);
  }

  const createPdf = async () => {

    let len = images.length;

    let currentName = new Date().toString();

    // const newPath = RNFS.ExternalStorageDirectoryPath;
    const pdfPath = `${Directory.folderDocument}/${currentName}.pdf`;

    const jpgPath = images[0].uri.path;
    const page = PDFPage.create().drawImage(jpgPath, 'jpg', {
      x: 5,
      y: 25,
      width: images[0].uri.width / 10,
      height: images[0].uri.height / 10,
    });

    let createdPDF = await PDFDocument.create(pdfPath).addPages(page).write();

    console.log('PDF created at: ' + createdPDF);


    //   console.log("INSIDE FUNCTION");
    //   try {
    //     // Create a new PDF in your app's private Documents directory
    //     // setTimeout(async () => {
    //     // const docsDir = PDFLib.getDocumentsDirectory();
    //     // const pdfPath = `sample.pdf`;
    //     PDFDocument.create(pdfPath).addPages(page).write().then(path => {
    //   console.log('PDF created at: ' + path);
    //   // Do stuff with your shiny new PDF!
    //   });
    //     // }, 100);
    //   }
    //   catch (err) {
    // console.log("ERR", err, "ERR END");
    // }

    if (len == 1) {
      dispatch(imagesActions.emptyImage(images));
      props.navigation.navigate("Home");
      return;
    }

    else {

      for (let i = 1; i < len; i++) {

        const jpgPath = images[i].uri.path;
        const page = PDFPage.create().drawImage(jpgPath, 'jpg', {
          x: 5,
          y: 25,
          width: images[i].uri.width / 10,
          height: images[i].uri.height / 10,
        });

        console.log("INSIDE ADDING FUNCTIONS");
        try {
          // Create a new PDF in your app's private Documents directory
          // setTimeout(async () => {
          // const docsDir = PDFLib.getDocumentsDirectory();
          // const pdfPath = `sample.pdf`;
          PDFDocument.modify(pdfPath).addPages(page).write().then(path => {
            console.log(`Page number ${i + 1} added in PDF at: ` + path);
            // Do stuff with your shiny new PDF!
          });
          // }, 100);
        }
        catch (err) {
          console.log("ERR", err, "ERR END");
          return;
        }
      }
      dispatch(imagesActions.emptyImage());
      props.navigation.navigate("Home");
      return;
    }

  }

  const renderImage = itemData => {
    return <ImagePage fileName={itemData.item} image={itemData.item.uri} onEditImage={() => { console.log("Clicked Image") }} />
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pages}>
        <FlatList data={images} keyExtractor={item => item.id} numColumns={2} renderItem={renderImage} />
      </View>
      <View style={styles.buttonView}>
        <Button color={Colors.primary} title="Generate PDF" onPress={createPdf} />
        <Button color={Colors.primary} title="Add Image" onPress={() => {props.navigation.pop()}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pages: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    margin: 20,
    borderColor: Colors.accent,
    justifyContent: 'space-evenly'
  }
})

export default ImageCollectionScreen;