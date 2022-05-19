import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FootballerBottom from '../components/FootballerBottom';
const axios = require('axios')

const FootballPlayersScreen = ({ route, navigation }) => {
    const { user } = route.params
    const [footballers, setFootballers] = useState([]);

    const getData = async () => {
        try {
            const footballerss = await AsyncStorage.getItem('@footballers')
            setFootballers(JSON.parse(footballerss))
            if (value !== null) {
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        getData()
    }, []);

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
            <FootballerBottom user={user} footballers={footballers} route={route} navigation={navigation} />
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
})

export default FootballPlayersScreen