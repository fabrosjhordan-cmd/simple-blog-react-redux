import './App.css'
import Blogs from './Blogs/Blogs';
import Auth from './components/Auth'
import { useAuth } from './provider/AuthProvider'

function App() {
  const {session} =useAuth();
  return (
    <div>
      {session ? <Blogs /> :  <Auth />}
    </div>
  )
}

export default App
