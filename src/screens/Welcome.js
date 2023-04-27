import React from 'react'
import  {View, Text} from 'react-native'
import {screenStyles} from './screenStyles'
import { light, dark } from './screenStyles';
import {LinearGradient} from 'expo-linear-gradient';

export const Welcome = () => {

    const styles = screenStyles()
    return (
            <LinearGradient
                style={styles.welcome}
                colors={[light, dark]}
            >
                <Text
                    // style={styles.welcomeTxt}
                >Make It Happen!</Text>
            </LinearGradient>
    );         
}

