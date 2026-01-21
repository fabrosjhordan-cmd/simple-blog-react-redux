import { useAppDispatch, useAppSelector } from "../hooks"
import {  FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { deletePost, fetchByUserData, updatePost } from "../PostSlice";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useAuth } from "../provider/AuthProvider";

dayjs.extend(relativeTime);

type BlogsByUserProps = {
    currentPageUser: number
    activeByUser: number
    setTarget: React.Dispatch<React.SetStateAction<"home" | "blogs" | "create" | "details" | "detailsUser">>
    setCurrentPageUser: React.Dispatch<React.SetStateAction<number>>
    setActiveByUser: React.Dispatch<React.SetStateAction<number>>
    setPostId: React.Dispatch<React.SetStateAction<number>>
}

export const BlogList = ({currentPageUser, setCurrentPageUser, activeByUser, setActiveByUser, setTarget, setPostId} : BlogsByUserProps) =>{
    const posts = useAppSelector((state) => state.posts.userPost);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [subject, setSubject] = useState<string>('')
    const [itemId, setItemId] = useState(1);
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [postNumber, setPostNumber] = useState<number>(1)
    const dispatch = useAppDispatch()
    const {session} = useAuth()
    const userSession = session?.user.id
    const [itemsPerPage, setitemsPerPage] = useState(5);

    const numberedPages: any[]  = []

    const lastItemIndex = currentPageUser * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const totalPage = Math.ceil(posts.length / itemsPerPage)
    const thisPageItems = posts.slice(firstItemIndex, lastItemIndex)

    for (let i : number = 1 ; i <= totalPage; ++i){
            numberedPages.push(i)
        }

    useEffect(() => {
        dispatch(fetchByUserData(userSession))
        setitemsPerPage(5)
    }, [])


    const handleEdit = async (event: any) =>{
        event.preventDefault();
        setLoading(true);
        if(subject?.trim() === '')
        if(body?.trim() === ''){
            alert('The content cannot be empty')
            return null
        }else{
            dispatch(updatePost({subject, body, id: postNumber}))
            setOpenUpdate(false)
            alert('Post updated')
        }
        setLoading(false)
    }

    const validateDelete = (id: number)=>{
        dispatch(deletePost(id))
        setOpenDelete(false)
    }

    const showOpenUpdate = (id: number) =>{
        const  postId  = posts?.find(p=> p.id === id) 
        console.log(postId)
        setOpenUpdate(true)
        setSubject(postId?.subject ?? "")
        setBody(postId?.body ?? "")
    }

    const pagingPrev = () =>{
    setLoading(true)
    setCurrentPageUser(currentPageUser-1)
    setActiveByUser(activeByUser-1)
    setLoading(false)
  }

   const pagingNext = () =>{
    setLoading(true)
    setCurrentPageUser(currentPageUser+1)
    setActiveByUser(activeByUser+1)
    setLoading(false)
  }

  if(numberedPages.length === 0){
    return (
    <div className="flex flex-col gap-5 items-center justify-center h-[80vh] overflow-hidden">
        <p className="text-4xl text-gray-500">
            No entries found
        </p>
        <p className="text-md text-gray-500">
            Create your first post.
        </p>
        <button onClick={()=>setTarget('create')}className="border-1 px-4 py-1 rounded-sm hover:cursor-pointer hover:bg-zinc-300">
            Create
        </button>
    </div>
    
    )
}
    
return (
    <>
    <div className="w-full">
    {thisPageItems.map((post)=> (
    <div key={post.id} onClick={()=>setPostId(post.id)}>
        <div className='flex-1 w-full h-full border-1 my-1 p-2 items-center justify-between rounded-xl hover:scale-101 hover:cursor-pointer ease-in ease-out duration-300' hidden={post.hidden}>
        <div onClick={()=>{setTarget('detailsUser')}}>
            <div className="flex flex-row gap-2 justify-between my-1">
                <h1 className="text-3xl font-bold">
                    {post.subject}
                </h1>
                <div className="flex flex-col">
                    <h2 className="text-xs text-gray-700">{dayjs(post.created_at).format('MMM. DD, YYYY - hh:mm A')}</h2>
                    <h2 className="text-xs text-right text-gray-700"> {dayjs(post.created_at).fromNow()} </h2>
                </div>
                
            </div>
            <div className="my-1 h-6 overflow-hidden opacity-65 ">
                <p>
                    {post.body}
                </p>
            </div>
        </div>
        <div className="flex flex-row gap-2 mt-1">
            <button onClick={()=>{showOpenUpdate(post.id), setPostNumber(post.id)}} className="flex flex-row items-center gap-2 border-1 border-zinc-200 bg-black text-white px-2 py-1 rounded-lg hover:opacity-85 hover:cursor-pointer hover:scale-101 duration-100"><CiEdit />Edit</button>
            <button onClick={()=>{setOpenDelete(true), setItemId(post.id)}} className="flex flex-row items-center gap-2 border-1 border-zinc-200 bg-red-500 text-white px-2 py-1 rounded-lg hover:opacity-85 hover:cursor-pointer hover:scale-101 duration-100"><FaRegTrashAlt />Delete</button>
        </div>
        </div>

    {/* Delete Item */}
    <Dialog open={openDelete} onClose={setOpenDelete} className="relative z-10">
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
            <div className="flex gap-4 bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                type="button"
                data-autofocus
                onClick={() => setOpenDelete(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                Cancel
                </button>
                <button
                type="button"
                onClick={() => validateDelete(itemId)}
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                >
                Delete
                </button>
            </div>
            </DialogPanel>
        </div>
        </div>
    </Dialog>

    {/* Update Item */}
    <Dialog open={openUpdate} onClose={setOpenUpdate} className="relative z-10">
        <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-700/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
            <form onSubmit={handleEdit}>          
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-500/30 sm:mx-0 sm:size-10">
                    <CiEdit aria-hidden="true" className="size-6" />
                </div>
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-2xl font-semibold">
                    Update Post
                    </DialogTitle>
                    <div className="mt-3">
                    
                    <h1 className="font-bold">Subject</h1>
                    <input type="text" onChange={(e)=> setSubject(e.target.value)} value={subject} className="w-[300px] h-[50%] my-2 p-2 border-1 border-black rounded-md" placeholder="Context"/>
                    <h3 className="text-md font-semibold mt-4">Content</h3>
                    <div className="flex justify-start text-left w-full">
                    <textarea onChange={(e)=>setBody(e.target.value)} value={body} className="w-full h-[300px] my-2 p-4 border-1 border-black rounded-md text-left resize-none" placeholder="What's on your mind?" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </form>
            <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                <button
                type="button"
                data-autofocus
                onClick={() => setOpenUpdate(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md border-1 border-black px-3 py-2 text-sm font-semibold inset-ring inset-ring-white/5 hover:bg-gray-400 hover:cursor-pointer sm:mt-0 sm:w-auto"
                >
                Cancel
                </button>
                <button 
                type="button"
                onClick={handleEdit}
                className="inline-flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-400 hover:cursor-pointer sm:ml-3 sm:w-auto" disabled={loading ? true : false}
                >
                {loading ? 'Updating...': 'Update'}
                </button>
            </div>
            </DialogPanel>
        </div>
        </div>
    </Dialog>
    </div>
    ))}

    {/* Pagination */}
    <div className='flex gap-2 items-center justify-center'>
    <button onClick={pagingPrev} className={`border-1 px-3 py-1 rounded-md ${currentPageUser === 1 ? 'bg-gray-400 opacity-50' : 'hover:bg-gray-300 hover:cursor-pointer'}`} disabled={currentPageUser === 1 || loading === true ? true : false}>Previous</button>
    {numberedPages.map((pages, index)=>{
        return(
            <button key={index} onClick={()=>{setCurrentPageUser(pages), setActiveByUser(index)}} className={`border-1 px-3 py-1 rounded-sm hover:bg-blue-200 hover:cursor-pointer ${activeByUser === index ? 'bg-gray-700 text-white border-black' : ''}`}>{pages}</button>
        ) 
        })
        }
    <button onClick={pagingNext} className={`border-1 px-3 py-1 rounded-md ${currentPageUser === totalPage ? "bg-gray-400 opacity-50" : "hover:bg-gray-300 hover:cursor-pointer"}`} disabled={currentPageUser === totalPage || loading === true ? true : false }>Next</button>
    </div>
    </div>
   
    </>
)
}