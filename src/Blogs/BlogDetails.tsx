import { useAppSelector } from '../hooks'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaAngleLeft } from "react-icons/fa";

dayjs.extend(relativeTime);

type postIdProps ={
    targetPost: number
    setTarget: React.Dispatch<React.SetStateAction<"blogs" | "home" | "create" | "details" | "detailsUser">>
}
export default function BlogDetails({targetPost, setTarget}: postIdProps) {
const posts = useAppSelector((state) => state.posts.allPost)
const postData = posts?.find(p=> p.id === targetPost)

const goBack = () =>{
  setTarget('home')
}

return (
<div>
    <div onClick={goBack}>
    <p className='flex items-center text-xl px-[-20] mb-4 hover:underline hover:text-blue-500 hover:cursor-pointer'><FaAngleLeft className='hover:underline'/>Back</p>
    </div>
      <div className='ml-2 mb-12'>
        <h1 className='text-[38px] font-semibold'>{postData?.subject}</h1>
        <div className='ml-1'>
        <p className='text-sm text-gray-700'>{dayjs(postData?.created_at).format('MMM. DD, YYYY || hh:mm A')}</p>
        <h2 className="text-xs text-gray-700"> {dayjs(postData?.created_at).fromNow()} </h2>
        </div>
        <p className='text-lg my-4'>{postData?.body}</p>
      </div>
    <p className='text-sm text-gray-700 ml-2'>Posted by: {postData?.official_poster}</p>
</div>
  )
}
