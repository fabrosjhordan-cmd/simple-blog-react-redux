import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchData } from '../PostSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Home({session}: any) {
const posts = useAppSelector((state) => state.posts.allPost);
const dispatch = useAppDispatch();
useEffect(() => {
        dispatch(fetchData())
    }, [])

  return (
    <div className="w-full">
    {posts.map((post)=> (
        <div key={post.id}>
            <div className='flex-1 w-full h-full border-1 my-2 gap-4 p-2 items-center justify-between rounded-xl' hidden={post.hidden}>
                <div className="flex flex-row gap-2 justify-between my-1">
                    <h1 className="text-3xl font-bold">
                        {post.subject}
                    </h1>
                    <div className="flex flex-col">
                        <h2 className="text-xs text-gray-700">{dayjs(post.created_at).format('MMM. DD, YYYY - hh:mm A')}</h2>
                        <h2 className="text-xs text-right text-gray-700"> {dayjs(post.created_at).fromNow()} </h2>
                    </div>
                </div>
                <div className="my-3">
                    <p>
                        {post.body}
                    </p>
                </div>
                <div className='mt-6 text-xs font-semibold'>
                    Posted by: {post.official_poster}
                </div>
            </div>
        </div>
            )
            )
    }

    </div>
  )
}

