import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  FlatList,
  Dimensions
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import firebase from "react-native-firebase";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
export default class ExploreScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("user")
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(doc => {
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

          users.push({
            lastName,
            firstName,
            email,
            coverImage,
            hasCover,
            hasProfilePic,
            profilePic,
            username
          });
        });
        console.log(users);
        this.setState({
          users
        });
      });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <UserAvatar
          name={item.firstName + " " + item.lastName}
          size={80}
          src={item.profilePic}
        />
        <Text style={styles.itemText}>
          {item.firstName + " " + item.lastName}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Explore Friends"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <FlatList
            data={formatData(this.state.users, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#000"
  }
});
