import { gql } from '@apollo/client'

export const query = gql `
  query {
    allAuthors  {
      name,
      born,
      bookCount,
      id
    },
    allBooks {
      title
      author
      published
      genres
      id
    }
  }
`

export const ALL_AUTHORS = gql `
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql `
  query {
    allBooks {
      title
      author
      published
      genres
      id
    }
  }
`
 // $ = muuttujien lukija, käytetään kun haetaan/luodaan jtn (handleri)
 // Ensiksi addBook mutatio BE:stä, viimeiseksi BE:n arvot (eli title author published genres )
export const CREATE_BOOK = gql `
  mutation createBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]) { 
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql `
  mutation editAuthor ($author: String!, $bornTo: Int!) {
    editAuthor (
      name: $author
      setBornTo: $bornTo
      ) {
      name
      born
      }
  }
`