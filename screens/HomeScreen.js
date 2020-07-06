import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

import PdfCard from '../components/PdfCard';
import * as documentsActions from '../store/document/action';
import Directory from '../constants/Directory';
import Colors from '../constants/Colors';

const HomeScreen = props => {

  const images = useSelector(state => state.documents.documents);
  const dispatch = useDispatch();

  const getFiles = async () => {

    const absolutePath = `${Directory.folderDocument}`

    const allDocs = await RNFetchBlob.fs.ls(absolutePath);

    return allDocs;
  }

  useEffect(() => {
    const getFile = async () => {
      let file = await getFiles();
      dispatch(documentsActions.getDocument(file));
    }
    getFile();

  }, [images])


  const renderFile = itemData => {
    return <PdfCard fileName={itemData.item} onOpenFile={async () => {
      await FileViewer.open(`${Directory.folderDocument}/${itemData.item}`)
    }} />
  }

  return (
    <View style={styles.screen}>
      <View style={styles.files}>
        <FlatList data={images} keyExtractor={item => item} numColumns={2} renderItem={renderFile} />
      </View>
      <View style={styles.cameraButtonView}>
        <Button color={Colors.primary} title="Camera" onPress={() => {
          props.navigation.navigate("Camera");
        }}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  files: {
    flex: 1,
    flexDirection: 'row',
  },
  cameraButtonView: {
    margin: 20,
    borderColor: Colors.accent
  }
})

// import React from 'react';
// import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

// import { CATEGORIES, MEALS } from '../data/dummy-data';
// import MealItem from '../components/MealItem';

// const CategoryMealScreen = props => {

//   const renderMealItem = itemData => 

//   const catId = props.navigation.getParam('categoryId');

//     const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
//     const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

//     return (
//       <View style={styles.screen}>
//         <FlatList data={displayedMeals} renderItem={renderMealItem} style={{ width: '100%' }} />
//       </View>
//     );
//   }

//   CategoryMealScreen.navigationOptions = (navigationData) => {
//     const catId = navigationData.navigation.getParam('categoryId');

//     const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

//     return {
//       headerTitle: selectedCategory.title,
//     }
//   }

//   const styles = StyleSheet.create({
//     screen: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     }
//   });

//   export default CategoryMealScreen;

export default HomeScreen;