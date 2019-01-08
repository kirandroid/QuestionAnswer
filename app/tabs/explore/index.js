import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

export default class ExploreScreen extends React.Component {
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
                        title="Explore"
                    />
                </Appbar.Header>

                <View style={styles.container}>
                    <Text>Explore Screen</Text>
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