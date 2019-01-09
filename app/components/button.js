import { StyleSheet, View, Button } from "react-native";
import React from 'react';

export default PostCard = ({
    title
}) => (
        <View style={styles.buttonStyle}>
            <Button title={title} />
        </View>

    )

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "red"
    }
})