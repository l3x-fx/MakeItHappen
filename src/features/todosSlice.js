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
        const parsedResponse = JSON.parse(response)
        return parsedResponse
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async ({ day, text }, { getState }) => {
        let { todos } = getState()
        let newId = generateID(day, todos.value[day])
        let newTodoValue = {}

        let workingTodos = todos.value.hasOwnProperty(day) 
            ? {
                ... todos, 
                value: {
                    ...todos.value, 
                    [day]: [...todos.value[day], {id:newId, text, done:false}]
            }}
            :{
                ...todos, 
                value: {
                    ...todos.value, 
                    [day]: [{id:newId, text, done:false}]
                }
            }
        try{
            await AsyncStorage.setItem('todos', JSON.stringify(workingTodos))                
                .then(async () => {
                    const response = await AsyncStorage.getItem('todos')
                    newTodoValue = JSON.parse(response)
                })
        } catch(e) {
            console.log(e)
        }
        return newTodoValue.value
    })

export const editTodoAsync = createAsyncThunk(
    'todos/editTodoAsync',
    async( {day, id, text} , {getState})=> {
        const {todos} = getState()
        let editedTodos = {}

        let workingTodos = {
                ... todos, 
                value: {
                    ...todos.value, 
                    [day]: todos.value[day].map(todo => {
                        if (todo.id === id) {return {...todo, text:text}}
                        return todo
                    })
            }}

        try{
            await AsyncStorage.setItem('todos', JSON.stringify(workingTodos))                
                .then(async () => {
                    const response = await AsyncStorage.getItem('todos')
                    editedTodos = JSON.parse(response)
                })
        } catch(e) {
            console.log(e)
        }
        return editedTodos.value
    })
    

export const removeTodoAsync = createAsyncThunk(
    'todos/removeTodoAsync',
    async({ day, id }, {getState})=> {
        let { todos } = getState()
        let removedTodo = {}

        console.log(JSON.stringify(todos))
        
        let workingTodos = {
            ... todos, 
            value: {
                [day]: todos.value[day].filter (todo => todo.id !== id)
            }
        }

        try{
            await AsyncStorage.setItem('todos', JSON.stringify(workingTodos))                
                .then(async () => {
                    const response = await AsyncStorage.getItem('todos')
                    console.log('NEW WORKING TODOS: ' + response)
                    removedTodo = JSON.parse(response)
                })
        } catch(e) {
            console.log(e)
        }
        return removedTodo.value
    })

export const setStatusAsync = createAsyncThunk(
    'todos/setStatusAsync',
    async({ day, id }, {getState})=> {
        const {todos} = getState()
        let changedTodos = {}
        let workingTodos = {
                ... todos, 
                value: {
                    ...todos.value, 
                    [day]: todos.value[day].map(todo => {
                        if (todo.id === id) {
                            return {...todo, done:!todo.done}
                        }
                        return todo
                    })
            }}
        console.log(JSON.stringify(workingTodos))
        try{
            await AsyncStorage.setItem('todos', JSON.stringify(workingTodos))                
                .then(async () => {
                    const response = await AsyncStorage.getItem('todos')
                    changedTodos = JSON.parse(response)
                })
        } catch(e) {
            console.log(e)
        }
        return changedTodos.value
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
                if(action.payload !== null) {state.value = action.payload.value;}
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(setStatusAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            })
    }
});

export const getTodos = day => store => {
    return day in store.todos.value ? store.todos.value[day] : []
}

    


export default todosSlice.reducer;


//https://react-native-async-storage.github.io/async-storage/docs/usage
