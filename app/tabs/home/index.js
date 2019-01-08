import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import PostCard from '../../components/PostCard'

export default class HomeScreen extends React.Component {
    render() {
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
                        title="Activity Feed"
                    />
                </Appbar.Header>

                <View style={styles.container}>
                    <PostCard
                        userName='PostMan'
                        userCollege='dsjhfjdshf'
                    />
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