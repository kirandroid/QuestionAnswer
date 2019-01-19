import React from "react";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";

export default class firstTimeLogin extends React.Component {
  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Test"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Text>Explore Screen</Text>
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
