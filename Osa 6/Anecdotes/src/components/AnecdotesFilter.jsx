import { useDispatch } from 'react-redux'
import { filterChange }  from '../reducers/filterReducer'

const filterAnecdotes = () => {
   const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const find = event.target.value
    dispatch(filterChange(find))
  }

  return (
    <div>
      filter <input onChange={handleChange}></input>
      <br/><br/>
    </div>
  )
}

export default filterAnecdotes