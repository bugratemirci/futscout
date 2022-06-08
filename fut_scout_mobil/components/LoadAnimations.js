import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';


const LoadAnimations = () => {
    const progress = useRef(new Animated.Value(0)).current;

    const handleLikeAnimation = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 11000,
            useNativeDriver: true,
            
        }).start();
    };
    useEffect(() => {
        handleLikeAnimation();
    });
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../assets/animations/loader_ai.json')} progress={progress} loop/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
        zIndex: 1,
        
    }
})

export default LoadAnimations