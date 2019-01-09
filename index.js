// import { AppRegistry } from "react-native";
// import React, { Component } from 'react';
// import Routes from './app/routes'
// import { name as appName } from "./app.json";

// const App = () => (
//     <Routes />
// )

// AppRegistry.registerComponent(appName, () => App);

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from './App'

AppRegistry.registerComponent(appName, () => App);