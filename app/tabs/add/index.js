import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Button
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "my pic app",
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
      currentUser: null,
      avatarSource: null,
      pic: null,
      picName: null,
      imageUrl: null
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  updatePostInput(value) {
    this.setState({
      postInput: value
    });
  }

  addPost() {
    const uploadImage = (path, mime = "application/octet-stream") => {
      console.log("1");
      return new Promise((resolve, reject) => {
        console.log("2");
        const imageRef = firebase
          .storage()
          .ref("post/" + this.state.picName)
          .child(this.state.pic);

        return imageRef
          .put(path, { contentType: mime })
          .then(() => {
            console.log("3");
            return imageRef.getDownloadURL();
          })
          .then(url => {
            console.log("4");
            resolve(url);
          })
          .catch(error => {
            reject(error);
            console.log("Error uploading image: ", error);
          });
      });
    };
    console.log(uploadImage);

    this.ref.add({
      postText: this.state.postInput,
      hasImage: true,
      active: true,
      postImage: "",
      postUserId: this.state.currentUser.uid,
      postId: "jhgjgkj",
      postDate: firebase.firestore.FieldValue.serverTimestamp()
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
          picName: response.fileName
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
              <UserAvatar name="Kiran i" size={60} />
            </View>
            <View style={styles.headerUserName}>
              <Text style={{ fontSize: 18 }}>{this.state.pic}</Text>
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
