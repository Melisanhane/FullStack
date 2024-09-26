import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log('add notification for 5 sec')
            return action.payload
        },
        clearNotification() {
            console.log('clear notification')
            return null
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const addNotification = (text, time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
        dispatch(setNotification(text))
    }
}