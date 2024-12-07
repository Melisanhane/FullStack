import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
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
export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

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

export const ME = gql `
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
    }
  }
`