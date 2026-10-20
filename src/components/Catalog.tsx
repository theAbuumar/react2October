import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import AddDialog from './AddDialog'
import CircularProgress from '@mui/material/CircularProgress';
import { deleteAtom, getDataAtom, loadingAtom } from '../store/jotai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../store/counterSlice';
import EditDialog from './EditDialog';

const Catalog = () => {
    let [editUs, setEditUs] = useState(null)
    let [open, setOpen] = useState(false)
    let [openEdit, setOpenEdit] = useState(false)
    let [search, setSearch] = useState('')
    let [select, setSelect] = useState('all')
    let [page, setPage] = useState(1)
    let [limit, setLimit] = useState(5)



    let { data, loading, error } = useSelector(state => state.data)
    let dispatch = useDispatch()

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(getUsers({ search: search, select: select, page: page, limit: limit }))
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [search, select, page, limit])

    function showUserInfo(user: any) {
        setEditUs(user)
        setOpenEdit(true)
    }


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Пользователи</h1>
                    <p className="text-sm text-gray-500 mt-1">Управление профилями и учетными записями</p>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Добавить пользователя
                </button>

                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search user...' />

                <select onChange={(e) => setSelect(e.target.value)}>
                    <option value="all">All User</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                <div>
                    <button onClick={() => page > 1 ? setPage(prev => prev - 1) : page}>prev</button>
                    <button onClick={() => setPage(prev => prev + 1)}>next</button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <CircularProgress size={36} />
                    <span className="text-sm text-gray-500 font-medium">Загрузка данных...</span>
                </div>
            ) : data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((el: any) => {
                        return (
                            <div
                                key={el.id}
                                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center hover:-translate-y-1 group"
                            >
                                <div className="relative mb-3">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100 shadow-sm bg-gray-50"
                                        src={el.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                                        alt={el.fullname || "User avatar"}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                                        }}
                                    />
                                    <span
                                        className={`absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${el.status ? 'bg-emerald-500' : 'bg-gray-400'
                                            }`}
                                        title={el.status ? 'Active' : 'Inactive'}
                                    />
                                </div>

                                <h2 className="text-base font-semibold text-gray-800 line-clamp-1 w-full" title={el.fullname}>
                                    {el.fullname || "Без имени"}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {el.age ? `${el.age} лет` : 'Возраст не указан'}
                                </p>

                                <div className="mt-2.5">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${el.status
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'bg-gray-50 text-gray-600 border border-gray-200'
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${el.status ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                                        {el.status ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="mt-5 w-full flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => showUserInfo(el)}
                                        className="cursor-pointer flex-1 py-1.5 px-3 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors active:scale-95"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteUser(el.id))}
                                        className="cursor-pointer flex-1 py-1.5 px-3 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors active:scale-95"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">Пользователи не найдены</p>
                </div>
            )}

            <AddDialog open={open} setOpen={setOpen} />
            <EditDialog user={editUs} openEdit={openEdit} setOpenEdit={setOpenEdit} />
        </div>
    )
}

export default Catalog