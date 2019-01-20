// import React from "react";
// import { Text, View, StyleSheet, StatusBar, TextInput} from "react-native";
// import { Provider as PaperProvider, Appbar } from "react-native-paper";
// // import FastImage from "react-native-fast-image";

// var DeviceInfo = require("react-native-device-info");

// export default class editprofile extends React.Component {
//   static navigationOptions = {
//     header: null
//   };
//   render() {
//     return (
//       <PaperProvider>
//         <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
//         <Appbar.Header style={{ backgroundColor: "orange" }}>
//           <Appbar.Content
//             titleStyle={{ alignSelf: "center", color: "white" }}
//             title="editprofile"
//           />
//         </Appbar.Header>

//           <View style={style.container}>
//           <TextInput
//             style={styles.textInput}
//             autoCapitalize="none"
//             placeholder="Email"
//           />
//           <Text style={styles.textstyle}>First Name:</Text>
//           <Text style={styles.textstyle}>last Name</Text>
//           <Text style={styles.textstyle}>Bio</Text>
//           <Text style={styles.textstyle}>Address</Text>
//           </View>
//       </PaperProvider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   textstyle:{
//     color: "#000000",
//     fontSize: 21,
//     fontFamily: "Helvetica",
//     fontWeight: "bold"
//   },
//   textInput: {
//     width: "90%",
//     height: 44,
//     borderColor: "gray",
//     borderWidth: 2,
//     backgroundColor: "white",
//     borderRadius: 25,
//     marginTop: 8
//   },
// });

import React from "react";
import { Text, View, StyleSheet, StatusBar, TextInput,AsyncStorage,Image, TouchableOpacity, ScrollView } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "react-navigation";
import firebase from "react-native-firebase";


var DeviceInfo = require("react-native-device-info");

export default class test extends React.Component {
    
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      fullName: "kc",
      profilePic: "",
      email: "",
      username: ""
    };}
    asy = async () => {
        console.log("In Display");
    
        try {
          let user = await AsyncStorage.getItem("user");
          let parsed = JSON.parse(user);
          console.log(parsed.fullName);
          this.setState({
            fullName: parsed.fullName,
            email: parsed.email,
            profilePic: parsed.profilePic,
            username: parsed.username
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        this.asy();
      }
    
      deleteUserId = async () => {
        try {
          await AsyncStorage.removeItem("user");
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };
  
  render() {
    return (
        <ScrollView>
      <PaperProvider>
        <StatusBar backgroundColor="#b26a00" barStyle="light-content" />
        <Appbar.Header style={{ backgroundColor: "orange" }}>
          <Appbar.Content
            titleStyle={{ alignSelf: "center", color: "white" }}
            title="Explore"
          />
        </Appbar.Header>
        <View style={styles.header}>
        <FastImage
            style={styles.avatar}
            source={{
              uri: this.state.profilePic,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.compstyle}>
              <Text style={styles.name}>{this.state.fullName}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
        </View>
        {/* <View style={styles.compstyle}> */}
        <Text style={styles.textstyle}>First Name</Text>
        <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder=''
          />
           <Text style={styles.textstyle}>last Name</Text>
           <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder=''
          />
          <Text style={styles.textstyle}>Address</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder=''
          />
           <Text style={styles.textstyle}>Bio</Text>
           <TextInput
            style={styles.Bio}
            autoCapitalize="none"
            placeholder=''
          />
          
          <View style={styles.picturecontainer}>
          <TouchableOpacity style={styles.buttonContainer}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
        {/* /</View> */}
      </PaperProvider>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      header: {
        backgroundColor: "orange",
        height: 200
      },
      compstyle:{
        flex:1,
        alignItems:'center',
        marginTop:50
      },
      textstyle:{
        marginTop:10,
        color: "#000000",
        fontSize: 20,
        fontFamily: "Helvetica",
        fontWeight: "normal",
      },
      textInput: {
        width: "90%",
        height: 44,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 5
      },
      Bio:{
        width: "90%",
        height: 150,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 8
      },
      picturecontainer:{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-evenly'
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 130
      },
      buttonContainer: {
        marginTop: 130,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
        backgroundColor: "orange"
      },
      name: {
        fontSize: 28,
        color: "#696969"
        // fontWeight: "600"
      },
      info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
      },
    });
