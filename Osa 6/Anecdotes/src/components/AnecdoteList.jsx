import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    // Palautetaan ainoastaan storen tilasta anecdotes
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
    }

    return (
        <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList