import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class loadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'routes' : 'loginScreen')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>load1ng</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})