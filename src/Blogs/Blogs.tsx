import NavBar from '../components/NavBar'
import { BlogList } from './BlogList'

function Blogs() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='flex items-center justify-center px-24 '>
      <BlogList />
      </div>
    </div>
  )
}

export default Blogs
