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
    VirtualizedList,
    ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { deviceIp } from '../config';
import LoadAnimations from '../components/LoadAnimations';
const axios = require('axios')

const FootballerPrediction = ({ route, navigation }) => {
    const [games, setGames] = useState(0);
    const [time, setTime] = useState(0);
    const [goals, setGoals] = useState(0);
    const [xg, setXG] = useState(0);
    const [assists, setAssists] = useState(0);
    const [xa, setXA] = useState(0);
    const [shots, setShots] = useState(0);
    const [keyPasses, setKeyPasses] = useState(0);
    const [yellowCards, setYellowCards] = useState(0);
    const [redCards, setRedCards] = useState(0);
    const [npg, setNpg] = useState(0);
    const [npxG, setNpxG] = useState(0);
    const [xGChain, setXGChain] = useState(0);
    const [xGBuildup, setXGBuildup] = useState(0);
    const [vals, setVals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predPending, setPredPending] = useState(false);
    const [isPrediction, setIsPrediction] = useState(false);

    const predictionButtonPress = () => {

        setIsPrediction(true);
        setPredPending(true);
        setVals([games, time, goals, xg, assists, xa, shots, keyPasses, yellowCards, redCards, npg, npxG, xGChain, xGBuildup]);
    };
    useEffect(() => {
        axios.post('http://' + deviceIp + ':3000/api/prediction/prediction', { statistics: vals })
            .then((response) => {

                if (isPrediction) {
                    navigation.navigate('PredictionPage', { cluster: response.data });
                    setPredPending(false);
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {

            })
    }, [vals]);

    return (
        <>
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
                        <Text style={{ color: '#000000', fontSize: 20, textAlign: 'center' }}>Aşağıya Futbolcunun Sezonluk Bilgilerini Girin</Text>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='Maç Sayısı'
                                    outlineColor='black'
                                    placeholder='Maç Sayısı'
                                    activeOutlineColor='grey'
                                    keyboardType='number-pad'
                                    selectionColor='black'
                                    activeUnderlineColor='black'

                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5 }}
                                    onChangeText={(text) => {
                                        setGames(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Dakika'
                                    outlineColor='black'
                                    placeholder='Dakika'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {

                                        setTime(parseFloat(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='Gol Sayısı'
                                    outlineColor='black'
                                    placeholder='Gol Sayısı'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setGoals(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='xG'
                                    outlineColor='black'
                                    placeholder='xG'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setXG(parseInt(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='Asist'
                                    outlineColor='black'
                                    placeholder='Asist'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setAssists(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='xA'
                                    outlineColor='black'
                                    placeholder='xA'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    keyboardType='number-pad'
                                    activeUnderlineColor='black'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setXA(parseInt(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='Şut Sayısı'
                                    outlineColor='black'
                                    placeholder='Şut Sayısı'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setShots(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Kilit Pas'
                                    outlineColor='black'
                                    placeholder='Kilit Pas'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setKeyPasses(parseInt(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='Sarı Kart'
                                    outlineColor='black'
                                    placeholder='Sarı Kart'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setYellowCards(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Kırmızı Kart'
                                    outlineColor='black'
                                    placeholder='Kırmızı Kart'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setRedCards(parseInt(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='npg'
                                    outlineColor='black'
                                    placeholder='npg'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setNpg(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='npxG'
                                    outlineColor='black'
                                    placeholder='npxG'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setNpxG(parseInt(text))
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TextInput
                                    mode='outlined'
                                    label='xGChain'
                                    outlineColor='black'
                                    placeholder='xGChain'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setXGChain(parseInt(text))
                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='xGBuildup'
                                    outlineColor='black'
                                    placeholder='xGBuildup'
                                    activeOutlineColor='grey'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    keyboardType='number-pad'
                                    style={{ backgroundColor: 'white', width: Dimensions.get('window').width / 2.5, }}
                                    onChangeText={(text) => {
                                        setXGBuildup(parseInt(text))
                                    }}
                                />
                            </View>

                        </View>
                        <View style={styles.predictionView}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.predictionButton} onPress={predictionButtonPress}>
                                    <Text style={{ color: 'white' }}>Değeri Öğren</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView >
            {predPending ? <LoadAnimations /> : null}
        </>
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
    }
    ,
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    containerLottie: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.3)',
        zIndex: 1
    }
})

export default FootballerPrediction