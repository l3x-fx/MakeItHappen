import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import {screenStyles} from './screenStyles'
import { getDate, getToday } from '../features/datesSlice';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        text: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        text: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        text: 'Third Item',
    },
];

export const ToDo = () => {
    const {navigate}= useNavigation()
    const dispatch = useDispatch()
    const styles = screenStyles()
    const selected = useSelector(getDate)
    const today = useSelector(getToday)

    const [selectedId, setSelectedId] = useState();

    const Item = ({item, onPress, backgroundColor}) => (
        <TouchableOpacity onPress={onPress} style={[styles.listitem, {backgroundColor}]}>
            <Text >{item.text}</Text><Text>X</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#c5c5c5' : '#e5e5e5';
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      };


    return (
        <View style={styles.screen}>
            <View style={styles.bannercontainer}>
                <ImageBackground 
                    source={require('../../assets/banner.png')}
                    style={styles.banner}
                    resizeMode='cover' />
            </View>            
                <Text style={styles.title}>ToDo</Text>
                <Text>{selected === today ? 'Today' : selected}</Text>
            <View style={styles.contentbox}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
            </View>
        </View>
    )
}