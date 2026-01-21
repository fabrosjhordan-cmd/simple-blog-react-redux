import { useState } from 'react'
import NavBar from '../components/NavBar'
import { BlogList } from './BlogList'
import Create from './Create'
import Home from './Home'
import BlogDetails from './BlogDetails'
import BlogDetailsByUser from './BlogsDetailsByUser'

function Blogs() {
  const [page, setPage] = useState<'home' | 'blogs' | 'create' | 'details' | 'detailsUser'>('home')
  const [postId , setPostId] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageUser, setCurrentPageUser] = useState(1)
  const [active, setActive] = useState(0)
  const [activeByUser, setActiveByUser] = useState(0)

  return (
    <div className='mb-4'>
      <div>
        <NavBar target={page} setTarget={setPage} />
      </div>
      {page === 'blogs' &&
        <div className='flex items-center justify-center px-24 '>
          <BlogList setPostId={setPostId} currentPageUser={currentPageUser} setCurrentPageUser={setCurrentPageUser} activeByUser={activeByUser} setActiveByUser={setActiveByUser} setTarget={setPage}/>
        </div>
      }
      {page === 'create' &&
        <div className='flex items-start justify-start px-24 w-full'>
          <Create setTarget={setPage} />
        </div>
      }
      {page === 'home' &&
      <div className='flex items-center justify-center px-24 '>
          <Home  setPostId={setPostId} setTarget={setPage} setCurrentPage={setCurrentPage} currentPage={currentPage} active={active} setActive={setActive}/>
      </div>
      }
      {page === 'details' &&
      <div className='flex items-start justify-start py-12 px-24 w-full'>
        <BlogDetails targetPost={postId} setTarget={setPage} />
      </div>
      }
      {page === 'detailsUser' &&
      <div className='flex items-start justify-start py-12 px-24 w-full'>
        <BlogDetailsByUser targetPost={postId} setTarget={setPage} />
      </div>
      }
    </div>
  )
}

export default Blogs
