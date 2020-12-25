import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ErrorImage } from '../assets'
export default function ServerError () {
    return (
        <View style={styles.container}>
            <Image 
                source={ErrorImage}
                style={styles.imageStyle}
            />
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Sorry!</Text>
                <Text style={styles.textStyle2}>Something Wrong With Our Server</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 300,
        height: 300
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 27,
        fontWeight: 'bold'

    },
    textStyle2: {
        textAlign: 'center',
        fontSize: 15
    },
    textContainer: {
        marginTop: 10
    }
})