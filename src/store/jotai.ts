import axios from "axios";
import { api } from "../utils/api";
import { atom } from "jotai";

import { atomWithRefresh, unwrap } from "jotai/utils"

export let loadingAtom = atom(false)

export let getDataAtom = atomWithRefresh(async() => {
    try {
        let { data } = await axios.get(api)
        return data

    } catch (error) {
        console.log(error);
    }
})

export let dataLoadableAtom = unwrap(getDataAtom, (prev) => prev || [])


export let deleteAtom=atom(null,async(get,set,id)=>{
    try {
        await axios.delete(`${api}/${id}`)
        set(getDataAtom)
    } catch (error) {
        console.log(error);
    }
})