import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDate: '',
    today: ''
}

export const datesSlice = createSlice({
    name: 'dates',
    initialState, 
    reducers: {
        setDate: (state, action) => {
            state.selectedDate = action.payload
        }, 
        setToday: (state, action) => {
            state.today = action.payload
        }
    }
});

export const { setDate, setToday } = datesSlice.actions;

export const getDate = (state) => state.dates.selectedDate;
export const getToday = (state) => state.dates.today;

export default datesSlice.reducer; 