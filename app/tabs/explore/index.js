import React from "react";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { createStackNavigator } from "react-navigation";
import test from "./test";

class ExploreScreen extends React.Component {
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
            title="Test"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Text>Explore Screen</Text>
          <Button
            title="Go to Test"
            onPress={() => this.props.navigation.navigate("test")}
          />
        </View>
      </PaperProvider>
    );
  }
}

export default createStackNavigator({
  Explore: {
    screen: ExploreScreen
  },
  test: {
    screen: test
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
