/*
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'
*/

/*  TÄTÄ TARVITAAN 6.9 MUTTA TARVITAANKO TÄÄLLÄ??  
import { createStore, combineReducers } from 'redux'
import addAnecdote from './reducers/anecdoteReducer'
import filterAnecdotes from './components/AnecdotesFilter'
*/
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

const App = () => {

/*  TÄTÄ TARVITAAN 6.9 MUTTA TARVIIKO TÄÄÄLLÄ??
  const reducer = combineReducers({  
    anecdotes: addAnecdote,  
    filter: filterAnecdotes
  })
*/

  // TÄLLE TYYLITTELY
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesFilter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}
/*  

*/

export default App