import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import { useForm } from "react-hook-form"
import { useData } from "../store/zustand"

const AddDialog = ({ open, setOpen }) => {
  let {postUser}=useData(state=>state)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm()

  console.log(watch('fullname'));
  

  function addUser(data) {
    console.log(data);
    postUser(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogTitle>
        Add User
      </DialogTitle>


      <form onSubmit={handleSubmit(addUser)}>
        <DialogContent>

          <TextField placeholder="name"  type="text" {...register('fullname', { required: true })} />
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

export default AddDialog