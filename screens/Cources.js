import React, { useEffect, useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking , ScrollView} from 'react-native'
import { setLessonId } from '../store/actions/fetchActions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Bahasa, English, Math, Social, Biology, Ppkn, Font} from '../assets/index'
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (<TouchableOpacity onPress={handlePress} style={{ elevation: 3, backgroundColor: '#ffff', borderRadius: 50, padding: 10, alignItems: 'center', marginRight: 10}}><Icon name="book" color="#57697A" size={25}/></TouchableOpacity>);
};



export default function Cources (props) {
    const {lessonId, lessonName} = props.route.params
    const dispatch = useDispatch()
    const [ cources, setCources ] = useState([])

    useEffect( () => {
        dispatch(setLessonId(lessonId))
        axios({
            url: 'http://10.0.2.2:3000/courses/' + lessonId,
            method: 'GET'
        })
        .then(({data}) => {
            setCources(data)
        })
        .catch(err=> {
            console.log(err)
        })
    }, [])


    function fetchQuestion(id, name) {
        props.navigation.navigate('Quizzes', {
            courseId: id,
            courseName: name,
            lessonId
        })
    }



    return (
        <ScrollView style={styles.container}>
            
                {
                    lessonName == 'Bahasa Indonesia' &&
                    <Image source={Bahasa} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }
                {
                    lessonName == 'Bahasa Inggris' &&
                    <Image source={English} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }
                {
                    lessonName == 'Matematika' &&
                    <Image source={Math} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }
                {
                    lessonName == 'IPA' &&
                    <Image source={Biology} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }
                {
                    lessonName == 'PPKN' &&
                    <Image source={Ppkn} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }
                {
                    lessonName == 'IPS' &&
                    <Image source={Social} resizeMode="cover" style={{ maxHeight: '40%', maxWidth: '100%'}} />
                }

            
            <View style={styles.contentContainer}>
                <Text style={{ textAlign: 'center', margin: 20, fontSize: 30, fontWeight: "bold", color: "black" }}>Course List</Text>
                {
                    cources.map((course, index) => {
                        return (
                            <View style={styles.materialCard} key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                    <View style={{ width: '70%'}}>
                                        <Text style={{ color: 'white',fontWeight:'bold', fontSize: 20, textAlign: 'center'}}>{course.name}</Text>
                                        <Text style={{ textAlign: 'center'}}> Uncompleted </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row'}}>
                                        <OpenURLButton url={course.materialUrl}>
                                            Material
                                        </OpenURLButton>
                                        <TouchableOpacity onPress={() => fetchQuestion(course.id, course.name)} style={{ elevation: 3,backgroundColor: '#fff', borderRadius: 50, padding: 10, alignItems: 'center'}}>
                                            <Icon name="pencil" color="#57697A" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
    },
    headerContainer: {
        flex: 2,
        backgroundColor: 'white',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        alignItems: "center"
        
    },
    contentContainer: {
        marginTop: 30,
        flex: 3,
        backgroundColor: 'white',
        width: '100%',
        elevation: 5,
        marginTop: -30,
        borderTopLeftRadius: 55
    },
    materialCard: {
        backgroundColor: '#9FC0E1',
        elevation: 2,
        padding: 15,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    lessonTitleContainer: {
        backgroundColor: '#0A5A91',
        position: 'absolute',
        padding: 6,
        width: '60%',
        bottom: 20,
        borderRadius: 30,
    },
    textLessonTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    }
})