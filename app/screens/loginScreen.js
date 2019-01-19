import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import firebase from "react-native-firebase";

export default class loginScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .then(() => this.props.navigation.navigate("routes"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.maincontainer}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={styles.imagecontainer}>
          <Image
            style={{
              flex: 1,
              resizeMode: "center",
              width: Dimensions.width,
              height: 210
            }}
            source={require("../../Resource/Design/login.png")}
          />
        </View>
        <View style={styles.container}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.textstyle}>LOGIN</Text>
          </TouchableOpacity>
          {/* <Button style={styles.button} title="Login"  onPress={this.handleLogin} /> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    width: "90%",
    height: 44,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 8
  },
  maincontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF"
  },
  imagecontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF"
  },
  textstyle: {
    color: "white",
    fontSize: 21,
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  button: {
    marginTop: 8,
    backgroundColor: "#B3CF47",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 80
  }
});
