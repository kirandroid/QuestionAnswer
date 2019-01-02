import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navContainer} />
        <View style={styles.bodyContainer} >
        <Text>sample Text input for changes</Text></View>
        <View style={styles.bottomContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  navContainer: {
    flex: 1,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    height: 50
  },

  bodyContainer: {
    flex: 9,
    backgroundColor: "#FFFFFF"
  },

  bottomContainer: {
    flex: 1,
    backgroundColor: "#FF00FF"
  }
});
