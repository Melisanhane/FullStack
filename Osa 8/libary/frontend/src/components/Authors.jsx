import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import '../style.css'

// props = show: true/false
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ],    
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        setError(messages)
      }
    /*
  // TÄMÄ EI TOIMI ?????
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addAuthor)
        }
      })    
    }
      */
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
// const authors = []

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
        <form onSubmit={submit}>
          author:
          <br />
          <select className="inputField" value={author} onChange={({ target }) => setAuthor(target.value)}>
            {result.data.allAuthors.map((a) =>
              <option value={a.name}>{a.name}</option>
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

  /*
          name:<input value={author} onChange={({ target }) => setAuthor(target.value)}/>
          <br/>


  const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
    */
}


export default Authors
