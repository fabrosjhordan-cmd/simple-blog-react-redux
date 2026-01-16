import { useState } from 'react'
import NavBar from '../components/NavBar'
import { BlogList } from './BlogList'
import Create from './Create'
import Home from './Home'
import { useAuth } from '../provider/AuthProvider'

function Blogs() {
  const [page, setPage] = useState<'home' | 'blogs' | 'create'>('blogs')
  const {session} = useAuth();
  return (
    <div>
      <div>
        <NavBar target={page} setTarget={setPage} />
      </div>
      {page === 'blogs' &&
        <div className='flex items-center justify-center px-24 '>
          <BlogList />
        </div>
      }
      {page === 'create' &&
        <div className='flex items-start justify-start px-24 w-full'>
          <Create />
        </div>
      }
      {page === 'home' &&
      <div className='flex items-center justify-center px-24 '>
          <Home session={session}/>
      </div>
      }
    </div>
  )
}

export default Blogs
