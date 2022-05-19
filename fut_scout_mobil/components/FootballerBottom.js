import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity

} from 'react-native';

const FootballerBottom = ({ footballers, user, navigation, route }) => {

    const predictedValue = (cluster) => {
        if (cluster == 4) {
            return "90 - 100 M"
        }
        else if (cluster == 6) {
            return "60-90 M"
        }
    }
    const renderFootballerList = () => {
        return (
            footballers.map((item, index) => {
                return (
                    <TouchableOpacity style={styles.card} key={index} onPress={() => {
                        navigation.navigate('FootballPlayerDetail', { user, item });
                    }}>
                        <View style={styles.footballerName}>
                            <Image
                                source={require('../assets/icons/footballer.png')}
                                style={{ width: 30, height: 30 }}
                            />
                            <Text style={[styles.cardText, { marginLeft: 10 }]}>{item.player_name}</Text>
                        </View>
                        <View
                            style={{ borderBottomWidth: 1, width: '80%', position: 'absolute', bottom: '45%', left: '10%', borderColor: 'white' }}
                        />
                        <View style={styles.footballerInfo}>
                            <Text style={styles.cardText}>Gol: {parseFloat(item.goals).toFixed(1)}</Text>
                            <Text style={styles.cardText}>Asist: {parseFloat(item.assists).toFixed(1)}</Text>
                            <Text style={styles.cardText}>Değer: {predictedValue(item.classes)}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }))
    }
    return (
        <View style={styles.bottomView}>
            <View style={{ paddingRight: 15, paddingLeft: 15 }}>
                <Text style={{ color: '#000000', fontSize: 25, textAlign: 'center' }}>Futbolcu Listesi
                </Text>
                <View style={{ marginTop: 10 }}>
                    {renderFootballerList()}
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
        width: 5 * (Dimensions.get('window').width) / 6,
        height: 0.7 * (Dimensions.get('window').height) / 6,
        borderRadius: 15,
        margin: 10,
        backgroundColor: 'rgba(223, 71, 89,.8)',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    cardText: {
        color: 'white',
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
    footballerName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footballerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }

})
export default FootballerBottom