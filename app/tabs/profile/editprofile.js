import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Provider as PaperProvider, Appbar, Button } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "react-navigation";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Choose an Image",
  takePhotoButtonTitle: "Take photo with your camera",
  chooseFromLibraryButtonTitle: "Choose photo from library"
};

export default class test extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      currentUser: "",
      fullName: "kc",
      hasCover: false,
      firstNameInput: "",
      lastNameInput: "",
      userNameInput: "",
      bioInput: "",
      profilePicInput: "",
      coverImageInput: "",
      profilePic: "",
      profilePicName: "",
      profilePicType: "",
      coverPic: "",
      coverPicName: "",
      coverPicType: "",
      profilePicUrl: "",
      coverImageUrl: "",
      profilePicUrlCompare: "",
      coverImageUrlComapare: ""
    };
  }

  updateFirstNameInput(value) {
    this.setState({
      firstNameInput: value
    });
  }

  updateLastNameInput(value) {
    this.setState({
      lastNameInput: value
    });
  }
  updateUserNameInput(value) {
    this.setState({
      userNameInput: value
    });
  }
  updateBioInput(value) {
    this.setState({
      bioInput: value
    });
  }
  asy = async () => {
    console.log("In Display");

    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      console.log(parsed.fullName);
      this.setState({
        fullName: parsed.fullName,
        profilePic: parsed.profilePic,
        userNameInput: parsed.username,
        hasCover: parsed.hasCover,
        coverPic: parsed.coverImage,
        profilePicUrlCompare: parsed.profilePic,
        coverImageUrlComapare: parsed.coverImage,
        bioInput: parsed.bio,
        firstNameInput: parsed.firstName,
        lastNameInput: parsed.lastName
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

  chooseCoverPhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else {
        this.setState({
          coverPic: response.uri,
          coverPicName: response.fileName,
          coverPicType: response.type
        });
      }
    });
  }

  chooseProfilePhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else {
        this.setState({
          profilePic: response.uri,
          profilePicName: response.fileName,
          profilePicType: response.type
        });
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <PaperProvider>
          <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
          <Appbar.Header style={{ backgroundColor: "orange" }}>
            <Appbar.Content
              titleStyle={{ alignSelf: "center", color: "white" }}
              title="Explore"
            />
          </Appbar.Header>

          <View style={styles.container}>
            <View style={styles.header}>
              <FastImage
                style={{ height: 200, width: Dimensions.width }}
                source={{
                  uri: this.state.coverPic,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              >
                <View
                  style={{
                    alignItems: "flex-end",
                    marginHorizontal: 10,
                    marginVertical: 10
                  }}
                >
                  <Button
                    icon="add-a-photo"
                    mode="contained"
                    onPress={() => this.chooseCoverPhoto()}
                  >
                    Change
                  </Button>
                </View>
              </FastImage>
            </View>
            <View style={styles.avatar}>
              <UserAvatar
                name={this.state.fullName}
                size={130}
                src={this.state.profilePic}
              />
            </View>
            <View style={styles.body}>
              <View style={{ alignItems: "center", marginTop: 25 }}>
                <Button
                  icon="add-a-photo"
                  mode="contained"
                  onPress={() => this.chooseProfilePhoto()}
                >
                  Change
                </Button>
              </View>
              <Text style={styles.textstyle}>First Name</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder=""
                onChangeText={text => this.updateFirstNameInput(text)}
              />
              <Text style={styles.textstyle}>last Name</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder=""
                onChangeText={text => this.updateLastNameInput(text)}
              />
              <Text style={styles.textstyle}>UserName</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder=""
                onChangeText={text => this.updateUserNameInput(text)}
              />
              <Text style={styles.textstyle}>Bio</Text>
              <TextInput
                style={styles.Bio}
                autoCapitalize="none"
                placeholder=""
                onChangeText={text => this.updateBioInput(text)}
              />

              <View style={styles.picturecontainer}>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    if (
                      this.state.profilePic ==
                        this.state.profilePicUrlCompare &&
                      this.state.coverPic == this.state.coverImageUrlComapare
                    ) {
                      firebase
                        .firestore()
                        .collection("user")
                        .doc(this.state.currentUser.uid)
                        .update({
                          firstName: this.state.firstNameInput,
                          lastName: this.state.lastNameInput,
                          username: this.state.userNameInput,
                          Bio: this.state.bioInput
                        });
                    } else {
                      firebase
                        .storage()
                        .ref("user/" + this.state.coverPicName)
                        .putFile(this.state.coverPic)
                        .then(() => {
                          firebase
                            .storage()
                            .refFromURL(
                              "gs://questionanswer-3cd3f.appspot.com/user/" +
                                this.state.coverPicName
                            )
                            .getDownloadURL()
                            .then(url => {
                              console.log(url);
                              this.setState({ coverImageUrl: url });
                            });
                        })
                        .then(() => {
                          firebase
                            .storage()
                            .ref("user/" + this.state.profilePicName)
                            .putFile(this.state.profilePic)
                            .then(() => {
                              firebase
                                .storage()
                                .refFromURL(
                                  "gs://questionanswer-3cd3f.appspot.com/user/" +
                                    this.state.profilePicName
                                )
                                .getDownloadURL()
                                .then(url => {
                                  console.log(url);
                                  this.setState({ profilePicUrl: url });
                                })
                                .then(() => {
                                  firebase
                                    .firestore()
                                    .collection("user")
                                    .doc(this.state.currentUser.uid)
                                    .update({
                                      firstName: this.state.firstNameInput,
                                      lastName: this.state.lastNameInput,
                                      username: this.state.userNameInput,
                                      Bio: this.state.bioInput,
                                      profilePic: this.state.profilePicUrl,
                                      coverImage: this.state.coverImageUrl
                                    });
                                });
                            });
                        });
                    }
                  }}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PaperProvider>
      </ScrollView>
    );
  }
}
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
  compstyle: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  textstyle: {
    marginTop: 10,
    color: "#000000",
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: "normal",
    marginHorizontal: 5
  },
  textInput: {
    width: Dimensions.width,
    marginHorizontal: 5,
    height: 44,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5
  },
  Bio: {
    width: Dimensions.width,
    marginHorizontal: 5,
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 8
  },
  picturecontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    backgroundColor: "orange"
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
  }
});
