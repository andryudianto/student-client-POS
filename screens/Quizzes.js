import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { setRender } from '../store/actions/fetchActions'
import { QuestionBackground, Background, LoadingBoy, HeaderImage } from '../assets/index'


export default function Quizzes (props) {
    const { courseId, courseName } = props.route.params
    const [ dataQuiz, setDataQuiz ] = useState([])
    const [ answer, setAnswer ] = useState('')
    const [ questionIndex, setQuestionIndex ] = useState(0)
    const { studentId, lessonId } = useSelector(state => state )
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isEmpty, setIsEmpty ] = useState(false)
    const dispatch = useDispatch()


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
            props.navigation.navigate('Error')
        })

    }, [])

    function submitAnswer(value) {
        setIsEmpty(false)
        setAnswer(value)
    }


    function sendAnswer(questionId) {
        axios({
            url: 'http://10.0.2.2:3000/answer/' + questionId,
            method: 'POST',
            data: {
                answer,
                QuizId: dataQuiz[0].id,
                StudentId: studentId,
                LessonId: lessonId
            }
        })
        .then(data => {
            console.log('success')
            setAnswer('')
        })
        .catch(err => {
            console.log(err)
        })
    }


    function addIndex (data, questionId) {

        if (answer == '') {
            setIsEmpty(true)        
        }else if (questionIndex < data.length) {
            sendAnswer(questionId)
            if (questionIndex == data.length-1) {
                setIsSubmit(true)
                dispatch(setRender(true))
                setTimeout(() => {
                    props.navigation.navigate('Home')
                    dispatch(setRender(false))
                }, 2000);

            } else {
                setTimeout(() => {
                    const newIndex = questionIndex + 1
                    setQuestionIndex(newIndex)
                }, 500);
            }

        }
    }


    return (
        <View style={styles.container}>
            <Image source={Background} style={{ position: 'absolute', width: '100%', height: '110%'}} />
            {
                isSubmit &&
                <View style={styles.submitContainer}>
                    <Image 
                        source={LoadingBoy}
                    />
                    <View style={styles.submitTextContainer}>
                        <Text style={styles.submitText1}>Please Wait</Text>
                        <Text style={styles.submitText2}>We are submitting your answers</Text>
                    </View>
                </View>
            }
            { 
                !isSubmit &&
                <View style={styles.headerContainer}>
                    <Image 
                        source={HeaderImage} 
                        style={{
                            height: 150,
                            width: "100%",
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.headingTitle}>
                        <Text style={{textAlign: 'center', fontWeight: '100', fontSize: 15}}>Quiz {courseName}</Text>
                    </View>
                </View>
            }
            {/* { !isSubmit &&
                <View style={{ alignItems: 'center'}}>
                    {
                        dataQuiz.map((datum, index) => {
                            return (
                                <View style={styles.questionContainer} key={index}>
                                <Image source={QuestionBackground} style={{ position: 'absolute', width: '121%', height: '125%', borderRadius: 10}} resizeMode="cover" />

                                    <View style={styles.questionNumberContainer}>
                                        <Text style={styles.number}>{questionIndex + 1}</Text>
                                    </View>
                                    
                                    {
                                        isEmpty && 
                                        <Text style={{ textAlign: 'center', color: 'red'}}>Please choice one answer!</Text>
                                    }
                                    {
                                        !isEmpty && 
                                        <Text style={{ textAlign: 'center', color: 'transparent'}}>Please choice one answer!</Text>
                                    }


                                    <Text style={styles.questionText}>{datum.Questions[questionIndex].question}</Text>

                                    {
                                        datum.Questions[questionIndex].choices.map((choice, indexChoice) => {
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


                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity 
                                            onPress={() => {addIndex(datum.Questions, datum.Questions[questionIndex].id)}}
                                            style={styles.buttonStyle}
                                        >   
                                            {
                                                questionIndex == datum.Questions.length - 1 &&
                                                <Text style={styles.buttonText}>Finish</Text>
                                            }

                                            {
                                                questionIndex != datum.Questions.length - 1 &&
                                                <Text style={styles.buttonText}>Next</Text>
                                            }
                                        
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            )
                        })
                    }
                </View>
            } */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0A5A91',
      justifyContent: 'center',
      
    },
    headerContainer: {
        flex: 1,
        marginBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 3,
        marginTop: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute', 
        top: -30, width: '100%'
    },
    questionContainer: {
        width: '90%', 
        padding: 30,
        borderRadius: 10
    },
    questionNumberContainer: {
        backgroundColor: '#FFC300', 
        width: 40, 
        height: 40, 
        padding: 3, 
        borderRadius: 40, 
        position: 'absolute', 
        right: 20, 
        top: -20, 
        elevation: 2, 
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    number: {
        textAlign: 'center', 
        fontSize: 20, 
        marginRight: 3, 
        marginBottom:2,
        color: 'white'
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#48B4FF',
        padding: 12,
        borderRadius: 10,
        marginLeft: '75%',
        width: 70
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    },
    questionText: {
        marginBottom: 15,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    submitContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#e3eae5',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitTextContainer: {
        marginTop: 10
    },
    submitText1: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#484848'
    },
    submitText2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#999999'
    },
    headingTitle: {
        position: 'absolute', 
        width: '50%', 
        height: 30, 
        backgroundColor: 'white', 
        padding: 20, 
        justifyContent: 'center', 
        bottom: -20, 
        borderRadius: 30, 
        elevation: 1
    }
    
})