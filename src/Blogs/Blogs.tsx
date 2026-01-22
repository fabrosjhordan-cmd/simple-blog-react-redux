import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { BlogList } from './BlogList'
import Create from './Create'
import Home from './Home'
import BlogDetails from './BlogDetails'
import BlogDetailsByUser from './BlogsDetailsByUser'
import { ImSpinner2 } from 'react-icons/im'

type pageProps = 'home' | 'blogs' | 'create' | 'details' | 'detailsUser'

function Blogs() {
  const [page, setPage] = useState<pageProps>(()=>{
    const storedPage = sessionStorage.getItem('activePage')
    return storedPage === 'home' || storedPage === 'blogs' || storedPage === 'create' || storedPage === 'details' || storedPage === 'detailsUser' ? storedPage : 'home'
  })
  const [postId , setPostId] = useState<number>(()=>{
    return Number(sessionStorage.getItem('postId')) || 1
  })
  const [currentPage, setCurrentPage] = useState(()=>{
    return Number(sessionStorage.getItem('currentPage')) || 1
  })
  const [currentPageUser, setCurrentPageUser] = useState(()=>{
    return Number(sessionStorage.getItem('currentPageUser')) || 1
  })
  const [active, setActive] = useState(()=>{
    return Number(sessionStorage.getItem('activePageNumber')) || 0
  })
  const [activeByUser, setActiveByUser] = useState<number>(()=>{
    return Number(sessionStorage.getItem('activePageNumberUser')) || 0
  })
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      sessionStorage.setItem('activePage', page)
      sessionStorage.setItem('postId', String(postId))
      sessionStorage.setItem('currentPage', String(currentPage))
      sessionStorage.setItem('currentPageUser', String(currentPageUser))
      sessionStorage.setItem('activePageNumber', String(active))
      sessionStorage.setItem('activePageNumberUser', String(activeByUser))
  }, [page, postId, currentPage, currentPageUser, active, activeByUser])

  if(loading){
    return <div className='flex w-full h-[60vh] items-center justify-center'><ImSpinner2 className='animate-spin text-5xl text-blue-600' /></div>
  }

  return (
    <div className='mb-4'>
      <div>
        <NavBar target={page} setTarget={setPage} setLoading={setLoading}/>
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
