import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {View, Text, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import {screenStyles} from './screenStyles'
import { getDate, getToday } from '../features/datesSlice';
import { addTodo, editTodo, removeTodo, setStatus, selectTodos, getTodosByDay } from '../features/todosSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'

export const ToDo = () => {
    const {navigate}= useNavigation()
    const dispatch = useDispatch()
    const styles = screenStyles()
    const selected = useSelector(getDate)
    const toDos = useSelector(getTodosByDay(selected))
    const today = useSelector(getToday)

    const [addActive, setAddActive] = useState(false)
    const [text, onChangeText] = useState('')
    

    const addTodoHandler = () => {
        console.log('add')
    }

    const Item = ({item, backgroundColor, textDecorationLine}) => (
        <TouchableOpacity 
            style={[styles.listitem, {backgroundColor}]}
            onLongPress={()=> dispatch(editTodo({day: selected, id:item.id, text:'take a bath'}))}
            onPress={() => dispatch(setStatus({day:selected, id:item.id}))}
            activeOpacity={0.6}>
            <Text style={{textDecorationLine}}>{item.text}</Text>
            <Ionicons 
                onPress={() => dispatch(removeTodo({day: selected, id:item.id}))}
                name="close-circle-outline" 
                size={20} 
                style={{marginRight:0, marginLeft:'auto', textDecorationLine: 'none'}}/>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const backgroundColor = item.done === false ? '#c5c5c5' : '#e5e5e5';
        const textDecorationLine = item.done === false ? 'none' : 'line-through';

        return (
            <Item
                item={item}
                backgroundColor={backgroundColor}
                textDecorationLine={textDecorationLine}
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
                    data={toDos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            {addActive && (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder='Add New Fun Thing To Do'
                        value={text}
                    />
                </View>
            )}
            {addActive 
                ? <View style={styles.contentbox}>
                    <Ionicons 
                        // onPress={() => dispatch(addTodo({day: selected, text:'eat cake'}))}
                        onPress={() => setAddActive(!addActive)}
                        name= 'checkmark-outline'
                        size={40} 
                        style={{marginRight:0, marginLeft:'auto'}}/>

                        {/* // checkmark-outline / close-outline */}
                    <Ionicons 
                        // onPress={() => dispatch(addTodo({day: selected, text:'eat cake'}))}
                        onPress={() => setAddActive(!addActive)}
                        name= 'close-outline'
                        size={40} 
                        style={{marginRight:0, marginLeft:'auto'}}/>

                        {/* // checkmark-outline / close-outline */}
                </View>
                : 
                <View style={styles.contentbox}>
                <Ionicons 
                    // onPress={() => dispatch(addTodo({day: selected, text:'eat cake'}))}
                    onPress={() => setAddActive(!addActive)}
                    name= {addActive ? 'remove-circle-outline': 'add-circle-outline' }
                    size={40} 
                    style={{marginRight:0, marginLeft:'auto'}}/>

                    {/* // checkmark-outline / close-outline */}
                </View>
            }
        </View>
    )
    
}