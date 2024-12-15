import { useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import Notification from './Notification'
import '../style.css'

// Funktio joka huolehtii välimuistista
export const updateCache = (cache, query, addedBook) => {
// Avustaja joka estää saman kirjan lisäyksen kahdesti
  const uniqByName = (a) => {
    let seen = new Set()    
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) 
      ? false 
      : seen.add(k)    
    }) 
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),    
    } 
  })
}

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("")
  const [message, setMessage] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`Book ${addedBook.title} by ${addedBook.author.name} added to the server.`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  let genreResult = useQuery(ALL_BOOKS, {
    variables: {genre: selectedGenre}
  })

  let allResult = useQuery(ALL_BOOKS, {
    refetchQueries: [  {query: ALL_BOOKS} ],    
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  if (genreResult.loading || allResult.loading)  {
    return <div>loading...</div>
  }

  console.log(allResult.data.allBooks)

  const allGenres = allResult.data.allBooks.flatMap(book => book.genres);
  const genres = [ ...new Set(allGenres)];

  const notify = (message) => {
    console.log(message)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const ShowResult = (genre) => {
    if (!genre.genre) {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {allResult.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    else {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {genreResult.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  return (
    <div className="content">
      <h2>Books</h2>
      <Notification message={message} />
      in genre <strong>{selectedGenre || "All"}</strong>
      <ShowResult genre={selectedGenre} />
      <div>
        <button onClick={() => setSelectedGenre("")}>All</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)} >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books