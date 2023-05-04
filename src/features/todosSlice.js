import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "../utils/generateID";

const initialState = {
    '2023-05-03': [
        {
        id: '2023-04-28-1',
        text: 'Eat cake',
        done: false
        },
        {
        id: '2023-04-28-2',
        text: 'Pet a cat',
        done: false
        },
    ]
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState, 
    reducers: {
        addTodo: (state, action) => {
            const { day, text } = action.payload
            let newId = ''

            if (!(state.hasOwnProperty(day))){
                newId = generateID(day)
                state[day] = [{id:newId, text, done:false}]
            } else {
                do {
                    newId = generateID(day)
                    console.log(newId)
                } while(state[day].includes(obj => obj.id !== newId))
                state[day].push({id: newId, text: text, done:false})
            }

            
        }, 
        editTodo:(state,action) => {
            const { day, id, text } = action.payload
            console.log(text)
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
    }
});

export const { addTodo, editTodo, removeTodo, setStatus } = todosSlice.actions;

export const getTodosByDay = day => store => store.todos[day];

export default todosSlice.reducer; 

//https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
//D:\1-CODE\redux-practice_2\redux-essentials-example-app\src\features\posts
