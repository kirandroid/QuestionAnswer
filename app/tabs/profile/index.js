import React from 'react';
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import firebase from 'react-native-firebase';

export default class ProfileScreen extends React.Component {
    state = { currentUser: null }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state
        return (
            <PaperProvider>
                <StatusBar
                    backgroundColor="#b26a00"
                    barStyle="light-content"
                />
                <Appbar.Header
                    style={{ backgroundColor: "orange" }}>
                    <Appbar.Content
                        titleStyle={{ alignSelf: 'center', color: 'white' }}
                        title="Profile"
                    />
                </Appbar.Header>

                <View style={styles.container}>
                    <Text>Hello {currentUser && currentUser.email}</Text>
                    <Button title="Logout" onPress={() => firebase.auth().signOut()}></Button>
                </View>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})