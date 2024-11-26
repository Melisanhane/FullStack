import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import '../style.css'

// props = show: true/false
const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("")

  // Pollataan (päivitetään) palvelin 2 sek välein jotta uudet lisäykset näkyvät
  /*
    const result = useQuery(ALL_BOOKS,  {
    pollInterval: 200
  })
    */
  let result = useQuery(ALL_BOOKS, {
    variables: {genre: selectedGenre},
  })

  console.log(result.data.allBooks)
  if (result.loading)  {
    return <div>loading...</div>
  }
  console.log(result.data.allBooks)

  const allGenres = result.data.allBooks.flatMap(book => book.genres);
  const genres = [ ...new Set(allGenres)];
  
  return (
    <div className="content">
      <h2>Books</h2>
        in genre <strong>{selectedGenre || "All"}</strong>
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
/*
<select className="inputField" value={author} onChange={({ target }) => setAuthor(target.value)}>
            {result.data.allAuthors.map((a) =>
              <option value={a.name}>{a.name}</option>
            )}
          </select>

                  <button onClick={() => setSelectedGenre("")}>All</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)} >
            {genre}
          </button>
        ))}
*/
export default Books
