import { createSlice } from "@reduxjs/toolkit";

interface User {
    name: string,
    age: number,
    id: number
}

interface InitialState {
    data: User[]
}

let initialState: InitialState = {
    data: [
        {
            name: 'ali',
            age: 12,
            id: 1
        },
        {
            name: 'tolib',
            age: 42,
            id: 2
        },
    ]
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        deleteUser: (state, { payload }) => {
            state.data = state.data.filter(el => el.id != payload)
        },

        addUser: (state,{payload})=>{
            state.data = [...state.data, payload]

        }

    }

})

export const { deleteUser, addUser } = dataSlice.actions


export default dataSlice.reducer