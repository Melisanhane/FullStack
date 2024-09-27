import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../services/request'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () =>{
      dispatch({
        type:'SHOW',
        payload:`the content of the anecdote must be at least 5 characters long`
      });
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: (100000 * Math.random()).toFixed(0), votes: 0 })
    await dispatch({
      type: 'SHOW',
      payload: `new anecdote created`
    });
    setTimeout(()=>{
      dispatch({type: 'HIDE'})
    },5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
