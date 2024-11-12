const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

// ----- MONGO -----
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => { 
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
// ----- MONGO END -----
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

// Skeema = määrittelee minkä muotoista dataa sovelluksessa vaihdetaan clientin ja palvelimen välillä
// type Query = Määrittelee mitä kyselyitä API:n voidaan tehdä
const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

  }
`
// root = Olio, eli mistä etsitään (Books, Authors)
// args = argumentit, eli kyselyn parametrit
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        const filterAuthors = books.filter((book) => book.author === args.author)
        return filterAuthors
      }
      if (args.genre) {
        const filterGenre = books.filter((book) => book.genres.includes(args.genre))
        return filterGenre
      }
      return books
    },
    allAuthors: (root, args) => {
      return authors.map((author) => {
        const booksByAuthor = books.filter((book) => 
          book.author === author.name).length
        return { ...author, bookCount: booksByAuthor }
      })
    },
    },

    Author: {
      name: (root) => root.name,
      bookCount: (root) => root.bookCount
    },

    Mutation: {
      addBook: (root, args) => {
        const book = { ...args, id: uuid() }  // uuid on kirjasto joka luo uniikin ID || ... kopio kaikki arkumentit objektiksi
        books = books.concat(book)
        const checkAuthor = authors.find((person) => person.name === args.author)
        if (!checkAuthor) {
          const newAuthor = { name: args.author, id: uuid() }
          authors = authors.concat(newAuthor)
        }
        return (book)
      },
      editAuthor: (root, args) => {
        const author = authors.find((person) => person.name === args.name)
        if (!author) {
          return null
        }
        const updateAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(person => person.name === args.name ? updateAuthor : person)
        return updateAuthor
      }
    }
}

// NÄMÄ PAKOLLISET LOPUSSA JOTTA SAADAAN APOLLO SERVER TOIMIMAAN
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`ApolloServer ready at ${url}`)
})