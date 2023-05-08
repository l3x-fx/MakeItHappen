import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  { View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { useIsFocused} from '@react-navigation/native';

import {screenStyles} from './screenStyles'
import { getDate, getToday } from '../features/datesSlice';
import { removeTodoAsync, setStatusAsync, getAllTodosAsync, getTodos } from '../features/todosSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Spacer } from '../components/Spacer';
import { SubmitText } from '../components/SubmitText'

export const ToDo = () => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    
    useEffect(() => {
        dispatch(getAllTodosAsync())
        resetAdd()
        resetEdit()
    },[isFocused])

    const styles = screenStyles()
    const selected = useSelector(getDate)
    const toDos = useSelector(getTodos(selected))
    console.log('TODOS/DAY ' + JSON.stringify(toDos))
    const today = useSelector(getToday)
    
    const [addActive, setAddActive] = useState(false)
    const [editId, setEditId] = useState('')

    const resetAdd = () => setAddActive(false)
    const resetEdit = () => setEditId('')

    const renderItem = ({item}) => {
        const backgroundColor = item.done === true ? '#e5e5e5' : '#0caabe30';
        const textDecorationLine = item.done === false ? 'none' : 'line-through';
        return (
            <Item
                item={item}
                backgroundColor={backgroundColor}
                textDecorationLine={textDecorationLine}
            />
        );
    };
    const Add = () => {
        {if (addActive){
            return(
                <SubmitText
                    isEdit={false}
                    resetAdd={resetAdd}
                    resetEdit={resetEdit}
                />
            )
        } else {
            return(
                <View style={styles.listitem}>
                    <Ionicons
                        onPress={() => setAddActive(!addActive)}
                        name= {'add-circle-outline'}
                        size={33}
                        style={{margin:'auto'}}/>
                </View>
            )}
        }
    }

    const Item = ({item, backgroundColor, textDecorationLine}) => (
        <TouchableOpacity
            style={[styles.listitem, {backgroundColor}, editId === item.id && { backgroundColor: '#fff' }]}
            onLongPress={() => setEditId(item.id)}
            onPress={() => editId==='' && dispatch(setStatusAsync({day:selected, id:item.id}))}
            activeOpacity={0.6}>
            {editId ===item.id
                ?  <SubmitText
                    isEdit={true}
                    editId={editId}
                    initialValue={item.text}
                    resetAdd={resetAdd}
                    resetEdit={resetEdit}
                />
                : <Text style={{textDecorationLine}}>{item.text}</Text>
            }
            {editId !==item.id
                && <Ionicons
                onPress={() => dispatch(removeTodoAsync({day: selected, id:item.id}))}
                name="close-circle-outline"
                size={20}
                style={{marginRight:0, marginLeft:'auto', textDecorationLine: 'none', paddingLeft: 10}}/>
            }
        </TouchableOpacity>
    );

    return (
        <View style={styles.screen}>
            <Spacer  />
            <View style ={styles.bannercontainer}>
                <ImageBackground
                source={require('../../assets/banner.png')}
                style={styles.banner}
                resizeMode='cover' />
            </View>
            <Text style ={styles.title}>ToDo</Text>
            <Text>{selected === today ? 'Today' : selected}</Text>
            
            <FlatList
                style={{alignSelf: 'center'}}
                ListHeaderComponent={<></>}
                data={toDos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<Add />}
                removeClippedSubviews={false}
            />
        </View>
    )
}