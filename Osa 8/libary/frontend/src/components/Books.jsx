import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

// props = show: true/false
const Books = (props) => {
  if (!props.show) {
    return null
  }

  // Pollataan (päivitetään) palvelin 2 sek välein jotta uudet lisäykset näkyvät
  /*
    const result = useQuery(ALL_BOOKS,  {
    pollInterval: 200
  })
    */
  const result = useQuery(ALL_BOOKS)

  if (result.loading)  {
    return <div>loading...</div>
  }

//  const books = []

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
