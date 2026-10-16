import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import AddDialog from './AddDialog'
import CircularProgress from '@mui/material/CircularProgress';
import { deleteAtom, getDataAtom, loadingAtom } from '../store/jotai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../store/counterSlice';

const Catalog = () => {
   let dispatch=useDispatch()
   let {data,loading,error}=useSelector(state=>state.data)

   useEffect(()=>{
        dispatch(getUsers())
   },[])


    let [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)}>add user</button>
            <div className='p-20'>
                {loading ? <CircularProgress /> : data?.map((el) => {
                    return <div>
                        <img className='w-12' src={el.avatar} alt="" />
                        <h1>{el.fullname}</h1>
                        <p>{el.age}</p>
                        <p>{el.status ? 'Active' : "Inactive"}</p>
                        <button onClick={()=>dispatch(deleteUser(el.id))}>Delete</button>
                    </div>

                })}
            </div>

            <AddDialog open={open} setOpen={setOpen} />
        </>
    )
}

export default Catalog