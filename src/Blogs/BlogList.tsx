import { useAppDispatch, useAppSelector } from "../hooks"
import {  FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { deletePost, fetchData } from "../PostSlice";
import { useEffect, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export const BlogList = () =>{
    const posts = useAppSelector((state) => state.posts.items);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    const handleDeletePost = (id: number) =>{
        setOpen(true)
    }

    const validateDelete = (id: number)=>{
        dispatch(deletePost(id))
        setOpen(false)
    }

return (
    <>
    <div className="w-full items-center">
    {posts.map((post)=> (
        <div key={post.id}>
            <div className='flex-1 w-full h-full border-1 my-2 gap-4 p-2 items-center justify-between rounded-xl' hidden={post.hidden}>
                    <div className="font-bold text-3xl my-1">
                        <h1>
                            {post.subject}
                        </h1>
                    </div>
                    <div className="my-3">
                        <p>
                            {post.body}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <button onClick={()=>handleDeletePost(post.id)} className="flex flex-row items-center gap-2 border-1 border-zinc-200 bg-red-500 text-white px-2 py-1 rounded-lg hover:opacity-85 hover:cursor-pointer hover:scale-105 transition-300"><FaRegTrashAlt />Delete</button>
                    </div>
            </div>
           <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                        <BsExclamationTriangle aria-hidden="true" className="size-6 text-red-400" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                        Delete Item
                        </DialogTitle>
                        <div className="mt-2">
                        <p className="text-sm text-gray-400">
                            Are you sure you want to delete the selected item? After confirmation the data will be permanently removed.
                            This action cannot be undone.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                    type="button"
                    onClick={() => validateDelete(post.id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                    >
                    Delete
                    </button>
                    <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                    >
                    Cancel
                    </button>
                </div>
                </DialogPanel>
            </div>
            </div>
        </Dialog>
        </div>
        ))}
    </div>
    </>
)
}