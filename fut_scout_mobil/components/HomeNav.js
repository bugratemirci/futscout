import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import { deviceIp } from '../config';

const HomeNav = ({ user, route, navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [isPremium, setIsPremium] = useState('');
    console.log(user);

    const adminRender = () => {
        if (isAdmin) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/icons/admin.png')} style={styles.iconStyle}></Image>
                        <Text style={styles.cardText}>Admin Paneli</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    useEffect(() => {
        setUsername(user.username);
        setPassword(user.password);
        setIsAdmin(user.isAdmin);
        setIsPremium(user.isPremium);
        if (isAdmin == true) {
            setIsPremium(true);
        }
    }, []);

    return (
        <View style={styles.bottomView}>
            <View style={{ paddingRight: 15, paddingLeft: 15 }}>
                <Text style={{ color: '#000000', fontSize: 25, textAlign: 'center' }}>Hoş geldiniz
                </Text>
                <View style={{ marginTop: 65 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => {
                                navigation.navigate('Profile', { user });
                            }}
                        >
                            <Image source={require('../assets/icons/user.png')} style={styles.iconStyle}></Image>
                            <Text style={styles.cardText}>Profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => {
                                navigation.navigate('FootballPlayers', { user });
                            }}
                        >
                            <Image source={require('../assets/icons/footballers.png')} style={styles.iconStyle}></Image>
                            <Text style={styles.cardText}>Futbolcular</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={isPremium ? styles.card : styles.cardDisabled}
                            disabled={(!isPremium)}
                            onPress={() => {
                                navigation.navigate('FootballerPrediction', { user });
                            }}
                        >
                            <Image source={require('../assets/icons/predictions.png')} style={styles.iconStyle}></Image>
                            <Text style={styles.cardText}>Futbolcu Tahmini</Text>
                        </TouchableOpacity>
                        {adminRender()}
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    backgroundStyle: {
        height: Dimensions.get('window').height / 2.7,
        resizeMode: 'center'
    },
    iconStyle: {
        height: 35,
        width: 35
    },
    brandView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',

    },
    brandViewText: {
        color: '#ffffff',
        fontSize: 23,
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
        paddingTop: .2 * (Dimensions.get('window').width) / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: 2 * (Dimensions.get('window').width) / 6,
        height: 1 * (Dimensions.get('window').height) / 6,
        justifyContent: 'center',
        borderRadius: 35,
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'rgba(223, 71, 89,.8)',
    },
    cardText: {
        color: 'white',
        marginTop: 5,
        fontSize: 13
    },
    cardDisabled: {
        width: 2 * (Dimensions.get('window').width) / 6,
        height: 1 * (Dimensions.get('window').height) / 6,
        justifyContent: 'center',
        borderRadius: 35,
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'rgba(105,105,105,.8)',
    },
})
export default HomeNav