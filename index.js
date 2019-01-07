/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => HomeScreen);
