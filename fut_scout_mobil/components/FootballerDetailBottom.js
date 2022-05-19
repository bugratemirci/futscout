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

const FootballerDetailBottom = ({ footballer, user, navigation, route, seasonBySeason }) => {
    const detailRender = () => {
        return (
            seasonBySeason.map((item, index) => {
                return (
                    <View style={styles.card} key={index}>
                        <View style={styles.subCard}>
                            <Text style={styles.cardText}>Sezon {(index + 1)}</Text>
                        </View>
                        <View
                            style={{ borderBottomWidth: 1, width: '50%', position: 'absolute', bottom: '70%', left: '25%', borderColor: 'white' }}
                        />
                        <View style={styles.subCard}>
                            <Text style={styles.cardText}>Gol: {item.goals}</Text>
                            <Text style={styles.cardText}>Asist : {item.assists}</Text>
                        </View>
                        <View style={styles.subCard}>
                            <Text style={styles.cardText}>Maç: {item.games}</Text>
                            <Text style={styles.cardText}>xG : {parseFloat(item.xG).toFixed(1)}</Text>
                        </View>
                    </View>
                )
            }))
    }
    return (
        <View style={styles.bottomView}>
            <View style={{ paddingRight: 15, paddingLeft: 15 }}>
                <Text style={{ color: '#000000', fontSize: 25, textAlign: 'center' }}>{footballer.player_name}
                </Text>
                <View style={{ marginTop: 10 }}>
                    {detailRender()}
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
        height: 0.9 * (Dimensions.get('window').height) / 6,
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
    },
    subCard: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }

})
export default FootballerDetailBottom