import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import '../style.css'

const Recommendations = () => {
    const result = useQuery(ALL_BOOKS)
    const user = useQuery(ME)

    if (result.loading || user.loading) {
        return <div>loading...</div>
    }
    
    const userFavouriteGenre = user.data.me.favoriteGenre

    const recommendedBooks = result.data.allBooks.filter(books => 
        books.genres.includes(userFavouriteGenre))

    return (
        <div className="content">
            <h2>Recommendations</h2>
            <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {recommendedBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
    )
}

export default Recommendations