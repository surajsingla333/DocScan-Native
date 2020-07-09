import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Platform, Alert, Modal, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

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
import Title from '../constants/Title';

const HomeScreen = props => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [settingsMenu, setSettingsMenu] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  // const [oldName, setOldName] = useState('');

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
              <IconFeather name="edit-2" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={() => { editFileName() }} />
              {/* <IconFeather name="book-open" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={() => openFile(selectedFiles[0])} /> */}
              <IconEntypo name="share" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} />
              <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteFiles} />
            </View> :
            <View style={{ flexDirection: "row" }}>
              <IconEntypo name="share" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} />
              <IconMaterial name="delete" size={25} color={Colors.SET_COLOR} style={{ marginRight: 25 }} onPress={deleteFiles} />
            </View>
        )
      }) : ({
        headerTitle: Title.title,
        headerTitleAlign: 'center',
        headerTintColor: Colors.SET_COLOR_INVERSE,
        headerStyle: { backgroundColor: Colors.SET_COLOR },
        headerLeft: () => (<View></View>),
        headerRight: () => (<View></View>),
      })
    );
  }, [settingsMenu, selectedFiles]);

  const editFileName = async () => {

    setModalVisible(true);

    console.log("EDIT FILE");

    // return (

    // );


    // Alert.alert(
    //   "Rename the File...",
    //   "Type new file name.",
    //   [
    //     {
    //       text: "Discard",
    //       onPress: () => {
    //         console.log("Cancel Pressed");
    //         goBack();
    //       },
    //       style: "cancel"
    //     },
    //     { text: "Stay", onPress: () => console.log("OK Pressed") }
    //   ],
    //   { cancelable: false }
    // );
  }

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

  const renameFile = async () => {
    if (!newName) {
      Alert.alert(
        "No name is provided!",
        "Please type a name",
        [
          {
            text: "Okay",
            onPress: () => {
              console.log("Cancel Pressed");
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }
    try {
      const res = await RNFetchBlob.fs.mv(`${Directory.folderDocument}/${selectedFiles[0]}`, `${Directory.folderDocument}/${newName}.pdf`);
      console.log("RESPONSE", res);
      setModalVisible(!modalVisible);
      setNewName('');

      await getFiles();
      setSettingsMenu(false);
      setSelectedFiles([]);
    }
    catch (err) {
      console.log("File name not changed", err);
    }

  }

  const renderFile = itemData => {
    return <PdfCard fileName={itemData.item} fileSettings={onFileSettingsHandler} onOpenFile={openFile} settingMenu={settingsMenu} fileSelected={selectedFiles.indexOf(itemData.item) >= 0} unSelect={onUnSelectHandler} />
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

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   console.log("CLICK");
        // }}
        >
          <TouchableOpacity style={styles.modalView} onPress={() => { console.log("TOUCHED"); setModalVisible(false) }}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent} >
                <Text style={styles.modalHeader}>Rename File..</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={text => setNewName(text)}
                  value={newName}
                />
                <TouchableOpacity style={styles.modalButton}
                  onPress={() => {
                    renameFile();
                  }}>
                  <Text style={styles.buttonText}>
                    CHANGE NAME
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  modalContent: {
    // flex: 1,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 3,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalText: {

  },
  inputText: {
    height: '20%',
    width: '50%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 15,
    color: Colors.primary
  },
  modalButton: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: Colors.accent,
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