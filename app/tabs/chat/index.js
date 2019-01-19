import React from "react";
import { Text, View, StyleSheet, StatusBar, AsyncStorage } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { GiftedChat } from "react-native-gifted-chat";
import Backend from "./Backend";

export default class ChatScreen extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //   };
  // }
  state = {
    messages: [],
    fullName: "kc"
  };

  componentWillMount() {}

  asy = async () => {
    console.log("In Display");

    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      console.log(parsed.fullName);
      this.setState({
        fullName: parsed.fullName
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.asy();
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }

  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Global Chat"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <GiftedChat
            messages={this.state.messages}
            onSend={message => {
              Backend.sendMessage(message);
            }}
            user={{
              _id: Backend.getUid(),
              name: this.state.fullName
            }}
          />
        </View>
      </PaperProvider>
    );
  }
  componentWillUnmount() {
    this.closeChat();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  }
});
