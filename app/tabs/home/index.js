import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import firebase from "react-native-firebase";
import Moment from "react-moment";
import "moment-timezone";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase
      .firestore()
      .collection("post")
      .orderBy("postDate", "desc");
    this.refUser = firebase.firestore().collection("post");
    this.refQuick = firebase.firestore().collection("post");
    this.unsubscribe = null;

    this.state = {
      loading: true,
      post: [],
      currentUser: null,
      postInput: "",
      fullName: "xc",
      hasProfilePic: null,
      profilePic: ""
    };
  }

  updatePostInput(value) {
    this.setState({
      postInput: value
    });
  }
  test() {
    console.log(this.state.currentUser.uid);
    const markers = [];
    firebase
      .firestore()
      .collection("user")
      .doc(this.state.currentUser.uid)
      .get()
      .then(doc => {
        // markers.push(doc.data());
        const {
          firstName,
          lastName,
          email,
          coverImage,
          hasCover,
          hasProfilePic,
          profilePic,
          username
        } = doc.data();

        markers.push({
          lastName,
          firstName,
          email,
          coverImage,
          hasCover,
          hasProfilePic,
          profilePic,
          username
        });
      })
      .then(() => {
        console.log(markers);
        console.log(markers[0].firstName);
      });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    console.log("user: " + currentUser.uid);
    const userData = [];
    firebase
      .firestore()
      .collection("user")
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        // markers.push(doc.data());
        const {
          firstName,
          lastName,
          email,
          coverImage,
          hasCover,
          hasProfilePic,
          profilePic,
          username
        } = doc.data();

        userData.push({
          lastName,
          firstName,
          email,
          coverImage,
          hasCover,
          hasProfilePic,
          profilePic,
          username
        });
      })
      .then(() => {
        var obj = {
          fullName: userData[0].firstName + " " + userData[0].lastName,
          email: userData[0].email,
          coverImage: userData[0].coverImage,
          hasCover: userData[0].hasCover,
          hasProfilePic: userData[0].hasProfilePic,
          profilePic: userData[0].profilePic,
          username: userData[0].username
        };
        AsyncStorage.setItem("user", JSON.stringify(obj));
        console.log("In Save");
      })
      .then(async () => {
        console.log("In Display");

        try {
          let user = await AsyncStorage.getItem("user");
          let parsed = JSON.parse(user);
          this.setState({
            fullName: parsed.fullName,
            hasProfilePic: parsed.hasProfilePic,
            profilePic: parsed.profilePic
          });
        } catch (error) {
          console.log(error);
        }
      });
  }

  addPost() {
    this.refQuick.add({
      postText: this.state.postInput,
      hasImage: false,
      active: true,
      postImage: "",
      postUserId: this.state.currentUser.uid,
      postId: "jhgjgkj",
      postDate: firebase.firestore.FieldValue.serverTimestamp()
    });
    this.setState({
      postInput: ""
    });
  }

  onCollectionUpdate = querySnapshot => {
    const post = [];

    querySnapshot.forEach(doc => {
      const {
        postText,
        postImage,
        postId,
        postDate,
        postUserId,
        fullName,
        hasProfilePic,
        profilePic,
        username
      } = doc.data();

      post.push({
        key: doc.id,
        doc,
        postText,
        postImage,
        postId,
        postDate,
        postUserId,
        fullName,
        hasProfilePic,
        profilePic,
        username
      });
    });
    this.setState({
      post,
      loading: false
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Activity Feed"
          />
        </Appbar.Header>

        <View style={styles.container}>
          {this.state.loading ? null : (
            <FlatList
              data={this.state.post}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>Sorry No result this time!</Text>
                </View>
              }
              ListHeaderComponent={
                <View style={styles.addPostAreaCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.addPostUserAvatar}>
                      <TouchableOpacity>
                        <UserAvatar name={this.state.fullName} size={40} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.addPostUserStatus}>
                      <TextInput
                        style={{ height: 80, textAlign: "left" }}
                        value={this.state.postInput}
                        onChangeText={text => this.updatePostInput(text)}
                        underlineColorAndroid="transparent"
                        placeholder={"What is you're problem man!"}
                        placeholderTextColor={"#9E9E9E"}
                        numberOfLines={10}
                        multiline={true}
                      />
                    </View>
                    <View style={styles.addPostImage}>
                      <TouchableOpacity onPress={() => this.addPost()}>
                        <Icon name="md-send" color="grey" size={22} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.postCard}>
                  <View style={styles.postBody}>
                    <View style={styles.postHeader}>
                      <View style={styles.postAvatar}>
                        <UserAvatar name={item.fullName} size={50} />
                      </View>
                      <View style={styles.postUserDetail}>
                        <View style={styles.postUserName}>
                          <Text style={{ fontSize: 18 }}>{item.fullName}</Text>
                        </View>
                        <View style={styles.postUserPostTime}>
                          <Text style={{ fontSize: 10, color: "grey" }}>
                            <Moment element={Text} fromNow>
                              {item.postDate}
                            </Moment>
                          </Text>
                        </View>
                      </View>
                      {item.postUserId == currentUser.uid ? (
                        <View style={styles.postDelete}>
                          <TouchableOpacity
                            onPress={() =>
                              firebase
                                .firestore()
                                .collection("post")
                                .doc(item.key)
                                .delete()
                            }
                          >
                            <Icon name="md-trash" color="grey" size={18} />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.postContent}>
                      <View style={styles.postStatus}>
                        <Text>{item.postText}</Text>
                      </View>
                      {item.postImage == "" ? null : (
                        <View style={styles.postImage}>
                          <FastImage
                            style={{ height: 200, width: Dimensions.width }}
                            source={{
                              uri: item.postImage,
                              priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.postFooter}>
                    <View style={styles.postActivityDetailLikeDislike}>
                      <Text>23 Likes</Text>

                      <Text>23 Dislikes</Text>
                    </View>

                    <View style={styles.postActivityDetailComment}>
                      <Text>23 Comment</Text>
                    </View>
                  </View>

                  <View style={styles.postControl}>
                    <View style={styles.postActivityControlLikeDislike}>
                      <Icon name="md-thumbs-up" color="grey" size={25} />

                      <Icon name="md-thumbs-down" color="grey" size={25} />
                    </View>
                    <View style={styles.postActivityControlComment}>
                      <Icon name="md-chatbubbles" color="grey" size={25} />
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.key}
            />
          )}
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  addPostAreaCard: {
    elevation: 3,
    backgroundColor: "#FFFFFF"
  },

  postCard: {
    elevation: 3,
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3
  },

  postBody: {
    flex: 9
  },

  postHeader: {
    flex: 1,
    flexDirection: "row"
  },

  postAvatar: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  postUserDetail: {
    flex: 7
  },

  postDelete: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  postUserName: {
    flex: 2
  },

  postUserCollege: {
    flex: 1
  },

  postUserPostTime: {
    flex: 1
  },

  postContent: {
    flex: 1
  },

  postStatus: {
    flex: 3,
    margin: 10
  },

  postImage: {
    flex: 7
  },

  postFooter: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  postActivityDetailLikeDislike: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5
  },

  postActivityDetailComment: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },

  postControl: {
    flex: 1,
    flexDirection: "row"
  },
  postActivityControlLikeDislike: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5
  },

  postActivityControlComment: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },

  addPostUserAvatar: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  addPostUserStatus: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center"
  },

  addPostImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
