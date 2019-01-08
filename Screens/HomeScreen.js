import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, Appbar, TextInput, TouchableRipple, Text } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
export default class HomeScreen extends Component {

  render() {
    return (
      <PaperProvider>
        <Appbar.Header
          style={{ backgroundColor: "red" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: 'center' }}
            title="Activity Feed"
          />
        </Appbar.Header>

        <View style={styles.postCard}>
          <View style={styles.cardBody}>
            <View style={styles.cardBodyHeader}>
              <View style={styles.cardBodyHeaderAvatar}>
                <UserAvatar name="Kiran Pradhan" size={70} />
              </View>
              <View style={styles.cardBodyHeaderPoster}>
                <View style={styles.cardBodyHeaderPosterName}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>Kiran Pradhan</Text>
                </View>
                <View style={styles.cardBodyHeaderPosterCollege}>
                  <Text>University of Bedfordshire</Text>
                </View>
                <View style={styles.cardBodyHeaderPosterTime}>
                  <Text style={{ color: "grey" }}>23m ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardBodyContent}></View>
          </View>
          <View style={styles.cardFooter}></View>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  postCard: {
    elevation: 3,
    backgroundColor: "#FFFFFF",
    flex: 1,
    margin: 10,
    borderRadius: 3
  },

  cardBody: {
    flex: 9
  },

  cardBodyHeader: {
    flex: 3,
    flexDirection: "row"
  },

  cardBodyHeaderAvatar: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },

  cardBodyHeaderPoster: {
    flex: 7
  },

  cardBodyHeaderPosterName: {
    flex: 2,
    justifyContent: "center"
  },

  cardBodyHeaderPosterCollege: {
    flex: 1
  },

  cardBodyHeaderPosterTime: {
    flex: 1
  },

  cardBodyContent: {
    flex: 7,
    backgroundColor: "blue"
  },

  cardFooter: {
    flex: 1,
    backgroundColor: "yellow"
  },


});
