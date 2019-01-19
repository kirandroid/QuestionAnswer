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

export default class ProfileScreen extends React.Component {
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

  // <Text>Hello {currentUser && currentUser.email}</Text>
  // <Button title="Logout" onPress={() => firebase.auth().signOut()} />
  //   render() {
  //     const { currentUser } = this.state;
  //     return (
  //       <PaperProvider>
  //         <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
  //         <Appbar.Header style={{ backgroundColor: "orange" }}>
  //           <Appbar.Content
  //             titleStyle={{ alignSelf: "center", color: "white" }}
  //             title="Profile"
  //           />
  //         </Appbar.Header>

  //         <View style={styles.container}>
  //           <View style={styles.profileHeader}>
  //             <View style={styles.profileCover}>
  //               <FastImage
  //                 style={{ height: "100%", width: Dimensions.width }}
  //                 source={{
  //                   uri:
  //                     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQYTJwz3vNzCUITCBgEOkcKGW_GUYp4m45R_xdapaK8pSBHWLZ",
  //                   priority: FastImage.priority.high
  //                 }}
  //                 resizeMode={FastImage.resizeMode.cover}
  //               />
  //             </View>
  //             <View style={styles.profileDetail}>
  //               <Button
  //                 title="Logout"
  // onPress={() =>
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       this.deleteUserId;
  //     })
  // }
  //               />

  //               <Text>{currentUser && currentUser.email}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.profilePost} />
  //         </View>
  //       </PaperProvider>
  //     );
  //   }
  // }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <FastImage
            style={styles.avatar}
            source={{
              uri: this.state.profilePic,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.fullName}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
                electram expetendis, omittam deseruisse consequuntur ius an,
              </Text>

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
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  // name: {
  //   fontSize: 22,
  //   color: "#FFFFFF",
  //   fontWeight: "600"
  // },
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
    // fontWeight: "600"
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
