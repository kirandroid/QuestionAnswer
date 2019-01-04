import React, { Component } from "react";
import { StyleSheet, Text, View ,Image, Button,TouchableOpacity, Alert} from "react-native";

export default class App extends Component {
  render() {
    
    return (
      
      <View style={styles.container}>
        <View style={styles.navContainer} >
        <Image
          style={{flex:1,resizeMode:'contain',width:355, height:210}}
          source={require('./Resource/Design/welcome.png')}/>
        </View>
        <View style={styles.bodyContainer} >
        <Text style={styles.text}>WELCOME</Text>
        <TouchableOpacity onPress = {showAlert} style = {styles.button}>
         <Text style={styles.txtcolor}>Get Started</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
        
        
          <View style={styles.bottomrows}>
        <Image
          style={{borderLeftWidth:200, borderTopWidth:250, width:310, height:170}}
          source={require('./Resource/Design/welele1.png')}/>
          </View>      
        </View>
      </View>
    );
  }
}

const showAlert = () =>{
  Alert.alert(
     'Kiran Boka'
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  navContainer: {
    flex: 6,
    backgroundColor: "#FFFFFF",
    height: 50
  },

  bodyContainer: {
    flex:2,
    backgroundColor: "#FFFFFF"
  },

  bottomContainer: {
    flex: 4,
    backgroundColor: "#FFFFFF",
    alignItems: 'flex-end',
  },
  bottomrows:{
    flexDirection:'row',
    flex:2,
    alignItems:'center'
  },
  button: {
    left:65,
    backgroundColor: '#E91E63',
    width: 230,
    height:50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent:'space-around'  
 },
 text:{
   fontSize:30,
   left:100,
   fontFamily:'Bariol',
   fontWeight:'bold',
   alignItems:'center',
   justifyContent:'space-between'
 },
 txtcolor:{
   color:'white',
   fontSize:20,
   fontFamily:'Helvetica',
   fontWeight:'bold',
 }
});
