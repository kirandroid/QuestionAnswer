import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import firebase from "react-native-firebase";
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "react-navigation";
import editprofile from "./editprofile";
import UserAvatar from "react-native-user-avatar";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  // state = { currentUser: null };
  constructor() {
    super();
    this.state = {
      fullName: "kc",
      profilePic: "",
      email: "",
      username: ""
    };
  }

  asy = async () => {
    console.log("In Display");

    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      console.log(parsed.fullName);
      this.setState({
        fullName: parsed.fullName,
        email: parsed.email,
        profilePic: parsed.profilePic,
        username: parsed.username
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.asy();
  }

  deleteUserId = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <FastImage
              style={{ height: 200, width: Dimensions.width }}
              source={{
                uri:
                  "https://images.fatherly.com/wp-content/uploads/2018/08/the-meg-warner-bros-530x303.jpg?q=65&enable=upscale&w=600",

                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.avatar}>
            <UserAvatar
              name={this.state.fullName}
              size={130}
              src={this.state.profilePic}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.fullName}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <Text style={styles.description}>Add Bio Here....</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text>View Questions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      this.deleteUserId;
                    })
                }
              >
                <Text>LogOut</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("editprofile")}
              >
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen
  },
  editprofile: {
    screen: editprofile
  }
});
const styles = StyleSheet.create({
  header: {
    height: 200
  },
  avatar: {
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
