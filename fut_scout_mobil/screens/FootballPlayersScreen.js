import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Image,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FootballerBottom from '../components/FootballerBottom';
const axios = require('axios')
import { deviceIp } from '../config';
const FootballPlayersScreen = ({ route, navigation }) => {
    const { user } = route.params

    return (
        <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/bg.jpg')}
                style={styles.backgroundStyle}
                blurRadius={6}>
                <View style={styles.brandView}>
                    <Image source={require('../assets/icons/footballers.png')} style={[styles.iconStyle, { width: 55, height: 55 }]}></Image>
                    <Text style={styles.brandViewText}>Futbolcular</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ paddingRight: 15, paddingLeft: 15 }}>
                    <FootballerBottom user={user} route={route} navigation={navigation} />
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
        paddingTop: 45
    }
})

export default FootballPlayersScreen