import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

// props = show: true/false
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const result = useQuery(ALL_AUTHORS)
  const [author, setAuthor] = useState('')
  const [bornTo, setBornTo] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    console.log('click')
    event.preventDefault()
    console.log(author)

    editAuthor({ variables: { author, bornTo:parseInt(bornTo) } })

    setBornTo('')
  }

// const authors = []

  return (
    <div>
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
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            {result.data.allAuthors.map((a) =>
              <option value={a.name}>{a.name}</option>
            )}
          </select>
          <br/>
          born:<input value={bornTo} onChange={({ target }) => setBornTo(target.value)}/>
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
