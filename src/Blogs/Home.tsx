import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchData } from '../PostSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ImSpinner2 } from 'react-icons/im';

dayjs.extend(relativeTime);

type PostIdProps = {
    setPostId: React.Dispatch<React.SetStateAction<number>>
    setTarget: React.Dispatch<React.SetStateAction<"blogs" | "home" | "create" | "details" | "detailsUser">>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setActive: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
    active: number
}

export default function Home({ setPostId, setTarget, setCurrentPage, currentPage, active, setActive}:PostIdProps) {
const posts = useAppSelector((state) => state.posts.allPost);
const isLoading = useAppSelector((state)=> state.posts.loading)
const dispatch = useAppDispatch();
const [loading, setLoading] = useState(true);
const [itemsPerPage, setitemsPerPage] = useState(5);

const numberedPages: any[]  = []

const lastItemIndex = currentPage * itemsPerPage
const firstItemIndex = lastItemIndex - itemsPerPage
const totalPage = Math.ceil(posts.length / itemsPerPage)
const thisPageItems = posts.slice(firstItemIndex, lastItemIndex)

for (let i : number = 1 ; i <= totalPage; ++i){
        numberedPages.push(i)
    }

    useEffect(() => {
        dispatch(fetchData())
        setitemsPerPage(5)
        setLoading(false)
    }, [])

    useEffect(()=>{
        if(currentPage<1){
            setCurrentPage(1)
        }
        setCurrentPage(currentPage)
    }, [currentPage])

  const pagingPrev = () =>{
    setLoading(true)
    setCurrentPage(currentPage-1)
    setActive(active-1)
    setLoading(false)
  }

   const pagingNext = () =>{
    setLoading(true)
    setCurrentPage(currentPage+1)
    setActive(active+1)
    setLoading(false)
  }

  if(isLoading){
    return <div className='flex w-full h-[60vh] items-center justify-center'><ImSpinner2 className='animate-spin text-5xl text-blue-600' /></div>
  }
  

  return (
    <div className="w-full">
    {thisPageItems.map((post)=> (
        <div key={post.id} onClick={()=> {setPostId(post.id), setTarget('details')}}>
            <div className='flex-1 w-full h-full border-1 my-2 gap-4 p-2 items-center justify-between rounded-xl hover:scale-101 hover:cursor-pointer ease-in ease-out duration-300' hidden={post.hidden}>
                <div className="flex flex-row gap-2 justify-between my-1">
                    <h1 className="text-3xl font-bold">
                        {post.subject}
                    </h1>
                    <div className="flex flex-col">
                        <h2 className="text-xs text-gray-700">{dayjs(post.created_at).format('MMM. DD, YYYY - hh:mm A')}</h2>
                        <h2 className="text-xs text-right text-gray-700"> {dayjs(post.created_at).fromNow()} </h2>
                    </div>
                </div>
                <div className='mt-6 text-xs font-semibold'>
                    Posted by: {post.official_poster}
                </div>
            </div>
        </div>
            )
            )
    }
    <div className='flex gap-2 items-center justify-center'>
    <button onClick={pagingPrev} className={`border-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-400 opacity-50' : 'hover:bg-gray-300 hover:cursor-pointer'}`} disabled={currentPage === 1 || loading ? true : false}>Previous</button>
    {numberedPages.map((pages, index)=>{
        return(
            <button key={index} onClick={()=>{setCurrentPage(pages), setActive(index)}} className={`border-1 px-3 py-1 rounded-sm hover:bg-blue-200 hover:cursor-pointer ${active === index ? 'bg-gray-700 text-white border-black' : ''}`}>{pages}</button>
        ) 
        })
        }
    <button onClick={pagingNext} className={`border-1 px-3 py-1 rounded-md ${currentPage === totalPage ? "bg-gray-400 opacity-50" : "hover:bg-gray-300 hover:cursor-pointer"}`} disabled={currentPage === totalPage || loading ? true : false }>Next</button>
    </div>
    </div>
  )
}

