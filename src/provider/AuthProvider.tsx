import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { supabase } from "../supabaseClient";
import type{ Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | undefined
    profile: any
    loading: boolean
}

const AuthContext = createContext<AuthData>({
    session: undefined,
    profile: null,
    loading: true
})

export default function AuthProvider({children}:PropsWithChildren){
    const [session, setSession] = useState(undefined);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hydrated, setHydrated] = useState(false);

useEffect(() => {
  const hydrate = async()=>{
    const { data } = await supabase.auth.getSession();
    setSession(data.session)
    setHydrated(true)
    setLoading(false)
  }

  hydrate()

  const {data: listener} = supabase.auth.onAuthStateChange(
    async (_event, newSession) =>{
        setSession(newSession)

        if(hydrated && newSession?.user){
            setLoading(true)

            const { data: ProfileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession?.user.id)
            .single()
            
                    setProfile(profile || null)
                    setLoading(false)
        }else{
            setProfile(null)
            setLoading(false)
        }
        }
  )
  return ()=> listener.subscription.unsubscribe();

}, [])

return(
    <AuthContext.Provider value={{session, profile, loading}}>
        {children}
    </AuthContext.Provider>
)

}

export const useAuth = () => useContext(AuthContext)


