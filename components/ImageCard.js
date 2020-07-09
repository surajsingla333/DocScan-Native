import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../constants/Colors';

const ImageCard = props => {
  return (

    <View style={styles.screen}>
      <TouchableOpacity onPress={props.settingMenu ? () => {
        props.imageSelected ? props.unSelect(props.id) :
          props.imageSettings(props.id)
      } : () => { props.onEditImage(props.id) }}
        onLongPress={props.settingMenu ? null : () => props.imageSettings(props.id)}>
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: props.image.path }} />
          </View>
          <View style={props.imageSelected ? { ...styles.pageNumber, backgroundColor: Colors.primary } : { ...styles.pageNumber, backgroundColor: Colors.accent }}>
            <Text style={props.imageSelected ? { ...styles.page, color: Colors.accent } : { ...styles.page, color: Colors.primary }}>{props.id + 1}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 2,
    borderColor: Colors.primary,
    marginTop: 10,
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').height / 3,
  },
  content: {
    justifyContent: 'center',
    // height: Dimensions.get('window').height / 5,
    // backgroundColor: '#ccc',
    // justifyContent: 'space-between',
    // borderRadius: 10,
    // borderColor: Colors.primary,
    // borderWidth: 2,
    // overflow: 'hidden',

  },
  imageView: {
    // padding: 5
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pageNumber: {
    textAlign: 'center',
    // backgroundColor: Colors.accent,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomColor: Colors.primary,
    padding: 5
  },
  page: {
    textAlign: 'center',
    // color: Colors.primary
  }
});

export default ImageCard;