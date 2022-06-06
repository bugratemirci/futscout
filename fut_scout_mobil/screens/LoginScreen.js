import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity

} from 'react-native';
import { TextInput } from 'react-native-paper';
import { deviceIp } from '../config';

const axios = require('axios')

const LoginScreen = ({ route, navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginButtonClick = () => {
        const userreq = {
            username: username,
            password: password
        }

        axios.post('http://' + deviceIp + ':3000/api/users/signIn', { userreq })
            .then((response) => {
                const { status, user } = response.data
                if (status == true) {
                    console.log("Giriş başarılı.");
                    navigation.navigate('Home', { user });
                }
                else {
                    console.error('Giriş başarısız');
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {

            })

    }
    const registerButtonClick = () => {
        navigation.navigate('Register', { username: username, password: password });
    }
    useEffect(() => {

    }, []);
    return (
        <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/bg.jpg')}
                style={styles.backgroundStyle}>
                <View style={styles.brandView}>
                    <Image source={require('../assets/icons/soccer.png')} style={styles.iconStyle}></Image>
                    <Text style={styles.brandViewText}>FutScout</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ paddingRight: 15, paddingLeft: 15 }}>
                    <Text style={{ color: '#000000', fontSize: 25, textAlign: 'center' }}>Hoş geldiniz</Text>
                    <View style={{ marginTop: 45 }}>
                        <TextInput
                            mode='flat'
                            label='Kullanıcı Adı'
                            outlineColor='black'
                            placeholder='Kullanıcı adınızı girin'
                            activeOutlineColor='grey'
                            selectionColor='black'
                            activeUnderlineColor='black'
                            style={{ backgroundColor: 'white' }}
                            onChangeText={(text) => {
                                setUsername(text)
                            }}
                        />
                        <TextInput
                            mode='flat'
                            label='Parola'
                            outlineColor='black'
                            placeholder='Parolanızı girin'
                            activeOutlineColor='grey'
                            selectionColor='black'
                            activeUnderlineColor='black'
                            style={{ backgroundColor: 'white' }}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.forgotPassView}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={styles.loginButton} onPress={loginButtonClick}>
                                <Text style={{ color: 'white' }}>Giriş Yap</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ color: 'gray', marginRight: 4, marginTop: 1 }}>
                                    Bir üyeliğiniz yok mu?
                                </Text>
                                <TouchableOpacity onPress={registerButtonClick}>
                                    <Text style={{ color: 'rgba(223, 71, 89,.8)' }}>
                                        Şimdi üye olun
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    backgroundStyle: {
        height: Dimensions.get('window').height / 2.6,
        resizeMode: 'center'
    },
    iconStyle: {
        height: 70,
        width: 70
    },
    brandView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    brandViewText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: '400',
        textTransform: 'uppercase',
        marginTop: 5
    },
    forgotPassView: {
        height: 40,
        flexDirection: 'row',
        marginTop: 80
    },
    loginButton: {
        width: Dimensions.get('window').width / 1.5,
        height: '100%',
        backgroundColor: 'rgba(223, 71, 89,.7)',
        shadowColor: 'rgb(223, 71, 89)',
        shadowOpacity: 0.9,
        elevation: 8,
        shadowRadius: 15,
        shadowOffset: { width: 56, height: 13 },
        borderWidth: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 45,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingTop: 45
    }
})

export default LoginScreen