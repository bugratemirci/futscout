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
import HomeNav from '../components/HomeNav';
const axios = require('axios')

const HomeScreen = ({ route, navigation }) => {
    const { user } = route.params;
    return (
        <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/bg.jpg')}
                style={styles.backgroundStyle}
                blurRadius={6}>
                <View style={styles.brandView}>
                    <Image source={require('../assets/icons/home.png')} style={[styles.iconStyle, { width: 55, height: 55 }]}></Image>
                    <Text style={styles.brandViewText}>Ana Sayfa</Text>
                </View>
            </ImageBackground>
            <HomeNav user={user} navigation={navigation} route={route} />
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
})

export default HomeScreen