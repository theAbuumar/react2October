import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../components/types";
import axios from "axios";
import { api } from "../utils/api";



let initialState: InitialState = {
    data: [],
    loading: false,
    error: []
}

export let getUsers = createAsyncThunk('data/getUsers', async (params) => {
    console.log(params);

    try {
        let { data } = await axios.get(api, {
            params: {
                fullname: params?.search || undefined,
                status: params.select == 'all' ? undefined : params.select,
                page: params.page,
                limit: params.limit
            }
        })
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
})

export let deleteUser = createAsyncThunk('data/deleteUser', async (id, { dispatch }) => {
    try {
        await axios.delete(`${api}/${id}`)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);
    }
})
export let addUser = createAsyncThunk('data/addUser', async (user, { dispatch }) => {
    try {
        await axios.post(api, user)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);

    }
})
export let editUser = createAsyncThunk('data/editUser', async (user, { dispatch }) => {
    try {
        await axios.put(`${api}/${user.id}`, user)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);

    }
})


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
            })
            .addCase(getUsers.rejected, (state, { payload }) => {
                state.loading = false
                state.error = [...state.error, payload]
            })

    }

})

export const { } = dataSlice.actions


export default dataSlice.reducer