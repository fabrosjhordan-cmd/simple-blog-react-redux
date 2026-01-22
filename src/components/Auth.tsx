import { useState } from 'react'
import { supabase } from '../supabaseClient';
import { ImSpinner2 } from 'react-icons/im';

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState('Sign in');

    const handleLogin = async (event: any) =>{
        event?.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if(error){
            alert(error.cause || error.message);
            setLoading(false)
        }
        else{
            setLoading(false)
        }
    }

    const handleSignUp = async (event: any ) =>{
        event?.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if(error){
            alert(error.cause || error.message);
            setLoading(false)
        }
        else{
            setLoading(false)
        }
        
    }

    if(loading){
        return <div className='flex w-full h-[70vh] items-center justify-center'><ImSpinner2 className='animate-spin text-5xl text-blue-600' /></div>
    }

    return (
    <div className='flex w-full h-screen items-center justify-center p-2 self-center'>
        <div className='flex flex-col gap-2 items-center justify-center w-[45%] p-2 border-1 border-yellow-700 rounded-md bg-'>
            <h1 className='text-3xl font-bold'>Simple Blog with React Redux and Supabase</h1>
            <p className='text-xl'>{active === 'Sign in' ? 'Sign in with Email and Password' : 'Sign up with Email and Password' }</p>
            <form className='' onSubmit={active === 'Sign in' ? handleLogin : handleSignUp}>
                <div className='flex flex-col'>
                    <input 
                        className='border-1 border-zinc-500 rounded-sm my-1'
                        type='email'
                        placeholder='Email'
                        value={email}
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input 
                        className='border-1 border-zinc-500 rounded-sm my-1'
                        type='password'
                        placeholder='Password'
                        value={password}
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div className='flex gap-2'>
                    {active === 'Sign in' ? <button className='border-1 w-full rounded-sm p-1 my-1 hover:cursor-pointer hover:bg-gray-200'>
                        {loading ? 'Signing in..' : 'Sign in'}
                    </button> : <button className='border-1 w-full rounded-sm p-1 my-1 hover:cursor-pointer hover:bg-gray-200'>
                        {loading ? 'Signing up..' : 'Sign up'}
                    </button>}
                </div>
            </form>
            <button onClick={()=>{active === 'Sign in' ? setActive('Sign up') : setActive('Sign in')}} className='text-blue-700 hover:text-blue-900 font-bold text-lg hover:cursor-pointer'>{active === 'Sign in' ? 'Sign up' : 'Sign in'}</button>
        </div>
    </div>
  )
}

export default Auth
