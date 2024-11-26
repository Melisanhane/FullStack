import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const query = gql `
  query {
    allAuthors  {
      name,
      born,
      bookCount,
    },
    allBooks {
      title
      author
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql `
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql `
 query {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
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
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql `
  mutation editAuthor ($author: String!, $born: Int!) {
    editAuthor (
      name: $author
      born: $born
      ) {
      name
      born
      }
  }
`