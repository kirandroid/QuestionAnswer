import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import FastImage from "react-native-fast-image";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from "react-moment";
import "moment-timezone";
import firebase from "react-native-firebase";

export default class postPage extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      postInput: "",
      post: [],
      postId: "",
      postUserId: "",
      postUserName: "xx",
      postUserAvatar: "",
      postDate: "",
      postImage: "",
      postText: "",
      currentUser: "",
      currentUserName: "nn",
      currentUserPic: "",
      likes: "",
      dislikes: "",
      comments: ""
    };
  }

  updatePostInput(value) {
    this.setState({
      postInput: value
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      postId: navigation.getParam("postId", "NO-ID"),
      postUserId: navigation.getParam("postUserId", "NO-ID"),
      postUserName: navigation.getParam("postUserName", "NO-ID"),
      postUserAvatar: navigation.getParam("postUserAvatar", "NO-ID"),
      postDate: navigation.getParam("postDate", "NO-ID"),
      postImage: navigation.getParam("postImage", "NO-ID"),
      postText: navigation.getParam("postText", "NO-ID"),
      currentUser: navigation.getParam("currentUser", "NO-ID"),
      currentUserName: navigation.getParam("currentUserName", "NO-ID"),
      currentUserPic: navigation.getParam("currentUserPic", "NO-ID"),
      likes: navigation.getParam("likes", "NO-ID"),
      dislikes: navigation.getParam("dislikes", "NO-ID"),
      comments: navigation.getParam("comments", "NO-ID")
    });
    firebase
      .firestore()
      .collection("post")
      .doc(navigation.getParam("postId", "NO-ID"))
      .onSnapshot(doc => {
        this.setState({
          post: doc.data().comments
        });
        console.log(this.state.post);
      });
  }

  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Post"
          />
        </Appbar.Header>

        <View style={styles.container}>
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
              <View style={styles.headerContain}>
                <View style={styles.postCard}>
                  <View style={styles.postBody}>
                    <View style={styles.postHeader}>
                      <View style={styles.postAvatar}>
                        <UserAvatar
                          name={this.state.postUserName}
                          size={50}
                          src={this.state.postUserAvatar}
                        />
                      </View>
                      <View style={styles.postUserDetail}>
                        <View style={styles.postUserName}>
                          <Text style={{ fontSize: 18 }}>
                            {this.state.postUserName}
                          </Text>
                        </View>
                        <View style={styles.postUserPostTime}>
                          <Text style={{ fontSize: 10, color: "grey" }}>
                            <Moment element={Text} fromNow>
                              {this.state.postDate}
                            </Moment>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.postContent}>
                      {this.state.postText == "" ? null : (
                        <View style={styles.postStatus}>
                          <Text>{this.state.postText}</Text>
                        </View>
                      )}
                      {this.state.postImage == "" ? null : (
                        <View style={styles.postImage}>
                          <FastImage
                            style={{ height: 200, width: Dimensions.width }}
                            source={{
                              uri: this.state.postImage,
                              priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.postFooter}>
                      <View style={styles.postActivityDetailLikeDislike}>
                        <Text>{this.state.likes.length} Likes</Text>

                        <Text>{this.state.dislikes.length} Dislikes</Text>
                      </View>

                      <View style={styles.postActivityDetailComment}>
                        <Text>{this.state.comments} Comment</Text>
                      </View>
                    </View>

                    <View style={styles.postControl}>
                      <View style={styles.postActivityControlLikeDislike}>
                        <TouchableOpacity>
                          <Icon
                            name="md-thumbs-up"
                            color={
                              this.state.likes.includes(this.state.currentUser)
                                ? "blue"
                                : "grey"
                            }
                            size={25}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity>
                          <Icon
                            name="md-thumbs-down"
                            color={
                              this.state.dislikes.includes(
                                this.state.currentUser
                              )
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

                    <View style={styles.addPostAreaCard}>
                      <View style={styles.postHeader}>
                        <View style={styles.addPostUserAvatar}>
                          <TouchableOpacity onPress={() => this.test()}>
                            <UserAvatar
                              name={this.state.currentUserName}
                              size={40}
                              src={this.state.currentUserPic}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.addPostUserStatus}>
                          <TextInput
                            style={{ height: 80, textAlign: "left" }}
                            value={this.state.postInput}
                            onChangeText={text => this.updatePostInput(text)}
                            underlineColorAndroid="transparent"
                            placeholder={"What is your problem man!!!"}
                            placeholderTextColor={"#9E9E9E"}
                            numberOfLines={10}
                            multiline={true}
                          />
                        </View>
                        <View style={styles.addPostImage}>
                          <TouchableOpacity
                            onPress={() =>
                              firebase
                                .firestore()
                                .collection("post")
                                .doc(this.state.postId)
                                .update({
                                  comments: firebase.firestore.FieldValue.arrayUnion(
                                    {
                                      commentText: this.state.postInput,
                                      commentUID: this.state.currentUser,
                                      commentUser: this.state.currentUserName,
                                      commentUserImage: this.state
                                        .currentUserPic,
                                      postDate: Date.now()
                                    }
                                  )
                                })
                                .then(() => {
                                  this.setState({
                                    postInput: ""
                                  });
                                })
                            }
                          >
                            <Icon name="md-send" color="grey" size={22} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <TouchableOpacity>
                  <View style={styles.postBody}>
                    <View style={styles.postHeader}>
                      <View style={styles.postAvatar}>
                        <UserAvatar
                          name={item.commentUser}
                          size={50}
                          src={item.commentUserImage}
                        />
                      </View>
                      <View style={styles.postUserDetail}>
                        <View style={styles.postUserName}>
                          <Text style={{ fontSize: 18 }}>
                            {item.commentUser}
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
                    </View>
                    <View style={styles.postContent}>
                      {item.postText == "" ? null : (
                        <View style={styles.postStatus}>
                          <Text>{item.commentText}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContain: {
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
