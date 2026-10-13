import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { dataAtom, deleteUserAtom } from '../store/jotai'
import AddDialog from './AddDialog'
import { useData } from '../store/zustand'
import CircularProgress from '@mui/material/CircularProgress';

const Catalog = () => {
    let {data,loading,get,error}=useData((state=>state))

    useEffect(()=>{
        get()
    },[])

    let [open,setOpen]=useState(false)
    return (
        <>
        <button onClick={()=>setOpen(true)}>add user</button>
            <div className='p-20'>
                {loading ? <CircularProgress/> : data.map((el) => {
                    return <div>
                        <img className='w-12' src={el.avatar} alt="" />
                        <h1>{el.fullname}</h1>
                        <p>{el.age}</p>
                        <p>{el.status ? 'Active':"Inactive"}</p>
                    </div>

                })}
            </div>

            <AddDialog open={open} setOpen={setOpen}/>
        </>
    )
}

export default Catalog