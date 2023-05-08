import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateID } from "../utils/generateID";

const initialState = {
    value: {
        '2023-05-05': [
            {
                id: '2023-04-28-1',
                text: 'Eat cake',
                done: false
            },
            {
                id: '2023-04-28-2',
                text: 'Pet a cat',
                done: false
            }
        ]
    },
    status:'idle'
}

export const getAllTodosAsync = createAsyncThunk(
    'todos/getAllTodosAsync',
    async() => {
        const response = await AsyncStorage.getItem('todos')
        //console.log('getAllTodosAsync' + response)
        const parsedResponse = JSON.parse(response)
        return parsedResponse
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async({ day, text})=> {
        let newTodoValue = {}
        try{
            await AsyncStorage.getItem('todos')
                .then(async response => {
                    const workingTodos = response ? JSON.parse(response) : {};
                    let newId = generateID(day)
                    if (workingTodos.hasOwnProperty(day)){
                        let idExists = workingTodos[day].some(todo => todo.id === newId);
                        while(idExists){
                            newId = generateID(day);
                            idExists = workingTodos[day].some(todo => todo.id === newId);
                        }
                    } 
                    else {
                        workingTodos[day] = [];
                    }
                    workingTodos[day].push({id:newId, text, done:false})
                    await AsyncStorage.setItem('todos', JSON.stringify(workingTodos));
                })
                .then(async () => {
                    const response = await AsyncStorage.getItem('todos')
                    console.log('NEW WORKING TODOS - DAY: ' + response)
                    newTodoValue = JSON.parse(response)
                })
        } catch(e) {
            console.log(e)
        }
        return newTodoValue
    })



export const editTodoAsync = createAsyncThunk(
    'todos/editTodoAsync',
    async( {day, id, text} , {getState})=> {
        const {todos} = getState()

        todos[day].find(todo => todo.id === id).text = text

        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    })

export const removeTodoAsync = createAsyncThunk(
    'todos/removeTodoAsync',
    async({ day, id }, {getState})=> {
        const {todos} = getState()
        console.log(JSON.stringify(todos))
        todos[day] = todos[day].filter(todo => todo.id !== id)

        if (todos[day].length === 0){
            delete todos[day];
        }

        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    })

export const setStatusAsync = createAsyncThunk(
    'todos/setStatusAsync',
    async({ day, id }, {getState})=> {
        const {todos} = getState()
        console.log('setstatus day: ' + day)
        console.log('setstatus id: ' + id)

        const thisTodo = todos[day].find(todo => todo.id === id)
        thisTodo.done = !thisTodo.done

        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    })

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setAllTodos: (state, action) => {
            state.todos = action.payload
            console.log('setAllTodosResult: ' + JSON.stringify(state.todos))
        },
        addTodo: (state, action) => {
            const { day, text } = action.payload
            let newId = ''

            if (!(state.hasOwnProperty(day))){
                newId = generateID(day)
                state[day] = [{id:newId, text, done:false}]
            } else {
                do {
                    newId = generateID(day)
                } while(state[day].includes(obj => obj.id !== newId))
                state[day].push({id: newId, text: text, done:false})
            }
        },
        editTodo:(state,action) => {
            const { day, id, text } = action.payload
            const newText = state[day].find(todo => todo.id === id)
            newText.text = text
        },
        removeTodo:(state,action) => {
            const { day, id } = action.payload
            const removed = state[day].filter(todo => todo.id !== id)
            state[day] = removed
            //add to remove property if array.length === 0
        },
        setStatus:(state,action) => {
            const { day, id } = action.payload
            const thisTodo = state[day].find(todo => todo.id === id)
            if (thisTodo){
                thisTodo.done = !thisTodo.done
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodosAsync.fulfilled, (state,action) => {
                //console.log('PAYLOAD' + JSON.stringify(action.payload))
                //console.log('STATE' + JSON.stringify(state))
                state.value = action.payload;
                //console.log('NEW STATE' + JSON.stringify(state.value) )
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                state = action.payload;
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state = action.payload;
            })
            .addCase(setStatusAsync.fulfilled, (state, action) => {
                state = action.payload;
            })
    }
});

export const getTodos = day => store => store.todos.value === null ? [] : store.todos.value[day]

export default todosSlice.reducer;


//https://react-native-async-storage.github.io/async-storage/docs/usage
