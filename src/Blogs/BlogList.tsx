import { useDispatch } from "react-redux"
import { useAppSelector } from "../hooks"
import { deletePost, hidePost } from "../PostSlice"
import { FaEyeSlash, FaRegTrashAlt } from "react-icons/fa";

export const BlogList = () =>{
    const posts = useAppSelector((state) => state.posts.posts);
    const dispatch = useDispatch()

    const handleDeletePost = (id: number) =>{
        dispatch(deletePost(id))
    }

    const handleHidePost = (id: number )=>{
        dispatch(hidePost(id))
    }

    return (
        <>
        <div className="w-full items-center">
            {posts.map((post)=> (
                <div className='flex-1 w-full h-full border-1 my-2 gap-4 p-2 items-center justify-between rounded-xl' hidden={post.hidden}>
                    <div className="font-bold text-3xl my-1">
                        <h1 key={post.id}>
                            {post.subject}
                        </h1>
                    </div>
                    <div className="my-3">
                        <p>
                            {post.body}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <button onClick={()=>handleHidePost(post.id)} className="flex flex-row items-center gap-2 border-1 border-zinc-500 px-2 py-1 rounded-lg hover:opacity-85 hover:cursor-pointer hover:scale-105 transition-300"><FaEyeSlash />Hide</button>
                        <button onClick={()=>handleDeletePost(post.id)} className="flex flex-row items-center gap-2 border-1 border-zinc-500 bg-red-500 text-white px-2 py-1 rounded-lg hover:opacity-85 hover:cursor-pointer hover:scale-105 transition-300"><FaRegTrashAlt />Delete</button>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}