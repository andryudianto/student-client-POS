import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import loadingGirl from '../assets/Loading.gif'
import { RadioButton } from 'react-native-paper'


export default function Quizzes (props) {
    const { courseId, courseName } = props.route.params
    const [ dataQuiz, setDataQuiz ] = useState([])
    const [ answer, setAnswer ] = useState('')


    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://10.0.2.2:3000/quiz/' + courseId,
        })
        .then(({ data })=> {
            setDataQuiz(data)
        })
        .catch( err => {
            console.log(err)
        })

    }, [])

    function submitAnswer(value) {
        setAnswer(value)
        tembakServer(value)
    }

    function tembakServer(value){
        console.log(value)
    }


    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: 'yellow' ,padding: 20 , marginBottom: 30, marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Quiz {courseName}</Text>
            </View>

            <View style={{ alignItems: 'center'}}>
                {
                    dataQuiz.map((datum, index) => {
                        setArrQuestions(datum.Questions)
                        return datum.Questions.map((dataQuestion, indexQuestion) => {
                            return (
                                <View key={indexQuestion} style={{ backgroundColor: 'white', marginBottom: 10, elevation: 2, width: '90%', padding: 20}}>
                                    <Text style={{ marginBottom: 10 }}>{dataQuestion.question}</Text>
                                    {
                                        dataQuestion.choices.map((choice, indexChoice) => {
                                            return (
                                                <View style={{ flexDirection: 'row'}} key={indexChoice}>

                                                <RadioButton
                                                value={choice}
                                                status={ answer === choice ? 'checked' : 'unchecked' }
                                                onPress={() => submitAnswer(choice) }
                                                />
                                                <Text style={{marginTop: 8}}>{choice}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    })
                }
                {
                    !dataQuiz && 
                        <View style={styles.containerLoading}>
                            <View>
                                <Image source={loadingGirl} style={{width: 300, height: 300}} />
                            </View>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff'
    }
})