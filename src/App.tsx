import './App.css'
import Blogs from './Blogs/Blogs';
import Auth from './components/Auth'
import { useAuth } from './provider/AuthProvider'

function App() {
  const {session, loading} =useAuth();

  return (
    <div>
    { loading ? 
      <div className='flex items-center justify-center mt-12'>Loading...</div> 
      :
      session ? 
      <Blogs /> : <Auth />
    }
    </div>
  )
}

export default App
