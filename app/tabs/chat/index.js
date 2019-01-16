import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { GiftedChat } from "react-native-gifted-chat";
import Backend from "./Backend";

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: false };
  }
  state = {
    messages: []
  };

  componentWillMount() {}

  componentDidMount() {
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
            inverted={false}
            messages={this.state.messages}
            onSend={message => {
              Backend.sendMessage(message);
            }}
            user={{
              _id: Backend.getUid(),
              name: this.props.name
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
    backgroundColor: "gray"
  }
});
