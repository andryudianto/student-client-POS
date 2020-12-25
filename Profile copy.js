import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from './utilities/userPermissions'
import Genji from '../assets/profile.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Background } from './assets'
import Fire from './fire'

export default function Profile () {
    const { studentId } = useSelector(state => state)
    const [ studentData, setStudentData ] = useState({})
    const [ image, setImage ] = useState(null)


    const upload = () => {
        Fire.shared
            .addPhoto(image, studentId)
            .then(() => {
                setImage(null)
            })
            .catch(err => {
                alert(err.message)
            })
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        console.log(result)

        if (!result.cancelled){
            setImage(result.uri)
        }

    }


    useEffect(() => {
        UserPermissions.getPermissionAsync()
    }, [])



    useEffect(() => {
        axios({
            method: 'GET', 
            url: 'http://10.0.2.2:3000/student/' + studentId
        })
        .then( ({ data }) => {
            console.log(data)
            setStudentData(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [studentId])



    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 5,flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center', backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            <View style={styles.photoContainer}>
                <Image 
                    source={Genji} 
                    style={{
                        maxHeight: 150,
                        maxWidth: 150,
                    }}
                />
            </View>
            {/* <View>
                <TouchableOpacity onPress={pickImage}><Text>Select Image</Text></TouchableOpacity>
                <View>
                    { image === null ? <Text>no selected image</Text> : <View><Image source={{ uri: image }} />
                    
                      <TouchableOpacity onPress={upload}><Text>upload</Text></TouchableOpacity>
                      </View>
                     
                    }
                </View>
            </View> */}




            <View style={{ width: '90%', flex: 3.5, alignItems: 'center'}}>
                {
                    studentData &&
                    <View style={{ flexDirection: 'column'}}>
                        <View style={{ marginTop: 30,backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="user" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text>{studentData.name}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="envelope" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text>{studentData.email}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="calendar" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text>{studentData.birthdate}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="map-pin" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text>{studentData.address}</Text>
                            </View>
                        </View>

                    </View>
                }
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
        flex: 1,
        backgroundColor: '#ffff',
        padding: 10,
        marginTop: 40,
        justifyContent: 'center', 
        height: '100%'
    }

})