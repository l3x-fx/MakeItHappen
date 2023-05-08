import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {View, TextInput } from 'react-native'
import {screenStyles} from '../screens/screenStyles'
import { getDate } from '../features/datesSlice';
import { addTodoAsync, editTodoAsync } from '../features/todosSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'



export const SubmitText = ({ resetAdd, resetEdit, initialValue, isEdit, editId}) => {
    const styles = screenStyles()
    const dispatch = useDispatch()
    const selected = useSelector(getDate)
    const [text, setText] = useState('')
    const [editText, setEditText] = useState(initialValue)
    console.log(selected + '....this is your day')
    
    const handleEditSubmit = () => {
        dispatch(editTodoAsync({day: selected, id:editId, text: editText}))
        resetEdit()
        setEditText('')
    }
    const handleCancel = () => {
        resetEdit()
        resetAdd()
        setEditText('')
        setText('')
    }
    
    const handleAddTodo = () => {
        text !=='' && dispatch(addTodoAsync({day: selected, text:text}))
        resetAdd()
        setText('')
    }

    useEffect(()=> {
        if(isEdit) {
            resetAdd()
        } else {
            resetEdit()
        }
    },[])

    return (<View style={styles.inputcontainer}>
        <TextInput
            style={styles.input}
            onChangeText={isEdit ? setEditText : setText}
            placeholder= {isEdit ? '' : ' Add New Fun Thing To Do'}
            initialValue={isEdit ? initialValue : ''}
            value={isEdit ? editText : text}
            onSubmitEditing={isEdit ? handleEditSubmit : handleAddTodo }
            autoFocus={true}
        />  
            <Ionicons 
                onPress={isEdit ? handleEditSubmit : handleAddTodo}
                name= 'checkmark-outline'
                size={33} 
                style={{marginRight:0}}/>
            <Ionicons 
                onPress={handleCancel}
                name= 'close-outline'
                size={33} 
                style={{marginRight:0}}/>
    </View>)
}