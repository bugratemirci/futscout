import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
    VirtualizedList

} from 'react-native';
import { TextInput } from 'react-native-paper';
import { deviceIp } from '../config';
const axios = require('axios')

const PredictionPage = ({ route, navigation }) => {
    const { cluster } = route.params;
    const [footballers, setFootballers] = useState([1, 2, 3]);
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
    const renderSimilarFootballers = () => {
        return (
            footballers.map((item, index) => {
                return (
                    <View style={styles.card} key={index}>
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
                    </View>
                )
            })
        )
    }
    const getPlayers = () => {
        axios.post('http://' + deviceIp + ':3000/api/players/getPlayerByCluster', { cluster })
            .then((response) => {
                const { footballers } = response.data
                setFootballers(footballers);
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {

            })
    }
    useEffect(() => {
        getPlayers();
    }, [])
    return (
        <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/bg.jpg')}
                style={styles.backgroundStyle}>
                <View style={styles.brandView}>
                    <Image source={require('../assets/icons/predictions.png')} style={styles.iconStyle}></Image>
                    <Text style={styles.brandViewText}>Futbolcu Tahmini</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 15, paddingTop: 30 }}>
                    <Text style={{ color: '#000000', fontSize: 20, textAlign: 'center' }}>Futbolcunun Değeri</Text>
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.playerInfo}>
                            <Image
                                source={require('../assets/icons/footballer.png')}
                                style={{ width: 30, height: 30 }}
                            />
                            <View>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 13 }}> Oyuncunun Tahmin Edilen Değeri</Text>
                                <View
                                    style={{ borderBottomWidth: 1, width: '100%', borderColor: 'white', marginTop: 10, marginBottom: 10 }}
                                />
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 13 }}>{predictedValue(cluster)}</Text>
                            </View>

                        </View>
                        <Text style={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 15, marginBottom: 15 }}>Benzer Futbolcular</Text>
                        {renderSimilarFootballers()}
                    </View>
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
        fontSize: 25,
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
    predictionView: {
        height: 40,
        flexDirection: 'row',
        marginTop: 20
    },
    predictionButton: {
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
    },
    playerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 5 * (Dimensions.get('window').width) / 6,
        height: 0.7 * (Dimensions.get('window').height) / 6,
        borderRadius: 10,
        backgroundColor: 'rgba(223, 71, 89,.8)',
    },
    iconStylePrediction: {
        height: 35,
        width: 35
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
    }, footballerName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footballerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

})

export default PredictionPage