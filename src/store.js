import { configureStore } from "@reduxjs/toolkit";

import datesReducer from './features/datesSlice'
import todosReducer from './features/todosSlice'

export default configureStore({
    reducer: {
        dates: datesReducer, 
        todos: todosReducer
    }
})