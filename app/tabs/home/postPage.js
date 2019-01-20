import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import FastImage from "react-native-fast-image";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from "react-moment";
import "moment-timezone";

export default class postPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const postId = navigation.getParam("postId", "NO-ID");
    const postUserId = navigation.getParam("postUserId", "NO-ID");
    const postUserName = navigation.getParam("postUserName", "NO-ID");
    const postUserAvatar = navigation.getParam("postUserAvatar", "NO-ID");
    const postDate = navigation.getParam("postDate", "NO-ID");
    const postImage = navigation.getParam("postImage", "NO-ID");
    const postText = navigation.getParam("postText", "NO-ID");
    const currentUser = navigation.getParam("currentUser", "NO-ID");
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
          <View style={styles.postCard}>
            <View style={styles.postBody}>
              <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                  <UserAvatar
                    name={postUserName}
                    size={50}
                    src={postUserAvatar}
                  />
                </View>
                <View style={styles.postUserDetail}>
                  <View style={styles.postUserName}>
                    <Text style={{ fontSize: 18 }}>{postUserName}</Text>
                  </View>
                  <View style={styles.postUserPostTime}>
                    <Text style={{ fontSize: 10, color: "grey" }}>
                      <Moment element={Text} fromNow>
                        {postDate}
                      </Moment>
                    </Text>
                  </View>
                </View>
                {postUserId == currentUser ? (
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
                {postText == "" ? null : (
                  <View style={styles.postStatus}>
                    <Text>{postText}</Text>
                  </View>
                )}
                {postImage == "" ? null : (
                  <View style={styles.postImage}>
                    <FastImage
                      style={{ height: 200, width: Dimensions.width }}
                      source={{
                        uri: postImage,
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
                <Text>0 Likes</Text>

                <Text>0 Dislikes</Text>
              </View>

              <View style={styles.postActivityDetailComment}>
                <Text>0 Comment</Text>
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
    flex: 8
  },

  postHeader: {
    flex: 3,
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
    flex: 5
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
