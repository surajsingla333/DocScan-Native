import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../constants/Colors';

const ImagePage = props => {
  return (

    <View style={styles.screen}>
      <TouchableOpacity onPress={props.onEditImage}>
        <View style={styles.content}>
          <View style={styles.imageView}>
          <Image style={{ margin: 5, width: props.image.width/10, height: props.image.height/10, maxWidth: Dimensions.get('window').width / 2.5 }} source={{ uri: props.image.uri }} />
          
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    // height: Dimensions.get('window').height / 5,
    // backgroundColor: '#ccc',
    // justifyContent: 'space-between',
    // borderRadius: 10,
    // borderColor: Colors.primary,
    // borderWidth: 2,
    // overflow: 'hidden'
  },
  imageView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default ImagePage;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// const MealItem = props => {
//   return (

//   )
// }

// const styles = StyleSheet.create({
//   mealRow: {
//     flexDirection: 'row',
//   },
//   mealItem: {
//     height: 200,
//     width: '100%',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     overflow: 'hidden'
//     // margin: 10,
//   },
//   mealHeader: {
//     height: '85%'
//   },
//   mealDetail: {
//     paddingHorizontal: 10,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '15%'
//   },
//   bgImage: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'flex-end'
//   },
//   titleContainer: {
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//   },
//   title: {
//     fontSize: 20,
//     color: 'white',
//     textAlign: 'center'
//   }
// });