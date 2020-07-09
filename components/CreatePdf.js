import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import Directory from '../constants/Directory';

import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';


import Colors from '../constants/Colors';
import PageSize from '../constants/PageSize';

const CreatePdf = props => {

  const checkDirectory = async () => {

    const absoluteDocPath = `${Directory.folderDocument}`
    try {
      // let doc = await RNFS.mkdir(absoluteDocPath);
      const isDir = await RNFetchBlob.fs.isDir(absoluteDocPath);
      console.log("Directory Exists", isDir);
      if (isDir) {
        return true;
      }
      else {
        const doc = await RNFetchBlob.fs.mkdir(absoluteDocPath);
        console.log('result DOC', doc, "Directory Created");
        return true;
      }
    } catch (err) {
      console.log("ERR in APP doc", err);
      return false;
    }
  }

  const generatePdf = async () => {

    const pages = props.pages;
    const pageRatio = PageSize.width / PageSize.height;
    let len = pages.length;

    console.log("PAGES LENGTH", len);

    let currentName = new Date().toString();

    try {

      const dir = await checkDirectory();

      if (dir) {
        const pdfPath = `${Directory.folderDocument}/${currentName}.pdf`;

        const jpgPath = pages[0].uri.path.split('/').slice(3).join('/');
        const imageW = pages[0].uri.width;
        const imageH = pages[0].uri.height;
        const imageRatio = imageW / imageH;

        let WIDTH;
        let HEIGHT;

        if (imageH > imageW) {
          if (imageRatio > PageSize.ratio) {
            WIDTH = PageSize.width;
            HEIGHT = PageSize.width / imageRatio;
          }
          else {
            HEIGHT = PageSize.height;
            WIDTH = imageRatio * PageSize.height;
          }
        }
        else {
          WIDTH = PageSize.width;
          HEIGHT = PageSize.width / imageRatio;
        }

        console.log(" IMAGE WIDTH ", imageW, " IMAGE Height ", imageH, " IMAGE RATIO ", imageRatio, " Page Height ", PageSize.height, " Page width ", PageSize.width, " Page Ratio ", pageRatio)

        const page = PDFPage.create().setMediaBox(PageSize.width / 2, PageSize.height / 2).drawImage(jpgPath, 'jpg', {
          x: 0,
          y: 0,
          width: WIDTH/2,
          height: HEIGHT/2,
        });

        let createdPDF = await PDFDocument.create(pdfPath).addPages(page).write();

        console.log('PDF created at: ' + createdPDF);

        if (len == 1) {
          props.onCreatePdf();
          return;
        }

        else {

          for (let i = 1; i < len; i++) {

            const jpgPath = pages[i].uri.path.split('/').slice(3).join('/');
            const imageW = pages[i].uri.width;
            const imageH = pages[i].uri.height;
            const imageRatio = imageW / imageH;

            let WIDTH;
            let HEIGHT;

            if (imageH > imageW) {
              if (imageRatio > PageSize.ratio) {
                WIDTH = PageSize.width;
                HEIGHT = PageSize.width / imageRatio;
              }
              else {
                HEIGHT = PageSize.height;
                WIDTH = imageRatio * PageSize.height;
              }
            }
            else {
              WIDTH = PageSize.width;
              HEIGHT = PageSize.width / imageRatio;
            }


            const page = PDFPage.create().setMediaBox(PageSize.width / 2, PageSize.height / 2).drawImage(jpgPath, 'jpg', {
              x: 0,
              y: 0,
              width: WIDTH/2,
              height: HEIGHT/2,
            });

            console.log("INSIDE ADDING FUNCTIONS");
            try {
              PDFDocument.modify(pdfPath).addPages(page).write().then(path => {
                console.log(`Page number ${i + 1} added in PDF at: ` + path);
              });
            }
            catch (err) {
              console.log("ERR", err, "ERR END");
              return;
            }
          }
          props.onCreatePdf()
          return;
        }
      }
      else {
        console.log("NO PDF CREATED");
        return;
      }
    }
    catch (err) {
      console.log("Err in PDF Create", err);
      return
    }

  }


  return (
    <View style={styles.imagePicker}>
      <View style={styles.buttonView}>
        {/* <Icon name="pdffile1" size={50} color={Colors.accent} onPress={newPdf} /> */}
        <Icon name="pdffile1" size={50} color={Colors.accent} onPress={generatePdf} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    backgroundColor: Colors.primary,
    borderRadius: Dimensions.get('window').height / 14,
    width: Dimensions.get('window').height / 7,
    height: Dimensions.get('window').height / 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

})

export default CreatePdf;