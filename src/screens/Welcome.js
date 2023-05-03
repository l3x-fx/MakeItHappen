import React from 'react'
import  {View, Image} from 'react-native'
import {screenStyles} from './screenStyles'

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

