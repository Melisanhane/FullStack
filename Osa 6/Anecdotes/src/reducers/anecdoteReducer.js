import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
       return state.map(anecdote => 
         anecdote.id !== action.payload.id 
           ? anecdote
           : action.payload
       )
    },
    addAnecdote(state, action) {
        state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, getAllAnecdotes, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateVote = (anecdote) => {
return async (dispatch, getState) => {
      const anecdoteToChange = getState().anecdotes.find(a => a.id === anecdote.id)
      const changedAncedote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAncedote)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer
