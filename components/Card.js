import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Bahasa, English, Math, Biology, Ppkn, Social } from '../assets'
import { useNavigation } from '@react-navigation/native'

export default function Card (props) {
    const navigation = useNavigation()
    function getCourses (id, name) {
        navigation.navigate('Cources', {
            lessonId : id,
            lessonName: name
        })
    }
    

    if (props.dataLesson) {
        const lesson = props.dataLesson.item
        return (
            <TouchableOpacity style={styles.card} onPress={ () => getCourses(lesson.id, lesson.name) } >
                {
                    lesson.name == 'Bahasa Indonesia' &&
                    <Image source={Bahasa} style={styles.imageStyle} resizeMode="stretch" />
                }
                {
                    lesson.name == 'Bahasa Inggris' &&
                    <Image source={English} style={styles.imageStyle} resizeMode="stretch" />
                }
                {
                    lesson.name == 'Matematika' &&
                    <Image source={Math} style={styles.imageStyle} resizeMode="stretch" />
                }
                {
                    lesson.name == 'IPA' &&
                    <Image source={Biology} style={styles.imageStyle} resizeMode="stretch" />
                }
                {
                    lesson.name == 'PPKN' &&
                    <Image source={Ppkn} style={styles.imageStyle} resizeMode="stretch" />
                }
                {
                    lesson.name == 'IPS' &&
                    <Image source={Social} style={styles.imageStyle} resizeMode="stretch" />
                }
    
                <Text style={{ marginTop: 10, textAlign: 'center'}}>{lesson.name}</Text>
            </TouchableOpacity>
        )
    } else {
        const student = props.student.item
        return(
            <View style={styles.cardMates}>
                <View>
                    <Image source={{ uri: 'https://cdn4.vectorstock.com/i/thumb-large/26/38/professional-programmer-charatcter-smiling-man-vector-21172638.jpg'}} style={{ width: 100, height: 100}}  resizeMode="cover" />
                    <View>
                        <Text style={{ textAlign: 'center'}}>{student.name}</Text>
                    </View>
                </View>
            </View>
        )
    }



    
}

const styles = StyleSheet.create({
    card: {
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        marginRight: 5,
        marginTop: 15
    },
    imageStyle: {
        width: 120, 
        height: 150, 
        marginTop: 10
    },
    cardMates:{ 
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        marginRight: 5,
        marginTop: 15
    },
})