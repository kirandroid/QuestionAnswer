import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import the different screens
import loadingScreen from "./app/screens/loadingScreen";
import loginScreen from "./app/screens/loginScreen";
import routes from "./app/routes";

// create our app's navigation stack
const Root = createSwitchNavigator(
  {
    loadingScreen,
    loginScreen,
    routes
  },
  {
    initialRouteName: "loadingScreen"
  }
);
const App = createAppContainer(Root);
export default App;
