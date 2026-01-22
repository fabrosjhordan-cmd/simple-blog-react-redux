import { ImSpinner2 } from 'react-icons/im';
import './App.css'
import Blogs from './Blogs/Blogs';
import Auth from './components/Auth'
import { useAuth } from './provider/AuthProvider'

function App() {
  const {session, loading} =useAuth();

  return (
    <div>
    { loading ? 
      <div className='flex w-full h-[60vh] items-center justify-center'><ImSpinner2 className='animate-spin text-5xl text-blue-600' /></div>
      :
      session ? 
      <Blogs /> : <Auth />
    }
    </div>
  )
}

export default App
