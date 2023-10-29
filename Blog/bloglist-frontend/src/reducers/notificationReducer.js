import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { setNotification, clearNotification } = notificationSlicer.actions

export const notificationSetter = (title, author) => {
    return dispatch => {
        if(title && author) {
            dispatch(setNotification(`a new blog ${title} created by ${author}`))
        } else if(title) {
            dispatch(setNotification(title))
        } else {
            dispatch(setNotification(`Invalid username or password`))
        }
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

export default notificationSlicer.reducer