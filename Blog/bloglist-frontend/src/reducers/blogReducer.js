import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = []
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        newBlog(state, action) {
            state.push(action.payload)
        },
        like(state,action) {
            const id = action.payload
            const blogToLike = state.find(n => n.id === id)
            const changedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            console.log(changedBlog)
            return state.map(blog => 
                blog.id !== id ? blog : changedBlog
            )
        },
        deleteBlogReducer(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { newBlog, like, setBlogs, deleteBlogReducer } = blogSlice.actions

export const createBlog = (content) => {
    return async dispatch => {
        const blog = await blogService.create(content)
        dispatch(newBlog(blog))
    }
} 

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
} 

export const likeBlog = (id, author, title, likes, url) => {
    return async dispatch => {
        const object = { author: author, title: title, url: url, likes: likes + 1 }
        const blogToUpdate = await blogService.update(id, object)
        dispatch(like(id))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const blogToDelete = await blogService.deleteRecord(id)
        dispatch(deleteBlogReducer(id))
    }
}

export default blogSlice.reducer