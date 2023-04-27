import { StyleSheet } from "react-native";
import { useFonts, Condiment_400Regular } from '@expo-google-fonts/condiment';

export const light = '#00ffeb'
export const dark = '#092479'

export const screenStyles = () => {
    let [fontsLoaded] = useFonts({
        Condiment_400Regular,
    });

   

    return StyleSheet.create({
        welcome: {
            flex:1, 
            alignItems: 'center',
            justifyContent: 'center', 
        },
        welcomeTxt: {
            fontWeight: 'bold',
            fontFamily:'Condiment_400Regular',
            fontSize:50, 
            color: 'white'
        },
        header: {
            fontWeight: 'bold',
            fontFamily:'Condiment_400Regular',
            fontSize:50, 
            backgroundColor: '#00A1A1',
        }
    })
}
// style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}