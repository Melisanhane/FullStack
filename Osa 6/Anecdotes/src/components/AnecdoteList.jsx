import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { addNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const orderByvotes = (a, b) => b.votes - a.votes
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === '') {
          return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      })
    const voteAnecdote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(updateVote(anecdote))
        dispatch(addNotification(`You voted for ${anecdote.id}`, 5))
    }
    
    return (
        <div>
        {[...anecdotes].sort(orderByvotes).map(anecdote =>
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList