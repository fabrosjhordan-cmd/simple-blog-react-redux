import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../hooks'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { FaAngleLeft, FaRegTrashAlt } from "react-icons/fa";
import { BsExclamationTriangle } from 'react-icons/bs';
import { deletePost, updatePost } from '../PostSlice';
import { CiEdit } from 'react-icons/ci';

dayjs.extend(relativeTime);

type postIdProps ={
    targetPost: number
    setTarget: React.Dispatch<React.SetStateAction<"blogs" | "home" | "create" | "details" | "detailsUser">>
}
export default function BlogDetailsByUser({targetPost, setTarget}: postIdProps) {
const [updating, setUpdating] = useState(false)
const [openDelete, setOpenDelete] = useState(false);
const dispatch = useAppDispatch()
const posts = useAppSelector((state) => state.posts.userPost)
const postData = posts?.find(p=> p.id === targetPost)
const [subject, setSubject] = useState<any>(postData?.subject);
const [body, setBody] = useState<any>(postData?.body);
const [loading, setLoading] = useState(false)


const validateDelete =(id: any)=>{
  dispatch(deletePost(id))
  alert('Item Deleted')
  setTarget('blogs')
}

const updateContent = async (event: any) =>{
    event?.preventDefault();
    setLoading(true)
    if(subject?.trim() === ''){
      alert('The subject cannot be empty')
      return null
    }
    if(body?.trim() === ''){
      alert('The content cannot be empty')
      return null
    }
    else{
      dispatch(updatePost({subject, body, id: targetPost}))
      alert('Post published')
      setSubject('')
      setSubject('')
      setBody('')
      setLoading(false)
    }
  }

return (
<div  className='w-full'>
{updating === false && 
  <div>
  <div>
    <div className='flex justify-between items-center'>
      <div className='self-center' onClick={()=>setTarget('blogs')}>
        <p className='flex items-center text-xl px-[-20] mb-4 hover:underline hover:text-blue-500 hover:cursor-pointer'><FaAngleLeft className='hover:underline'/>Back</p>
      </div>
    <div className='flex flex-row gap-6'> 
      <CiEdit className='text-xl hover:cursor-pointer hover:text-blue-700' onClick={()=>setUpdating(true)}/>
      <FaRegTrashAlt className='text-xl hover:cursor-pointer hover:text-blue-700' onClick={()=>setOpenDelete(true)}/>
    </div>
    </div>
  </div>
  
  <div className='ml-2 mb-12'>
      <h1 className='text-[38px] font-semibold'>{postData?.subject}</h1>
      <div className='ml-1'>
      <p className='text-sm text-gray-700'>{dayjs(postData?.created_at).format('MMM. DD, YYYY || hh:mm A')}</p>
      <h2 className="text-xs text-gray-700"> {dayjs(postData?.created_at).fromNow()} </h2>
      </div>
      <p className='text-lg my-4'>{postData?.body}</p>
  </div>
  {/* Create a buttons for cancel or update */}
    <p className='text-sm text-gray-700 ml-2'>Posted by: {postData?.official_poster}</p>

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
                    onClick={() => validateDelete(postData?.id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                    >
                    Delete
                    </button>
                </div>
                </DialogPanel>
            </div>
            </div>
    </Dialog>
</div>
}

{updating === true &&
<div>
  <form onSubmit={updateContent} className="w-full"> 
      <h1 className="text-xl font-bold my-2">Subject</h1>
      <input type="text" onChange={(e)=> setSubject(e.target.value)} value={subject} className="w-[25%] h-[50%] my-2 p-2 border-1 rounded-md overflow-x-auto" placeholder="Context" required/>
      <h3 className="text-md font-semibold mt-4">Content</h3>
      <div className="flex justify-start text-left w-full">
      <textarea onChange={(e)=>setBody(e.target.value)} value={body} className="w-full h-[300px] my-2 p-4 border-1 rounded-md text-left overflow-auto resize-none" placeholder="What's on your mind?" required/>
      </div>
      <div className='flex gap-2'>
        <button className="border-1 py-2 px-12 rounded-md bg-black text-white hover:cursor-pointer hover:opacity-80">{loading ? 'Updating...' : 'Update'}</button>
        <button className="border-1 py-2 px-12 rounded-md bg-white hover:cursor-pointer hover:opacity-80" onClick={()=>setUpdating(false)}>Cancel</button>
      </div>
    </form>
</div>
}
</div>
  )
}
