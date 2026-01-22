import { RiNewspaperLine } from "react-icons/ri";
import { supabase } from "../supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";

type PageProps = {
  target: string
  setTarget: React.Dispatch<React.SetStateAction<"blogs" | "home" | "create" | "details" | "detailsUser">>
}

function NavBar({target, setTarget}: PageProps) {
  const [loading, setLoading] = useState(false)
  const handleSignOut = async () =>{
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if(error){
      alert(error.cause || error.message);
      setLoading(false)
    }else{
      setLoading(false)
    }
  }

  if(loading){
    return <div className='flex w-full h-[70vh] items-center justify-center'><ImSpinner2 className='animate-spin text-5xl text-blue-600' /></div>
  }

  return (
    <div className='w-full h-[6ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between'>
      <div onClick={()=>{setTarget('home')}} className="flex gap-2 items-center hover:cursor-pointer">
      <RiNewspaperLine />
      <h1 className="text-lg font-bold">Simple Blog</h1>
      </div>
      <div className="flex gap-4">
      <button onClick={()=>{setTarget('home')}} className={target === 'home' || target === 'details' ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : `hover:cursor-pointer`}>Home</button>
      <button onClick={()=>{setTarget('blogs')}} className={target === 'blogs' || target === 'detailsUser'  ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : `hover:cursor-pointer`}>Blogs</button>
      <button onClick={()=>{setTarget('create')}} className={target === 'create' ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : 'hover:cursor-pointer'}>Create</button>
      </div>  
      <button onClick={handleSignOut} className="hover:cursor-pointer hover:text-blue-600">Logout</button>
    </div>
  )
}

export default NavBar
