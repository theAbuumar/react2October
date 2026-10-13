import axios from "axios";
import { create } from "zustand";
import { api } from "../utils/api";


export const useData= create((set,get)=>({
    data:[],
    loading: false,
    error:[],
    get: async()=>{
        set((state)=>({loading: true}))

        try {
            let {data}=await axios.get(api)
            set((s)=>({data: data, loading:false}))

        } catch (error) {
            set((s)=>({error: error}))
            
        }
    },

    postUser: async(newUser)=>{
        try {
            await axios.post(api,newUser)
            get().get()
            

        } catch (error) {
            set((s)=>({error: error}))
        }
    }
}))