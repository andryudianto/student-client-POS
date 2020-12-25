import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Genji from '../assets/eI9uiW1ak6mK.jpg'
import { Background2 } from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { setAccessToken } from '../store/actions/userActions'
import { useSelector } from 'react-redux'

export default function Profile (props) {
    const { studentId, access_token } = useSelector(state => state)
    const [ studentData, setStudentData ] = useState({})

    if (!access_token) {
        props.navigation.navigate("Login")
    }

    useEffect(() => {
        axios({
            method: 'GET', 
            url: 'http://10.0.2.2:3000/student/' + studentId
        })
        .then( ({ data }) => {
            setStudentData(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [studentId])


    function logout () {
        setAccessToken('')
        props.navigation.navigate('Login')
    }

    function generateDate(date){

        let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('-');
    }



    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 5,flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center', backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            <Image source={Background2}  style={{ position: 'absolute', width: '100%', height: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}/>
            <View style={styles.photoContainer}>
                <Image 
                    source={Genji} 
                    style={{
                        maxHeight: 150,
                        maxWidth: 150,
                    }}
                />
            </View>
  

            <View style={{ width: '90%', flex: 3.5, alignItems: 'center'}}>
                {
                    studentData &&
                    <View style={{ flexDirection: 'column'}}>
                        <View style={{ marginTop: 30,backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="user" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text style={styles.text}>{studentData.name}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="envelope" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text style={styles.text}>{studentData.email}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="calendar" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10}} />
                            </View>
                            <View>
                                <Text style={styles.text}>{generateDate(studentData.birthdate)}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', width: 300, borderRadius: 30}}>
                            <View style={{ width : '20%' }}>
                                <Icon name="map-pin" size={15} color="grey" style={{ marginRight: 15, marginTop: 3, marginLeft: 10, alignItems: 'center'}} />
                            </View>
                            <View>
                                <Text style={styles.text}>{studentData.address}</Text>
                            </View>
                        </View>

                    </View>
                }
            </View>

            <View style={{ marginBottom: 30}}>
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={{ fontSize: 15, color: '#fff'}}>Logout</Text>
                </TouchableOpacity>
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
        marginTop: 70,
        justifyContent: 'center', 
        height: '100%',
    },
    logoutButton: {
        backgroundColor: "#C70039",
        padding: 10, 
        borderRadius: 10
    },
    text: {
        fontSize: 20
    }

})