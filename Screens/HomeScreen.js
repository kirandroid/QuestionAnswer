import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Appbar, TextInput, TouchableRipple, Text } from 'react-native-paper';
export default class HomeScreen extends Component {
  state = {
    text: ''
  };
  render() {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Title"
          />
        </Appbar.Header>
        <TextInput
          label='Email'
          mode='outlined'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TextInput
          label='k'
          mode='flat | outlined'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 8, .32)"
        >
          <Text>Press me</Text>
        </TouchableRipple>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
