import { atom } from "jotai";



export let dataAtom = atom([
    {
        name: 'ali',
        age: 12,
        id: 13
    },
    {
        name: 'vali',
        age: 105,
        id: -2
    }
])


export let deleteUserAtom = atom(null,(get, set, id) => {
    set(dataAtom, get(dataAtom).filter(el => el.id != id))
})


export let addUserAtom= atom(null, (get,set,user)=>{
    set(dataAtom, [...get(dataAtom),user])
})