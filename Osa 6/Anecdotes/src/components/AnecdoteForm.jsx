import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from "../reducers/notificationReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.NewAnecdote.value
    console.log(`create anecdote: ${content}`)
    event.target.NewAnecdote.value = ''
    dispatch(createNewAnecdote(content))
    dispatch(addNotification(`You add the anecdote: ${content}`, 5))
  }
  
  return (
    <div>
    <form onSubmit={createAnecdote}>
      <input name='NewAnecdote'/>
      <button type='submit'>create</button>
    </form>
    </div>
  ) 
}

export default NewAnecdote