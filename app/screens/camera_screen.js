import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Camera() {
    return (
        <View style={StyleSheet.container}>
            <Text>Camera Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})