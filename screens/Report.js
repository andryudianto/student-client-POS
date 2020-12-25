import React, { useEffect, useState } from 'react'
import { Text,Image, View, StyleSheet } from 'react-native'
import { Background2, Biology, Math, Bahasa, English, Ppkn, Social } from '../assets'
import Logo from '../assets/eI9uiW1ak6mK.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getTotalScore } from '../helpers/getScores'


export default function Profile (props) {
    const { access_token, studentId, render, username } = useSelector(state => state)
    const [ lessons, setLessons ] = useState([])
    const { lessonsList } = useSelector(state => state )
    const [ renderingLessons, setRenderingLessons ] = useState([])
    const [ QuizId, setQuizId ] = useState(0)


    useEffect(() => {
        axios({
            method: 'GET', 
            url: 'http://10.0.2.2:3000/scores/' + studentId
        })
        .then(({ data }) => {
            setLessons(data)
            setQuizId(data[0].QuizId)
        })
        .catch( err => {
            console.log(err)
        })
        
    }, [render])


    useEffect(() => {
        axios({
            url: 'http://10.0.2.2:3000/student/scores/' + studentId + `?Quiz=${QuizId}` ,
            method: 'GET'
        })
        .then(({data })=> {
            console.log(data, `<<<<<<<< ini balikan data`)
        })
        .catch( err => {
            console.log(err)
        })
    }, [QuizId])


    useEffect(() => {
        let totalScore = 0
        let lessonName = ''
        let allLessons = []
        
        lessons.forEach((lessonData, index) => {
            if (lessonData.Lesson) {
                if(lessonData.Lesson.name != lessonName) {
                    if (lessonName && totalScore ){
                        allLessons.push({
                            totalScore,
                            lessonName
                        })
                    }
                    lessonName = lessonData.Lesson.name
                    totalScore = 0
                }
            }


            if (lessonName == lessonData.Lesson.name) {
                totalScore += Number(lessonData.score)
                if (index == lessons.length-1) {
                    allLessons.push({
                        totalScore,
                        lessonName
                    })
                }
            }

            
        })
        setRenderingLessons(allLessons)
    }, [lessons])


    if (!access_token) {
        props.navigation.navigate('Login')
    }


    return (
        <View style={styles.container}>
            <View style={{ elevation: 2, flex: 1, marginBottom:5, justifyContent: 'center', width: '100%', alignItems: 'center', backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                <Image source={Background2}  style={{ position: 'absolute', width: '100%', height: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}/>
                <View style={styles.photoContainer}>
                    <Image 
                        source={Logo} 
                        style={{
                            maxWidth: 100,
                            maxHeight: 100,
                            borderRadius: 100
                        }}
                        resizeMode="cover"
                        />
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'column', padding: 10, marginTop: -30, height: 60, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 25}}>{username}</Text>
                    </View>

                    <View style={{ padding: 10, height: 200, alignItems: 'center', backgroundColor: '#D8ECF3', elevation: 2, width: '100%', height: '50%', borderRadius: 10 }}>
                        {   
                            renderingLessons && 
                            renderingLessons.map((dataLesson, index) => (
                                <View key={index} style={{ marginTop: 4 , padding: 10, flexDirection: 'row', elevation: 3,backgroundColor: 'white', height: 40, width: '95%'}}>
                                    {
                                        dataLesson.lessonName === 'Matematika' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={Math} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    {
                                        dataLesson.lessonName === 'Bahasa Indonesia' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={Bahasa} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    {
                                        dataLesson.lessonName === 'Bahasa Inggris' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={English} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    {
                                        dataLesson.lessonName === 'PPKN' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={Ppkn} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    {
                                        dataLesson.lessonName === 'IPA' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={Biology} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    {
                                        dataLesson.lessonName === 'IPS' &&
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image source={Social} style={{ width: 30, height: 30}} resizeMode="contain" />
                                        </View>
                                    }
                                    <View style={{ width: '70%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{dataLesson.lessonName}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{dataLesson.totalScore}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>

                    <View style={{ padding: 20, marginTop: 10, height: 50, backgroundColor: '#43ADD2', elevation: 2, width: '100%', borderRadius: 10, justifyContent:'center' }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ width: '60%' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>SCORE TOTAL</Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>{getTotalScore(renderingLessons, lessonsList)}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ marginTop: 10, elevation: 2, backgroundColor: 'white', width: '100%', height: 100, padding: 10, marginBottom: -50, borderRadius: 10, backgroundColor: '#2286A9'}}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15}}>Teacher Message</Text>
                            <Text style={{ color: 'white'}}>Mohon ditingkatkan lagi belajarnya</Text>
                        </View>
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
      justifyContent: 'center'
    },
    photoContainer: {
        backgroundColor: '#fff',
        marginTop: 70,
        padding: 10,
        borderRadius: 60,
        marginBottom: -40,
        elevation: 4,
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        elevation: 1
    }
})