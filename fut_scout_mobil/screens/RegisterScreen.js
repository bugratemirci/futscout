import React, { useState } from 'react'
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

const RegisterScreen = ({ route, navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [favteam, setFavteam] = useState('')

    const registerButtonClick = () => {
        const userreq = {
            username: username,
            password: password,
            mail: mail,
            tel: phone,
            team: favteam
        }

        axios.post('http://' + deviceIp + ':3000/api/users/signUp', { userreq })
            .then((response) => {
                const { status } = response.data
                if (status == true) {
                    navigation.navigate('Login');
                }
                else {
                    console.error('Kayıt başarısız')
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then(() => {

            })
    }

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
                <View style={{ padding: 15, paddingTop: 30 }}>
                    <Text style={{ color: '#000000', fontSize: 25, textAlign: 'center' }}>Kayıt ol</Text>
                    <View style={{ marginTop: 22 }}>
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
                        />
                        <TextInput
                            mode='flat'
                            label='Email Adresi'
                            outlineColor='black'
                            placeholder='Email adresinizi girin'
                            activeOutlineColor='grey'
                            selectionColor='black'
                            activeUnderlineColor='black'
                            style={{ backgroundColor: 'white' }}
                            onChangeText={(text) => {
                                setMail(text)
                            }}
                            autoComplete='email'
                            keyboardType='email-address'
                        />
                        <TextInput
                            mode='flat'
                            label='Telefon Numarası'
                            outlineColor='black'
                            placeholder='Telefon numaranızı girin'
                            activeOutlineColor='grey'
                            selectionColor='black'
                            activeUnderlineColor='black'
                            style={{ backgroundColor: 'white' }}
                            onChangeText={(text) => {
                                setPhone(text)
                            }}
                            autoComplete='cc-number'
                            keyboardType='phone-pad'
                        />
                        <TextInput
                            mode='flat'
                            label='Favori Takımınız'
                            outlineColor='black'
                            placeholder='Favori takımınızı girin'
                            activeOutlineColor='grey'
                            selectionColor='black'
                            activeUnderlineColor='black'
                            style={{ backgroundColor: 'white' }}
                            onChangeText={(text) => {
                                setFavteam(text)
                            }}
                        />
                    </View>
                    <View style={styles.registerView}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={styles.registerButton} onPress={registerButtonClick}>
                                <Text style={{ color: 'white' }}>Kayıt Ol</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

export default RegisterScreen

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
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 45,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    registerView: {
        height: 40,
        flexDirection: 'row',
        marginTop: 20
    },
    registerButton: {
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
        marginTop: 30
    }
})