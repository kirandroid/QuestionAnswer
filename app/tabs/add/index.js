import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Choose an Image",
  takePhotoButtonTitle: "Take photo with your camera",
  chooseFromLibraryButtonTitle: "Choose photo from library"
};

export default class AddScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("post");
    this.postImageRef = firebase.storage().ref();
    this.state = {
      postInput: "",
      currentUser: "",
      avatarSource: null,
      pic: "",
      picName: "",
      picType: "",
      imageUrl: "",
      fullName: "xc",
      email: "",
      coverImage: "",
      hasCover: null,
      hasProfilePic: null,
      profilePic: "",
      username: ""
    };
  }

  asy = async () => {
    console.log("In Display");

    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      this.setState({
        fullName: parsed.fullName,
        email: parsed.email,
        coverImage: parsed.coverImage,
        hasCover: parsed.hasCover,
        hasProfilePic: parsed.hasProfilePic,
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

  updatePostInput(value) {
    this.setState({
      postInput: value
    });
  }

  addPost() {
    // var uploadTask = firebase
    //   .storage()
    //   .ref("post/" + this.state.picName)
    //   .putFile(this.state.pic);

    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log("Upload is " + progress + "% done");
    //   switch (snapshot.state) {
    //     case firebase.storage.TaskState.PAUSED:
    //       console.log("Upload is paused");
    //       break;
    //     case firebase.storage.TaskState.RUNNING:
    //       console.log("Upload is running");
    //       break;
    //     case firebase.storage.TaskState.SUCCESS:
    //       console.log("Success");
    //       firebase
    //         .storage()
    //         .refFromURL(
    //           "gs://questionanswer-3cd3f.appspot.com/post/" + this.state.picName
    //         )
    //         .getDownloadURL()
    //         .then(url => {
    //           console.log(url);
    //           this.setState({ imageUrl: url });
    //         })
    //         .then(() => {
    //           this.ref.add({
    //             postText: this.state.postInput,
    //             hasImage: true,
    //             active: true,
    //             postImage: this.state.imageUrl,
    //             postUserId: this.state.currentUser.uid,
    //             postId: "jhgjgkj",
    //             postDate: firebase.firestore.FieldValue.serverTimestamp()
    //           });
    //         })
    //         .then(() => {
    //           this.setState({
    //             avatarSource: null,
    //             postInput: ""
    //           });
    //         });
    //       break;
    //   }
    // });

    firebase
      .storage()
      .ref("post/" + this.state.picName)
      .putFile(this.state.pic)
      .then(() => {
        firebase
          .storage()
          .refFromURL(
            "gs://questionanswer-3cd3f.appspot.com/post/" + this.state.picName
          )
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ imageUrl: url });
          })
          .then(() => {
            this.ref.add({
              postText: this.state.postInput,
              hasImage: true,
              active: true,
              postImage: this.state.imageUrl,
              postUserId: this.state.currentUser.uid,
              postId: "jhgjgkj",
              postDate: firebase.firestore.FieldValue.serverTimestamp(),
              fullName: this.state.fullName,
              email: this.state.email,
              hasProfilePic: this.state.hasProfilePic,
              profilePic: this.state.profilePic,
              username: this.state.username,
              likes: [],
              dislikes: [],
              comments: []
            });
          });
      })
      .then(() => {
        this.setState({
          postInput: "",
          avatarSource: null
        });
      });
  }

  choosePhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source,
          pic: response.uri,
          picName: response.fileName,
          picType: response.type
        });
      }
    });
  }
  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Add"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerUserAvatar}>
              <TouchableOpacity onPress={this.asy}>
                <UserAvatar name={this.state.fullName} size={60} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerUserName}>
              <Text style={{ fontSize: 18 }}>{this.state.fullName}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <TextInput
              value={this.state.postInput}
              onChangeText={text => this.updatePostInput(text)}
              style={{ height: 180 }}
              underlineColorAndroid="transparent"
              placeholder={"What is you're problem man!"}
              placeholderTextColor={"#9E9E9E"}
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <View style={styles.photoContainer}>
            <Image
              source={this.state.avatarSource}
              style={{ width: "100%", height: 300, margin: 10 }}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerItems}>
              <Icon
                name="ios-camera"
                color="grey"
                size={24}
                onPress={() => this.choosePhoto()}
              />
            </View>
            <View style={styles.footerItems}>
              <Icon name="ios-pricetags" color="grey" size={24} />
            </View>
            <View style={styles.footerItems}>
              <Icon name="ios-person-add" color="grey" size={24} />
            </View>
            <View style={styles.footerItemRest}>
              <Button title="Post" onPress={() => this.addPost()} />
            </View>
          </View>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    flex: 2,
    flexDirection: "row"
  },

  headerUserAvatar: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },

  headerUserName: {
    flex: 7,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  content: {
    flex: 5
  },

  photoContainer: {
    flex: 2
  },

  footer: {
    flex: 1,
    flexDirection: "row"
  },
  footerItems: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  footerItemRest: {
    flex: 4
  }
});
