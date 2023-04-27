import { StyleSheet } from "react-native";
import { useFonts, Condiment_400Regular } from '@expo-google-fonts/condiment';

export const navStyle = () => {
    let [fontsLoaded] = useFonts({
        Condiment_400Regular,
      });
    return StyleSheet.create({
        header: {
            fontWeight: 'bold',
            fontFamily:'Condiment_400Regular',
            fontSize:50, 
            backgroundColor: '#00A1A1',
        }
    })
}