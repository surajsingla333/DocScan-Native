import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Platform } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';

import PdfCard from '../components/PdfCard';
import * as documentsActions from '../store/document/action';
import Directory from '../constants/Directory';
import Colors from '../constants/Colors';

const HomeScreen = props => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [settingsMenu, setSettingsMenu] = useState(false);

  const images = useSelector(state => state.documents.documents);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getFiles = async () => {
    try {
      const absolutePath = `${Directory.folderDocument}`;
      const isDir = await RNFetchBlob.fs.isDir(absolutePath);
      console.log("Directory Exists IN HOME", isDir);
      if (isDir) {
        const allDocs = await RNFetchBlob.fs.ls(absolutePath);
        dispatch(documentsActions.getDocument(allDocs));
        setTotalFiles(allDocs.length);
        return allDocs;
      }
      else {
        const doc = await RNFetchBlob.fs.mkdir(absoluteDocPath);
        console.log('result DOC', doc, "Directory Created");
        return;
      }


    } catch (err) {
      console.log("Err in HOME", err);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getFiles();
    });

    return unsubscribe;

  }, [navigation, totalFiles])


  useEffect(() => {
    navigation.setOptions(
      settingsMenu ? ({
        headerTitle: "Settings",
        headerTitleAlign: 'left',
        headerTintColor: Colors.SET_COLOR,
        headerStyle: { backgroundColor: Colors.SET_COLOR_INVERSE },
        headerLeft: (navigation) => (
          <HeaderBackButton
            // {...props}
            tintColor={Colors.SET_COLOR}
            onPress={() => {
              setSelectedFiles([]);
              setSettingsMenu(false);
            }}
            color={Colors.SET_COLOR} />
        ),
        headerRight: () => (
          selectedFiles.length == 1 ?
            <View style={{ flexDirection: "row" }}>
              <IconFeather name="book-open" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={() => openFile(selectedFiles[0])} />
              <IconEntypo name="share" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} />
              <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteFiles} />
            </View> :
            <View style={{ flexDirection: "row" }}>
              <IconEntypo name="share" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} />
              <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteFiles} />
            </View>
        )
      }) : ({
        headerTitle: "Welcome",
        headerTitleAlign: 'center',
        headerTintColor: Colors.SET_COLOR_INVERSE,
        headerStyle: { backgroundColor: Colors.SET_COLOR },
      })
    );
  }, [settingsMenu, selectedFiles]);

  const deleteFiles = async () => {
    const len = selectedFiles.length;

    try {
      for (let i = 0; i < len; i++) {

        const del = await RNFetchBlob.fs.unlink(`${Directory.folderDocument}/${selectedFiles[i]}`);
        console.log("FILE DELETED", del);

      }
      await getFiles();
      setSettingsMenu(false);
      setSelectedFiles([]);
    }
    catch (err) {
      console.log("NO FILE DELETED", err);
    }
  }

  const onFileSettingsHandler = (item) => {
    console.log("HANDLING SETTINGS", item);
    setSelectedFiles(current => current.concat(item));
    setSettingsMenu(true);
  }

  const openFile = async (item) => {
    console.log("OPEN FILE");
    await FileViewer.open(`${Directory.folderDocument}/${item}`)
  }

  const onUnSelectHandler = (fileId) => {
    let arr = selectedFiles.filter(file => file != fileId);
    setSelectedFiles(arr);
    if (!arr.length) {
      setSettingsMenu(false);
    }
  }


  const renderFile = itemData => {
    return <PdfCard fileName={itemData.item} fileSettings={onFileSettingsHandler} onOpenFile={openFile} settingMenu={settingsMenu} fileSelected={selectedFiles.indexOf(itemData.item) >=0 } unSelect={onUnSelectHandler}/>
  }

  return (
    <View style={styles.screen}>
      <View style={styles.files}>
        <FlatList data={images} keyExtractor={item => item} numColumns={2} renderItem={renderFile} />
      </View>
      {!settingsMenu ?
        <View style={styles.cameraButtonView}>
          <Button color={Colors.primary} title="Camera" onPress={() => {
            props.navigation.navigate("Pages");
          }} />
        </View>
        :
        <View></View>
      }
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