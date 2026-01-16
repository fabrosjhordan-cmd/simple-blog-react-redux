import { useState } from 'react'
import NavBar from '../components/NavBar'
import { BlogList } from './BlogList'
import Create from './Create'

function Blogs() {
  const [page, setPage] = useState<'blogs' | 'create'>('blogs')
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
        <div className='flex items-center justify-center px-24'>
          <Create />
        </div>
      }
    </div>
  )
}

export default Blogs
