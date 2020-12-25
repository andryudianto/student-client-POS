import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { View, Image, Text, StyleSheet, FlatList } from 'react-native'
import { setTotalLesson } from '../store/actions/fetchActions'
import { useDispatch, useSelector } from 'react-redux'
import { BarBackground, Background2 } from '../assets/index'
import { Card } from '../components'


export default function Lessons (props) {
    const { username, teacherId, access_token } = useSelector(state => state)
    const [ lessons, setLessons ] = useState([])
    const [ students, setStudents ] = useState([])
    const dispatch = useDispatch()

    if (!access_token) {
        props.navigation.navigate('Login')
    }


    useEffect(() => {
        axios({
            url: 'http://10.0.2.2:3000/lessons/' + teacherId,
            method: 'GET'
        })
        .then(({ data }) => {
            setLessons(data)
            dispatch(setTotalLesson(data))
            return axios ({
                url: 'http://10.0.2.2:3000/students/' + teacherId,
                method: 'GET'
            })
        })
        .then(students => {
            setStudents(students.data)
        })
        .catch(err => {
            console.log(err)
            props.navigation.navigate('Error')
        })

    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>

                <View style={styles.header}>
                    <Image source={Background2} style={{ position: 'absolute', width: '100%', bottom: 0, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50,}} />
                    <Text style={{fontSize: 17, fontWeight: '200'}}>Hello, {username} Welcome back!</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerContentContiner}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Your Lessons</Text>
                    </View>
                    <View style={styles.lessonsContainer}>
                        <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={lessons}
                            keyExtractor={(lesson) => `${lesson.id}`}
                            renderItem={(lesson) => <Card dataLesson={lesson} />}
                        />
                    </View>
                </View>

                <View style={styles.content2}>
                    <View style={{ width: '80%', padding: 10, top: -25, position: 'absolute'}}>
                        <Image source={BarBackground} style={{ position: 'absolute', borderRadius: 30, width: '110%', height: 50}}/>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Your Class Mates</Text>
                    </View>
                    <View style={styles.matesContainer}>
                        <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={students}
                            keyExtractor={(student) => `${student.id}`}
                            renderItem={(student) => <Card student={student} />}
                        />
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#43ADD2',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    secondContainer: {
        marginBottom: 5,
        flex: 1, 
        justifyContent: 'center', 
        width: '100%', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30
    },
    card: {
        backgroundColor: 'white',
        width: 150,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 30
    },
    header: {
        flex: 0.4,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 30,
        backgroundColor: 'white',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        elevation: 3
    },
    content: {
        flex: 1.5,
        backgroundColor: '#9ECDDD',
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        width: '95%',
        marginTop: 20,
        padding: 15,
        elevation: 3,
    },
    lessonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card:{ 
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        marginRight: 5,
        marginTop: 15
    },
    content2: {
        flex: 1,
        backgroundColor: '#D8ECF3',
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginBottom: 10,
        width: '95%',
        padding: 15,
        marginTop: 50,
        marginBottom: 20
    },
    matesContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
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
    headerContentContiner: {
        backgroundColor: '#FFBB13', 
        width: '80%', 
        padding: 10, 
        top: -25, 
        position: 'absolute', 
        borderTopLeftRadius: 30, 
        borderBottomRightRadius: 30, 
        elevation: 2
    }
})