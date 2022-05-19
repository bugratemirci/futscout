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
import FootballerDetailBottom from '../components/FootballerDetailBottom';


const axios = require('axios')

const FootballPlayerDetailScreen = ({ route, navigation }) => {
    const { user, item } = route.params
    const [footballer, setFootballer] = useState([])
    const storeData = (seasons) => {
        setFootballer(seasons)
    }
    useEffect(() => {
        axios.post('http://192.168.1.53:3000/footballers/get_player_by_id', { id: item.id })
            .then((response) => {
                const { seasons } = response.data
                storeData(seasons)
            })
            .catch((err) => {
                console.log(err)
            })
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
                    <Image source={require('../assets/icons/footballer.png')} style={[styles.iconStyle, { width: 55, height: 55 }]}></Image>
                    <Text style={styles.brandViewText}>Futbolcu Detay</Text>
                </View>
            </ImageBackground>
            <FootballerDetailBottom footballer={item} seasonBySeason={footballer} />
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

export default FootballPlayerDetailScreen