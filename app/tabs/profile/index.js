import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Button
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import firebase from "react-native-firebase";
import FastImage from "react-native-fast-image";

export default class ProfileScreen extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  deleteUserId = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  // <Text>Hello {currentUser && currentUser.email}</Text>
  // <Button title="Logout" onPress={() => firebase.auth().signOut()} />
  render() {
    const { currentUser } = this.state;
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Profile"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <View style={styles.profileCover}>
              <FastImage
                style={{ height: "100%", width: Dimensions.width }}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQYTJwz3vNzCUITCBgEOkcKGW_GUYp4m45R_xdapaK8pSBHWLZ",
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.profileDetail}>
              <Button
                title="Logout"
                onPress={() =>
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      this.deleteUserId;
                    })
                }
              />

              <Text>{currentUser && currentUser.email}</Text>
            </View>
          </View>
          <View style={styles.profilePost} />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  profileHeader: {
    flex: 7,
    backgroundColor: "red"
  },

  profileCover: {
    flex: 5
  },

  profileDetail: {
    flex: 2
  },

  profilePost: {
    flex: 3,
    backgroundColor: "blue"
  }
});
