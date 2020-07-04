import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>
        Home
      </Text>
      <Button title="Camera" onPress={() => {
        props.navigation.navigate("Camera");
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
})

export default HomeScreen;