import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { editUser } from '../store/counterSlice'

const EditDialog = ({ user, openEdit, setOpenEdit }) => {

    let dispatch = useDispatch()
    
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: { fullname: user?.fullname, age: user?.age, avatar: user?.avatar, status: user?.status }
    })

    useEffect(()=>{
        if(user){
            reset(user)
        }
    },[user])

    function formSubmit(user){
        console.log(user);
        dispatch(editUser(user))
        setOpenEdit(false)
        

    }

    return (
        <Dialog open={openEdit} onClose={() => setOpenEdit(!openEdit)}>
            <DialogTitle>
                Edit User
            </DialogTitle>
            <form onSubmit={handleSubmit(formSubmit)} key={user?.id}>
                <DialogContent>
                    <TextField placeholder="name" type="text" {...register('fullname', { required: true })} />
                    {errors.fullname && <p className="text-red-600">Name is required</p>}
                    <TextField placeholder="age" type="text" {...register('age')} />
                    <TextField placeholder="image" type="text" {...register('avatar')} />
                    <select {...register('status')}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </DialogContent>
                <DialogActions>
                    <button type="submit">Add</button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditDialog