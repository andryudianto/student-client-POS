import React, { useState } from 'react'
import axios from 'axios'
import { Background, LoadingGirl, WhiteLogo, BlackLogo } from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { setUsername, setTeacherId, setStudentId, setAccessToken } from '../store/actions/userActions'

export default function Login (props) {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    function login () {
        setIsLoading(true)

        const payload = {
            email,
            password
        }

        axios({
            url: 'http://10.0.2.2:3000/login',
            method: 'POST',
            data: payload
        })
            .then(({ data }) => {
                dispatch(setAccessToken(data.access_token))
                dispatch(setUsername(data.name))
                dispatch(setTeacherId(data.TeacherId))
                dispatch(setStudentId(data.id))
                setTimeout(() => {
                    setIsLoading(false)
                    props.navigation.navigate('Home')
                }, 1000);
            })
            .catch(err => {
                setTimeout(() => {
                    if (err.message === 'Network Error') {
                        props.navigation.navigate('Error')
                    }
                }, 2000);
            })
    }


    if (isLoading) {
        return (
            <View style={styles.containerLoading}>
                <View>
                    <Image source={LoadingGirl} style={{width: 300, height: 300}} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
            <Image source={Background} style={{ position: 'absolute', width: '100%', height: '110%'}} />
            <View style={styles.header}>
                <View>
                    <Image source={WhiteLogo} style={{ maxWidth: 80, maxHeight: 80 }} resizeMode="contain" />
                </View>
               
            </View>
            <View style={styles.footer}>
                <View style={styles.containerHeader}>
                    <Text style={styles.textHeader}>Login</Text>
                </View>
                <View style={styles.input}>
                    <TextInput 
                        placeholder="email"
                        placeholderTextColor="gray"
                        style={styles.form}
                        onChangeText={(value) => {setEmail(value)}}
                    />
                    <Icon name="user" size={15} color="gray" />
                </View>

                <View style={styles.input}>
                    <TextInput 
                        placeholder="password"
                        placeholderTextColor="gray"
                        style={styles.form}
                        onChangeText={(value) => {setPassword(value)}}
                        autoCompleteType="off"
                        caretHidden={true}
                        secureTextEntry={true}
                    />
                    <Icon name="eye-slash" size={15} color="gray" />
                </View>
                <View>
                    <TouchableOpacity style={styles.mainBtn} onPress={() => {login()}}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 18 }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginTop: 10, textAlign: 'center', alignContent: 'center'}}>
                    <Text style={{ color: 'white', marginBottom: 15 }}>Don't have account yet? signup now</Text>
                </View>
            </View>
            <View style={{ flex: 0.1, backgroundColor: 'white', width: '100%', borderTopRightRadius: 40, borderTopLeftRadius: 40, padding: 30}}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: -10}}>
                    <Image source={BlackLogo} style={{ width: 30, height: 30}} resizeMode="contain" />
                    <Text style={{ marginTop: 5}}> Platform Online School</Text>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0A5A91',
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
        flex: 2,
        justifyContent: 'center'
    },
    textHeader: {
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 'bold'
    },
    form: {
        paddingHorizontal: 20,
        fontSize: 15,
        width: '90%',
        color: 'black'
    },
    footer: {
        flex: 4,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 50,
        width: 415,
        alignContent: 'center'

    },
    mainBtn: {
        marginTop: 30,
        borderRadius: 40,
        backgroundColor: '#FFC300',
        height: 40,
        padding: 10,
        elevation: 2,
        justifyContent: 'center'

    },
    input: {
        flexDirection: 'row',
        backgroundColor: 'white',
        opacity: 0.7,
        borderColor: 'grey',
        borderRadius: 20,
        borderWidth: 0.3,
        paddingVertical: 5,
        alignItems: 'center',
        marginTop: 10,
        height: 40

    },
    containerHeader: {
        textAlign: 'center',
        alignItems: 'center'
    },
    containerLoading: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center'
    }


  });
  