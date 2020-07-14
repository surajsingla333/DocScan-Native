import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Platform } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';


import { RNCamera } from 'react-native-camera';
import Colors from '../constants/Colors';


const AddImage = props => {

  console.log("IN IMAGE SELECTOR");

  const [pickedImage, setPickedImage] = useState();

  // const verifyPermissions = async () => {
  //   const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  //   if (result.status !== 'granted') {
  //     Alert.alert(
  //       'Insufficient permissions!',
  //       'You need to grant camera permissions to use this app.',
  //       [{ text: 'Okay' }]
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  // const takeImageHandler = async () => {
  // const hasPermission = await verifyPermissions();
  // if (!hasPermission) {
  //   return;
  // }
  //   const image = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     quality: 0.5
  //   });

  //   setPickedImage(image);
  //   // props.onImageTaken(image.uri);

  // };

  const verifyPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissions = await check(PERMISSIONS.ANDROID.CAMERA);
        switch (permissions) {
          case RESULTS.UNAVAILABLE:
            return { response: false, data: "Feature not available" };
            break;
          case RESULTS.DENIED:
            return { response: false, data: "Permission denied, allow to continue." };
            break;
          case RESULTS.GRANTED:
            return { response: true, data: "Accessing camera" };
            break;
          case RESULTS.BLOCKED:
            return { response: false, data: "Permission blocked! Goto app settings to unblock." };
            break;
        }
      }

      catch (err) {
        console.log("Error in permissions", err);
        return { response: false, data: "Error in permissions" }
      }
    }
    else {
      try {
        const permissions = await check(PERMISSIONS.IOS.CAMERA);
        switch (permissions) {
          case RESULTS.UNAVAILABLE:
            return { response: false, data: "Feature not available" };
            break;
          case RESULTS.DENIED:
            return { response: false, data: "Permission denied, allow to continue." };
            break;
          case RESULTS.GRANTED:
            return { response: true, data: "Accessing camera" };
            break;
          case RESULTS.BLOCKED:
            return { response: false, data: "Permission blocked! Goto app settings to unblock." };
            break;
        }
      }
      catch (err) {
        console.log("Error in permissions", err);
        return { response: false, data: "Error in permissions" }
      }
    }
  }

  const takeImageHandler = async () => {
    const permission = await verifyPermissions();
    if (permission.response) {
      console.log("PERMISSION DATA", permission.data);
      ImagePicker.openCamera({
        // width: 300,
        // height: 400,
        freeStyleCropEnabled: true,
        cropping: true,
      }).then(image => {
        console.log("UPADTED IMG", image);
        setPickedImage(image);
        props.onImageTaken(image);
      }).catch(err => {
        console.log("ERR", err);
      });
    }
    else {
      console.log("PERMISSINO ERROR", permission.data);
    }
    // ImagePicker.showImagePicker((response) => {
    //   // console.log('Response = ', response.uri);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     // console.log("RESP", response);
    //     const source = { uri: response.uri };

    //     console.log("TYPE OF RESP", typeof (response));

    //     setPickedImage(response);
    //     props.onImageTaken(response);

    //   }
    // });
  };


  return (
    <TouchableOpacity style={styles.imagePicker} onPress={takeImageHandler}>
      <View style={styles.buttonView}>
        <Icon name="ios-camera" size={50} color={Colors.accent} />
      </View>
    </TouchableOpacity>
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
  // imagePreview: {
  //   flex: 1,
  //   height: Dimensions.get('window').height / 3,
  //   justifyContent: 'center',
  //   alignItems: "center",
  // },
  // buttonView: {
  //   margin: 40,
  // }

})

export default AddImage;

// import React, { useState } from 'react';
// import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

// import Colors from '../constants/Colors';

// const AddImage = props => {

//   const [pickedImage, setPickedImage] = useState();

//   const verifyPermissions = async () => {
//     const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
//     if (result.status !== 'granted') {
//       Alert.alert(
//         'Insufficient permissions!',
//         'You need to grant camera permissions to use this app.',
//         [{ text: 'Okay' }]
//       );
//       return false;
//     }
//     return true;
//   };

//   const takeImageHandler = async () => {
//     const hasPermission = await verifyPermissions();
//     if (!hasPermission) {
//       return;
//     }
//     const image = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 0.5
//     });
//     console.log("IMAGE", image);
//     setPickedImage(image);
//     props.onImageTaken(image);

//   };

//   return (
//     <View style={styles.imagePicker}>
//       <View style={styles.imagePreview}>
//         {!pickedImage ? (<Text>No image picked yet.</Text>) :
//           (<Image style={{ width: (pickedImage.width) / 10, height: (pickedImage.height) / 10 }} source={{ uri: pickedImage.uri, width: (pickedImage.width) / 10, height: (pickedImage.height) / 10 }} />)}
//       </View>
//       <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   imagePicker: {
//     alignItems: 'center',
//     marginBottom: 15
//   },
//   imagePreview: {
//     width: "100%",
//     height: 200,
//     marginBottom: 10,
//     justifyContent: 'center',
//     alignItems: "center",
//     borderColor: '#ccc',
//     borderWidth: 1
//   },
//   // image: {
//   //   width: '100%',
//   //   height: '100%'
//   // }

// })

// export default AddImage;