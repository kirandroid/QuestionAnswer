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
import { createStackNavigator } from "react-navigation";
import postPage from "./postPage";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
      profilePic: "",
      email: "",
      username: ""
    };
  }

  updatePostInput(value) {
    this.setState({
      postInput: value
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
          username,
          Bio
        } = doc.data();

        userData.push({
          lastName,
          firstName,
          email,
          coverImage,
          hasCover,
          hasProfilePic,
          profilePic,
          username,
          Bio
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
          username: userData[0].username,
          firstName: userData[0].firstName,
          lastName: userData[0].lastName,
          bio: userData[0].Bio
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
            profilePic: parsed.profilePic,
            email: parsed.email,
            username: parsed.username
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
    this.setState({
      postInput: ""
    });
  }

  test() {
    console.log("Start");
    firebase
      .firestore()
      .collection("post")
      .onSnapshot(querySnapshot => {
        const markers = [];
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
            username,
            likes,
            dislikes,
            comments
          } = doc.data();

          markers.push({
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
            username,
            likes,
            dislikes,
            comments
          });
        });
        console.log(markers);
        console.log(markers[0].likes);
        console.log(markers[0].fullName);
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
        username,
        likes,
        dislikes,
        comments
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
        username,
        likes,
        dislikes,
        comments
      });
    });
    console.log(post);
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
                      <TouchableOpacity onPress={() => this.test()}>
                        <UserAvatar
                          name={this.state.fullName}
                          size={40}
                          src={this.state.profilePic}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.addPostUserStatus}>
                      <TextInput
                        style={{ height: 80, textAlign: "left" }}
                        value={this.state.postInput}
                        onChangeText={text => this.updatePostInput(text)}
                        underlineColorAndroid="transparent"
                        placeholder={"Share your problem."}
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
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("postPage", {
                        postId: item.key,
                        postUserId: item.postUserId,
                        postUserName: item.fullName,
                        postUserAvatar: item.profilePic,
                        postDate: item.postDate,
                        postImage: item.postImage,
                        postText: item.postText,
                        likes: item.likes,
                        dislikes: item.dislikes,
                        comments: item.comments.length,
                        currentUser: this.state.currentUser.uid,
                        currentUserName: this.state.fullName,
                        currentUserPic: this.state.profilePic
                      })
                    }
                  >
                    <View style={styles.postBody}>
                      <View style={styles.postHeader}>
                        <View style={styles.postAvatar}>
                          <UserAvatar
                            name={item.fullName}
                            size={50}
                            src={item.profilePic}
                          />
                        </View>
                        <View style={styles.postUserDetail}>
                          <View style={styles.postUserName}>
                            <Text style={{ fontSize: 18 }}>
                              {item.fullName}
                            </Text>
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
                        {item.postText == "" ? null : (
                          <View style={styles.postStatus}>
                            <Text>{item.postText}</Text>
                          </View>
                        )}
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
                  </TouchableOpacity>
                  <View style={styles.postFooter}>
                    <View style={styles.postActivityDetailLikeDislike}>
                      <Text>{item.likes.length} Likes</Text>

                      <Text>{item.dislikes.length} Dislikes</Text>
                    </View>

                    <View style={styles.postActivityDetailComment}>
                      <Text>{item.comments.length} Comment</Text>
                    </View>
                  </View>

                  <View style={styles.postControl}>
                    <View style={styles.postActivityControlLikeDislike}>
                      <TouchableOpacity
                        onPress={() => {
                          item.dislikes.includes(currentUser.uid)
                            ? null
                            : firebase
                                .firestore()
                                .collection("post")
                                .doc(item.key)
                                .update({
                                  likes: firebase.firestore.FieldValue.arrayUnion(
                                    currentUser.uid
                                  )
                                });
                        }}
                      >
                        <Icon
                          name="md-thumbs-up"
                          color={
                            item.likes.includes(currentUser.uid)
                              ? "blue"
                              : "grey"
                          }
                          size={25}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          item.likes.includes(currentUser.uid)
                            ? null
                            : firebase
                                .firestore()
                                .collection("post")
                                .doc(item.key)
                                .update({
                                  dislikes: firebase.firestore.FieldValue.arrayUnion(
                                    currentUser.uid
                                  )
                                });
                        }}
                      >
                        <Icon
                          name="md-thumbs-down"
                          color={
                            item.dislikes.includes(currentUser.uid)
                              ? "red"
                              : "grey"
                          }
                          size={25}
                        />
                      </TouchableOpacity>
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

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  postPage: {
    screen: postPage
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  addPostAreaCard: {
    elevation: 3,
    backgroundColor: "#FFFFFF",
    marginBottom: 5
  },

  postCard: {
    elevation: 3,
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3
  },

  postBody: {
    flex: 9
  },

  postHeader: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5
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
