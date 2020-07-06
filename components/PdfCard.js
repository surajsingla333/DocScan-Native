import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const PdfCard = props => {
  return (

    <View style={styles.file}>
      <TouchableOpacity onPress={props.onOpenFile}>
        <View style={styles.content}>
          <View style={styles.description}>
            {/* <ImageBackground source={{ uri: props.image }} style={styles.bgImage}> */}
            {/* <View style={styles.titleContainer}> */}
            <Text style={styles.descriptionText}>
              {/* style={styles.title} numberOfLines={1}>{props.title} */}
              PDF FILE
            </Text>
            {/* </View> */}
            {/* </ImageBackground> */}
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText} numberOfLines={1} >{props.fileName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  file: {
    flex: 1,
    margin: 10,
  },
  content: {
    height: Dimensions.get('window').height / 5,
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    overflow: 'hidden'
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    textAlign: 'center'
  },
  footer: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    height: '30%',
    padding: 10,
  },
  footerText: {
    color: Colors.accent,
    textAlign: 'center'
  }
});

export default PdfCard;

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