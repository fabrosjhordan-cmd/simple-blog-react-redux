import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { supabase } from "./supabaseClient"
import type { Tables } from "./types"

type PostProps = {
    items: Tables<'blogs'>[]
    allPost: Tables<'blogs'>[]
    userPost: Tables<'blogs'>[]
    loading: boolean
    error: string | null
}

const initialState: PostProps = {items: [], allPost: [], userPost: [], loading: false, error: null}


export const fetchData = createAsyncThunk(
    'posts/addFetch',
    async (_, thunkAPI)=>{
        try {
            const { data, error } = await supabase.from('blogs').select('*').order('created_at', {ascending: false})
            if(error) throw error
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }

)


export const fetchByUserData = createAsyncThunk(
    'posts/userFetch',
    async (id: number, thunkAPI)=>{
        try {
            const { data, error } = await supabase.from('blogs').select('*').eq('user_id', id).order('created_at', {ascending: false})
            if(error) throw error
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({subject, body, userId, official_poster}: {subject: string | null | undefined, body: string, userId: string | undefined, official_poster: string | undefined}, thunkAPI) =>{
        try{
            const {data, error } = await supabase.from('blogs').insert({subject, body, user_id: userId, official_poster}).select()
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

export const updatePost = createAsyncThunk(
    'post/updatepost',
    async({subject, body, id} : {subject: string | null | undefined, body: string, id: number | undefined}, thunkAPI) =>{
        try{
            const { data, error } = await supabase.from('blogs').update({subject, body}).eq('id', id).select().single()
            if(error) throw error
            return data
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
            state.userPost = action.payload
        })
        .addCase(fetchData.fulfilled, (state, action) =>{
            state.loading = false
            state.allPost = action.payload
        })
        .addCase(fetchDataPage.fulfilled, (state, action) =>{
            state.loading = false
            state.allPost = action.payload
        })
        .addCase(addPost.fulfilled, (state, action) =>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(updatePost.fulfilled, (state, action)=> {
            state.loading = false
            state.items = action.payload
        })
        .addCase(deletePost.fulfilled, (state, action )=>{
            state.loading = false
            state.userPost = state.userPost.filter(
                post => post.id !== action.payload
            )
        })
    }
})

export default postSlice.reducer




// export const fetchDataPage = createAsyncThunk(
//     'posts/addFetchPage',
//     async (page: number, thunkAPI)=>{
//         try {
//             const allData = fetchData();
//             const getFromAndTo = ()=>{
//                     const ITEM_PER_PAGE = 4
//                     let from = page * ITEM_PER_PAGE
//                     let to = from + ITEM_PER_PAGE
//                     if(page > 0){
//                         from += 1
//                     }
//                     return { from, to}
//                 }
//             const {from, to} = getFromAndTo()
//             const { data, error } = await supabase.from('blogs').select().range(from, to).order('created_at', {ascending: false})
//             if(error) throw error
//             return data
            
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )