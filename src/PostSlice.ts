import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { supabase } from "./supabaseClient"
import type { Tables } from "./types"
import { useAuth } from "./provider/AuthProvider"


type PostProps = {
    items: Tables<'blogs'>[]
    loading: boolean
    error: string | null
}

const initialState: PostProps = {items: [], loading: false, error: null}
export const fetchData = createAsyncThunk(
    'posts/addFetch',
    async (_, thunkAPI)=>{
        try {
            const { data, error } = await supabase.from('blogs').select()
            if(error) throw error
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchByUserData = createAsyncThunk(
    'posts/userFetch',
    async (_, thunkAPI)=>{
        try {
            const { session } = useAuth()
            const { data, error } = await supabase.from('blogs').select().eq('id', session?.user.id).order('created_at', {ascending: false})
            if(error) throw error
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({subject, body, userId}: {subject: string, body: string, userId: string | undefined}, thunkAPI) =>{
        try{
           
            const {data, error} = await supabase.from('blogs').insert({subject, body, user_id: userId}).select()
            if(error) throw error
            
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }

    }
)

export const deletePost = createAsyncThunk(
    'post/deletepost',
    async(id: number, thunkAPI) =>{
        try{
            const { error} = await supabase.from('blogs').delete().eq('id', id)
            if(error) throw error
            return id
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }

    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builders) =>{
        builders
        .addCase(fetchData.pending, state =>{
            state.loading = true
        })
        .addCase(fetchByUserData.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(fetchData.fulfilled, (state, action) =>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(addPost.fulfilled, (state, action) =>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(deletePost.fulfilled, (state, action )=>{
            state.loading = false
            state.items = state.items.filter(
                post => post.id !== action.payload
            )
        })
    }
})

export default postSlice.reducer
