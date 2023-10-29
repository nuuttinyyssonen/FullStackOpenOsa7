import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})

const { setUser, removeUser } = userSlice.actions

export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await blogService.login(credentials)
        const token = blogService.setToken(user.token)
        const userObject = {...user, ...token}
        dispatch(setUser(userObject))
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(removeUser())
    }
}

export default userSlice.reducer