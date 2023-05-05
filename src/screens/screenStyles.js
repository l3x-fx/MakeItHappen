import { StyleSheet } from "react-native";

export const light = '#03c2cc'
export const dark = '#092479'

export const screenStyles = () => {

    return StyleSheet.create({
        welcome: {
            flex:1, 
            alignItems: 'center',
            justifyContent: 'center', 
            height: '80%',
            width:'100%'
        },
        welcomeImg: {
            height: '100%',
            width: '100%'
        },
        screen: {
            //flex:1, 
            alignItems: 'center',
            width:'100%',
            height: '100%',
            justifyContent: 'flex-start', 
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily:'Condiment',
            fontSize:50, 
            backgroundColor: 'white'
        },
        bannercontainer:{

            width:'100%',
            height: 100

        },
        banner: {
            flex: 1
        }, 

        title: {
            fontFamily: 'Condiment',
            fontSize:24, 
            textAlign: 'center', 
            width: '100%',
            paddingTop: '5%',
        }, 
        calendartitle: {
            fontFamily: 'Condiment',
            fontSize:24, 
            textAlign: 'left', 
            width: '100%',
            paddingHorizontal: 8
        }, 
        contentbox: {
            paddingTop: '5%',
            alignItems: 'center',
            width:'85%',
        },
        container: {
            flex: 1,
        },
        list: {
            alignItems:'center',
            
        },
        listitem: {
            padding: 8,
            marginVertical: 5,
            width: '100%',
            flexDirection: 'row', 
            textAlign: 'left',
            justifyContent: 'center',


        },
        inputcontainer:{
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: 10,

        },
        input: {
            height: 40,
            width: '75%',
            marginRight: 12,
            borderWidth: 1,
            padding: 10,

        },
        });
    }
    
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}