import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
const axios = require('axios');
import { deviceIp } from '../config';

const FootballerBottom = ({ footballers, user, navigation, route }) => {

    const [footballerss, setFootballerss] = useState([]);
    const [searchText, setSearchText] = useState("");

    const predictedValue = (cluster) => {
        if (cluster == 0) {
            return "7 - 10 M Euro"
        }
        else if (cluster == 1) {
            return "3-7 M Euro"
        }
        else if (cluster == 2) {
            return "70-85 M Euro"
        }
        else if (cluster == 3) {
            return "0-3 M Euro"
        }
        else if (cluster == 4) {
            return "+85 M Euro"
        }
        else if (cluster == 5) {
            return "20-30 M Euro"
        }
        else if (cluster == 6) {
            return "50-70 M Euro"
        }
        else if (cluster == 7) {
            return "10-15 M Euro"
        }
        else if (cluster == 8) {
            return "15-20 M Euro"
        }
        else if (cluster == 9) {
            return "30-40 M Euro"
        }
    }

    const getPlayers = () => {
        axios.post('http://' + deviceIp + ':3000/api/players/getPlayerByName', { name: searchText })
            .then((response) => {
                const { footballers } = response.data
                setFootballerss(footballers);
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {

            })
    }
    useEffect(() => {
        getPlayers();
    }, []);
    const renderFootballerList = () => {
        return (
            footballerss.map((item, index) => {
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
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Arama"
                    onChangeText={(text) => {
                        setSearchText(text);
                    }}
                />
                <TouchableOpacity style={styles.searchButton} onPress={getPlayers}>
                    <Text style={{ color: 'white' }}>Ara</Text>
                </TouchableOpacity>
            </View>
            {renderFootballerList()}
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
    },
    searchButton: {
        width: Dimensions.get('window').width / 5,
        height: 35,
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
    textInput: {
        height: '50%',
        width: '70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        borderRadius: 40,
        borderColor: 'rgb(223, 71, 89)'
    },

})
export default FootballerBottom