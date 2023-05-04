import { StyleSheet } from "react-native";
import { useFonts, Condiment_400Regular } from '@expo-google-fonts/condiment';

export const light = '#03c2cc'
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
            height: '100%',
            width:'100%'
        },
        welcomeImg: {
            height: '100%',
            width: '100%'
        },
        screen: {
            flex:1, 
            alignItems: 'center',
            justifyContent: 'flex-start', 
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily:'Condiment',
            fontSize:50, 
            backgroundColor: 'white'
        },
        bannercontainer:{
            width:'100%',
            height:'12%',

        },
        banner: {
            flex: 1
        }, 

        title: {
            fontFamily: 'Condiment',
            fontSize:24, 
            textAlign: 'center'
        }, 
        contentbox: {
            paddingTop: '5%'
            
        },
        container: {
            flex: 1,
        },
        listitem: {
            padding: 8,
            marginVertical: 5,
            marginHorizontal: 5,
            width: '80%',
            flexDirection: 'row', 
            textAlign: 'left'
        },
        inputcontainer:{
            flexDirection: 'row', 
            alignItems: 'center', 
            width: '80%',
            margin: 'auto', 
            marginTop: 10
        },
        input: {
            height: 40,
            width: '100%',
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            // placeholderTextColor: '#c5c5c5'
        },
        });
    }
    
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}