import React from 'react'
import  {View, Text, TouchableOpacity} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
// import stylesFn from './styles'

export const Calendar = () => {
    const {navigate}= useNavigation()
    // const styles = stylesFn()
    return (
        <View>
            <Text>Calendar</Text>
        </View>
        // <View style = {styles.basic}>
        //     <Text style = {styles.h1}>This is a Cal screen</Text>
        //     <TouchableOpacity
        //     style= {styles.button}
        //     onPress={()=> {
        //         navigate('Welcome')
        //     }}>
        //         <Text>See Welcome</Text>
        //     </TouchableOpacity>
        // </View>
    )
}

