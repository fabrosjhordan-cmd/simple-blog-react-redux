import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { lorem } from "./data/dummydata"

type Posts= {
    id: number,
    user: string,
    subject: string,
    body: string,
    hidden: boolean
}

type PostsState = {
    posts: Posts[]
}

const initialState: PostsState = {
    posts: [
        {id: 1, user: 'Jhordan',subject: 'New', body: lorem.subject, hidden: false}, {id: 2, user: 'Not Dan', subject: 'Newer', body: 'Newer Dummy data 2', hidden: false}
    ]
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<string>) =>{
            const newId = state.posts.length ? state.posts[state.posts.length -1 ].id + 1 : 1;
            const newPost = {id: newId, user: action.payload, subject: action.payload, body: action.payload, hidden: false}
            state.posts.push(newPost)
        },

        updatePost: (state, action: PayloadAction<string>) =>{
            
        },

        deletePost: (state, action: PayloadAction<number>) =>{
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
        hidePost: (state, action: PayloadAction<number>) =>{
            const hidePost = state.posts.find(
                (post)=> post.id === action.payload
            )
            if(hidePost){
                hidePost.hidden = !hidePost.hidden
            }
        }   
    }
})

export const {addPost, updatePost, deletePost, hidePost} = postSlice.actions
export default postSlice.reducer
