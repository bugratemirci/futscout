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
const ProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const username = user.username;
    const [userProfile, setUserProfile] = useState([]);
    const [isPremium, setIsPremium] = useState(false);
    useEffect(() => {
        axios.post('http://' + deviceIp + ':3000/api/users/getUser', { username })
            .then((response) => {
                const { user } = response.data
                setUserProfile(user);
                setIsPremium(user.isPremium);
                if (user.isAdmin) {
                    setIsPremium(true);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const userUpdateOnPress = () => {
        navigation.navigate('UserUpdate', { user });
    }
    return (
        <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/bg.jpg')}
                style={styles.backgroundStyle}
                blurRadius={6}>
                <View style={styles.brandView}>
                    <Image source={require('../assets/icons/profile.png')} style={styles.iconStyle}></Image>
                    <Text style={styles.brandViewText}>Profil</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                    <Image source={isPremium ? require('../assets/icons/premium.png') : require('../assets/icons/is_not_premium.png')} style={styles.iconStyleProfile}></Image>
                    <Image source={userProfile.isAdmin ? require('../assets/icons/admin_2.png') : require('../assets/icons/is_not_admin.png')} style={styles.iconStyleProfile}></Image>
                </View>
                <View style={styles.mainCard}>
                    <View style={{ justifyContent: 'center', alignItems: 'baseline' }}>
                        <View style={styles.infoCard}>
                            <Image source={require('../assets/icons/user_profile.png')} style={styles.iconStyleProfile}></Image>
                            <Text style={styles.infoCardText}> {userProfile.username}</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Image source={require('../assets/icons/f_teams_red.png')} style={styles.iconStyleProfile}></Image>
                            <Text style={styles.infoCardText}>{userProfile.team}</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Image source={require('../assets/icons/phone.png')} style={styles.iconStyleProfile}></Image>
                            <Text style={styles.infoCardText}>{userProfile.tel}</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Image source={require('../assets/icons/mail.png')} style={styles.iconStyleProfile}></Image>
                            <Text style={styles.infoCardText}>{userProfile.mail}</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        style={[styles.infoCard, { height: 50, borderLeftWidth: 1, backgroundColor: 'rgb(223, 71, 89)', justifyContent: 'center', marginTop: 50 }]}
                        onPress={userUpdateOnPress}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Düzenle</Text>
                    </TouchableOpacity>
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
        fontSize: 23,
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
        padding: 35
    },
    mainCard: {
        paddingRight: 15,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconStyleProfile: {
        height: 55,
        width: 55,
        marginRight: 10
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        width: Dimensions.get('window').width / 1.32,
        borderRadius: Dimensions.get('window').width / 1.32,
        borderColor: 'rgb(223, 71, 89)'

    },
    infoCardText: {
        color: 'grey'
    }
})

export default ProfileScreen