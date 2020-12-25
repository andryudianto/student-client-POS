import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Education from '../assets/education_image.jpg'

export default function Dashboard (props) {

    return (
        <View style={styles.container}>
            <View>
                <Image source={Education} style={styles.imageDash}  />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonMain} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.textButton}>Signin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMain2} onPress={() => props.navigation.navigate('Login')} >
                    <Text style={styles.textButton}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageDash: {
        maxWidth: 220,
        maxHeight: 200
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '20%',
        width: "10%"
    },
    buttonContainer: {
        marginTop: 100,
        flexDirection: 'row'
    },
    buttonMain: {
        marginRight: 30,
        backgroundColor: '#0A5A91',
        padding: 10,
        borderRadius: 30,
        width: 100
    },
    buttonMain2: {
        backgroundColor: '#5EBDFF',
        padding: 10,
        borderRadius: 30,
        width: 100,
        height: 40
    },
    textButton: {
        textAlign: 'center', 
        fontSize: 18, 
        color: 'white'
    },
    logoContainer: {
        width: 50,
        height: 50
    },
    logo: {
        marginTop: 50,
        maxWidth: 28,
        maxHeight: 37
    }


})
