import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Notification from './Notification'
import '../style.css'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ],    
      onError: () => {
        const message = "value must be number"
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(author)
    editAuthor({ variables: { author, born:parseInt(born) } })
    setBorn('')
  }

  console.log(result.data.allAuthors)

  return (
    <div className="content">
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => 
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <Notification errorMessage={errorMessage} />
        <form onSubmit={submit}>
          author:
          <br />
          <select className="inputField" value={author} onChange={({ target }) => setAuthor(target.value)}>
            {result.data.allAuthors.map((a) =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
          <br />
          born:
          <br />
          <input className="inputField" value={born} onChange={({ target }) => setBorn(target.value)}/>
          <br />
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors