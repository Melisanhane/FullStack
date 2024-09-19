import { useSelector, useDispatch } from 'react-redux'
import  { addAnecdote }  from '../reducers/anecdoteReducer'

const newAnecdote = () => {
  const anecdotes = useSelector(state => state) 
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(addAnecdote(content))
  }
  return (
    <div>
    <form onSubmit={createAnecdote}>
      <input name='newAnecdote'/>
      <button type='submit'>create</button>
    </form>
    </div>
  ) 
}

export default newAnecdote