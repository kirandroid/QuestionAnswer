import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";

var DeviceInfo = require("react-native-device-info");

export default class test extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Explore"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Text>test Screen</Text>
          <Text>
            {DeviceInfo.getManufacturer()} {DeviceInfo.getModel()}
          </Text>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
