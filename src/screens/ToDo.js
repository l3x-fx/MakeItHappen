import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {ScrollView, View, Text, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import {useIsFocused} from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native'
import {screenStyles} from './screenStyles'
import { getDate, getToday } from '../features/datesSlice';
import { addTodo, editTodo, removeTodo, setStatus, getTodosByDay } from '../features/todosSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Spacer } from '../components/Spacer';

export const ToDo = () => {
    const {navigate}= useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const styles = screenStyles()
    const selected = useSelector(getDate)
    const toDos = useSelector(getTodosByDay(selected))
    const today = useSelector(getToday)

    const [addActive, setAddActive] = useState(false)
    const [text, setText] = useState('')
    const [editId, setEditId] = useState('')
    const [editText, setEditText] = useState('')

    const textRef = useRef('')
    
    const textToRef = (text) =>{
        textRef.current = textRef.current + text
    }
    
    useEffect(() => {
        setAddActive(false)
        setText('')

    },[isFocused])

    const handeAddTodo = () => {
        text !=='' && dispatch(addTodo({day: selected, text:text}))
        setAddActive(!addActive)
        setText('')
    }

    const handleEditTodo = () => {
        dispatch(editTodo({day: selected, id:editId, text: editText}))
        setEditId('')
        setEditText('')
    }
    const handleEditCancel = () => {
        setEditId('')
        setEditText('')
    }

    const Item = ({item, backgroundColor, textDecorationLine}) => (
        <TouchableOpacity 
            style={[styles.listitem, {backgroundColor}, editId === item.id && { backgroundColor: '#fff' }]}
            onLongPress={() => setEditId(item.id)}
            onPress={() => editId==='' && dispatch(setStatus({day:selected, id:item.id}))}
            activeOpacity={0.6}>
            {editId ===item.id 
                ? <View style={styles.inputcontainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEditText}
                    value={editText}
                    autoFocus={true}
                />
                <Ionicons 
                    onPress={handleEditTodo}
                    name= 'checkmark-outline'
                    size={33} 
                    style={{marginRight:0, marginLeft:'auto'}}/>
                <Ionicons 
                    onPress={handleEditCancel}
                    name= 'close-outline'
                    size={33} 
                    style={{marginRight:0, marginLeft:'auto'}}/>
                </View>
                : <Text style={{textDecorationLine}}>{item.text}</Text>
            }
            {editId !==item.id 
                && <Ionicons 
                onPress={() => dispatch(removeTodo({day: selected, id:item.id}))}
                name="close-circle-outline" 
                size={20} 
                style={{marginRight:0, marginLeft:'auto', textDecorationLine: 'none', paddingLeft: 10}}/>
            }
        </TouchableOpacity>
    );

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
                <View style={styles.inputcontainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setText(text)}
                        placeholder='Add New Fun Thing To Do'
                        value={text}
                    />
                    <Ionicons 
                        onPress={handeAddTodo}
                        name= 'checkmark-outline'
                        size={33} 
                        style={{marginRight:0}}/>
                    <Ionicons 
                        onPress={() => setAddActive(!addActive)}
                        name= 'close-outline'
                        size={33} 
                        style={{marginRight:0}}/>
                </View>
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
    return (
        <View style={styles.screen}>
            <Spacer  />
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
                styles={{alignSelf: 'center'}}
                    ListHeaderComponent={<></>}
                    data={toDos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListFooterComponent={<Add />}
                />

            </View> 

        </View>
    )
    
}