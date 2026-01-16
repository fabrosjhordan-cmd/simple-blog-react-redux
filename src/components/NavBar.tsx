import { useState } from "react";
import { RiNewspaperLine } from "react-icons/ri";
import { supabase } from "../supabaseClient";

type PageProps = {
  target: string
  setTarget: ()=>{}
}

function NavBar({target, setTarget}: PageProps) {
  // const [ target, setTarget ] = useState('blogs');

  const handleSignOut = async () =>{
    const { error } = await supabase.auth.signOut()
    if(error){
      alert(error.cause || error.message);
    }else{
      alert('Signed Out Successfully');
    }
  }

  return (
    <div className='w-full h-[6ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between'>
      <div className="flex gap-2 items-center hover:cursor-pointer">
      <RiNewspaperLine />
      <h1 className="text-lg font-bold">Simple Blog</h1>
      </div>
      <div className="flex gap-4">
        <button onClick={()=>{setTarget('home')}} className={target === 'home' ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : `hover:cursor-pointer`}>Home</button>
      <button onClick={()=>{setTarget('blogs')}} className={target === 'blogs' ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : `hover:cursor-pointer`}>Blogs</button>
      <button onClick={()=>{setTarget('create')}} className={target === 'create' ? `border-1 p-2 bg-zinc-500 text-white rounded-md hover:cursor-pointer` : 'hover:cursor-pointer'}>Create</button>
      </div>  
      <button onClick={handleSignOut} className="hover:cursor-pointer hover:text-blue-600">Logout</button>
    </div>
  )
}

export default NavBar
