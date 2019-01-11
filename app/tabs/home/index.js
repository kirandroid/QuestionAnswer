import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class HomeScreen extends React.Component {
  state = {
    posts: [
      {
        UID: "askjdlj32weqdks",
        name: "fffd Maw",
        college: "University of BedfordShire",
        time: "25min ago",
        postText: "Some nice things",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cat-quotes-1543599392.jpg",
        likes: "34",
        dislikes: "12",
        comments: "12"
      },
      {
        UID: "asdascxjhjl",
        name: "Gira Maw",
        college: "University of kentucky",
        time: "45min ago",
        postText: "Some bad things",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cat-quotes-1543599392.jpg",
        likes: "43",
        dislikes: "12",
        comments: "55"
      },
      {
        UID: "sdfsdf",
        name: "Gira Maw",
        college: "University of kentucky",
        time: "45min ago",
        postText: "Some bad things",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cat-quotes-1543599392.jpg",
        likes: "43",
        dislikes: "12",
        comments: "55"
      }
    ]
  };
  render() {
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
          <FlatList
            data={this.state.posts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <View style={styles.postBody}>
                  <View style={styles.postHeader}>
                    <View style={styles.postAvatar}>
                      <UserAvatar name={item.name} size={50} />
                    </View>
                    <View style={styles.postUserDetail}>
                      <View style={styles.postUserName}>
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      </View>
                      <View style={styles.postUserCollege}>
                        <Text style={{ fontSize: 13, color: "grey" }}>
                          {item.college}
                        </Text>
                      </View>
                      <View style={styles.postUserPostTime}>
                        <Text style={{ fontSize: 10, color: "grey" }}>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.postContent}>
                    <View style={styles.postStatus}>
                      <Text>{item.postText}</Text>
                    </View>
                    <View style={styles.postImage}>
                      <Image
                        style={{ height: 200, width: Dimensions.width }}
                        source={{
                          uri: item.image
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.postFooter}>
                  <View style={styles.postActivityDetail}>
                    <Text>{item.likes}</Text>
                    <Icon name="arrow-up" color="grey" size={18} />

                    <Text>{item.dislikes}</Text>
                    <Icon name="arrow-down" color="grey" size={18} />

                    <Text>{item.comments}</Text>
                    <Icon name="comment-outline" color="grey" size={18} />
                  </View>

                  <View style={styles.postActivityControl}>
                    <Icon name="arrow-up" color="grey" size={18} />

                    <Icon name="arrow-down" color="grey" size={18} />

                    <Icon name="comment-outline" color="grey" size={18} />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.UID}
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
    flex: 8
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

  postActivityDetail: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5
  },

  postActivityControl: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 5
  }
});
