import React from 'react'
import  {View, Text, Image} from 'react-native'
import {screenStyles} from './screenStyles'
import { light, dark } from './screenStyles';
import {LinearGradient} from 'expo-linear-gradient';


export const Welcome = () => {

    const styles = screenStyles()
    return (
            <View style={styles.welcome}>
                <Image 
                    source={require('../../assets/welcome-screen.png')}
                    style={styles.welcomeImg} />
            </View>            
    );         
}

