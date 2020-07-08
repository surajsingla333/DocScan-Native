import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const PdfCard = props => {

  return (

    <View style={styles.file}>
      <TouchableOpacity onPress={props.settingMenu ? () => {
        props.fileSelected ? props.unSelect(props.fileName) :
          props.fileSettings(props.fileName)
      } : () => { props.onOpenFile(props.fileName) }} onLongPress={props.settingMenu ? null : () => props.fileSettings(props.fileName)}>
        <View style={styles.content}>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              PDF FILE
            </Text>
          </View>
          <View style={props.fileSelected ? { ...styles.footer, backgroundColor: Colors.accent } : { ...styles.footer, backgroundColor: Colors.primary }}>
            <Text style={props.fileSelected ? { ...styles.footerText, color: Colors.primary } : { ...styles.footerText, color: Colors.accent }} numberOfLines={1} >{props.fileName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  file: {
    flex: 0.5,
    // padding: 10,
  },
  content: {
    height: Dimensions.get('window').height / 5,
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    overflow: 'hidden',
    margin: 10
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
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    height: '30%',
    padding: 10,
  },
  footerText: {
    // color: Colors.accent,
    textAlign: 'center'
  }
});

export default PdfCard;