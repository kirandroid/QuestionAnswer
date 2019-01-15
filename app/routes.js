import React from "react";
import { Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import AddScreen from "./tabs/add";
import ExploreScreen from "./tabs/explore";
import HomeScreen from "./tabs/home";
import ChatScreen from "./tabs/chat";
import ProfileScreen from "./tabs/profile";

const Root = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-apps" color={tintColor} size={24} />
        )
      }
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    Add: {
      screen: AddScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-add-circle" color={tintColor} size={24} />
        )
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-chatbubbles" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Chat", "Add", "Explore", "Profile"],
    activeTintColor: "orange",
    shifting: false,
    labeled: false,
    barStyle: {
      backgroundColor: "white"
    }
  }
);

const App = createAppContainer(Root);
export default App;
