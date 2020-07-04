import React from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image, Button } from 'react-native';

// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

import { useSelector } from 'react-redux';


const ImageCollectionScreen = props => {

  const images = useSelector(state => state.images.images);

  console.log("IMAGE", images);
  try {
    console.log("IMAGE 0", images[0], "IMAGE 0 end");
    console.log("IMAGE 0 uri", images[0].uri);
  }
  catch (err) {
    console.log(err);
  }

  const createPdf = () => { console.log("PRESSING BUTTON") }
  //   // Import from 'react-native-pdf-lib'
  //   // Create a PDF page with text and rectangles
  //   const page1 = PDFPage.create().setMediaBox(200, 200).drawText('You can add text and rectangles to the PDF!', {
  //     x: 5,
  //     y: 235,
  //     color: '#007386',
  //   }).drawRectangle({
  //     x: 25,
  //     y: 25,
  //     width: 150,
  //     height: 150,
  //     color: '#FF99CC',
  //   }).drawRectangle({
  //     x: 75,
  //     y: 75,
  //     width: 50,
  //     height: 50,
  //     color: '#99FFCC',
  //   });

  //   // Create a PDF page with text and images
  //   //     const jpgPath = // Path to a JPG image on the file system...
  //   const pngPath = images[0].uri;
  //   const page2 = PDFPage.create().setMediaBox(250, 250).drawText('You can add PNG images too!').drawImage(pngPath, 'png', {
  //     x: 5,
  //     y: 25,
  //     width: 200,
  //     height: 100,
  //   });

  //   console.log("INSIDE FUNCTION");
  //   try {
  //     // Create a new PDF in your app's private Documents directory
  //     // setTimeout(async () => {
  //     // const docsDir = PDFLib.getDocumentsDirectory();
  //     const pdfPath = `sample.pdf`;
  //     PDFDocument.create(pdfPath).addPages(page1, page2).write().then(path => {
  //       console.log('PDF created at: ' + path);
  //       // Do stuff with your shiny new PDF!
  //     });
  //     // }, 100);
  //   }
  //   catch (err) {
  //     console.log("ERR", err);
  //   }

  // }

  return (
    <View>
      {/* <Text>Pages</Text> */}
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <Image style={{ margin: 5, width: 100, height: 100, }} source={{ uri: itemData.item.uri }} />
        )}
      />
      <Button title="Generate PDF" onPress={createPdf} />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: 200,
    height: 300,
  }
})

export default ImageCollectionScreen;