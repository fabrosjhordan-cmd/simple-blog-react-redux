import { useState } from "react"
import { useAppDispatch } from "../hooks"
import { addPost } from "../PostSlice"
import { useAuth } from "../provider/AuthProvider"

type CreateProps = {
  setTarget: React.Dispatch<React.SetStateAction<"blogs" | "home" | "create" | "details" | "detailsUser">>
}

function Create({setTarget}: CreateProps) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const {session} = useAuth();

  const dispatch = useAppDispatch();

  const postContent = async (event: any) =>{
    event?.preventDefault();
    setLoading(true)
    if(subject.trim() === ''){
      alert('The subject cannot be empty')
      return null
    }
    if(body.trim() === ''){
      alert('The content cannot be empty')
      return null
    }
    else{
      dispatch(addPost({subject, body, userId: session?.user.id, official_poster: session?.user?.email}))
      alert('Post published')
      setTarget('blogs')
      setSubject('')
      setSubject('')
      setBody('')
      setLoading(false)
    }
  }

  return (
    <div className="w-full items-center">
      <form onSubmit={postContent} className="w-full"> 
      <h1 className="text-xl font-bold my-2">Subject</h1>
      <input type="text" onChange={(e)=> setSubject(e.target.value)} value={subject} className="w-[25%] h-[50%] my-2 p-2 border-1 rounded-md overflow-x-auto" placeholder="Context" required/>
      <h3 className="text-md font-semibold mt-4">Content</h3>
      <div className="flex justify-start text-left w-full">
      <textarea onChange={(e)=>setBody(e.target.value)} value={body} className="w-full h-[300px] my-2 p-4 border-1 rounded-md resize-none" placeholder="What's on your mind?" required/>
      </div>
      <button className="border-1 py-2 px-12 rounded-md bg-black text-white hover:cursor-pointer hover:opacity-80">{loading ? 'Posting' : 'Post'}</button>
      </form>
    </div>
  )
}

export default Create