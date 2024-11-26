import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from '../queries'
import '../style.css'

const NewBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

// Palauttaa kyselyfunktion taulukon ensimmäisenä alkiona
// Päivitetäään välimuisti jotta saadaan lisätyt kirjat heti näkyviin
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
  // Määritellään kyselylle muuttujat
    createBook({ variables: { title, author, published:parseInt(published), genres } })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="content">
      <form onSubmit={submit}>
        <div className="inputField">
          title:
          <br />
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div className="inputField">
          author:
          <br />
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div className="inputField">
          published:
          <br />
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div className="inputField">
          genre:
          <br />
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div> 
          genres: 
          <br /> 
          {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook