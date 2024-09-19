import { createStore, combineReducers } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { filterChange }  from '../reducers/filterReducer'

const filterAnecdotes = () => {
   const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
    debugger
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter )
  }

  return (
    <div>
      filter <input onChange={handleChange}></input>
      <br/><br/>
    </div>
  )
}

export default filterAnecdotes