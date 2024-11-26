const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

// ----- MONGO -----
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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

// Skeema = määrittelee minkä muotoista dataa sovelluksessa vaihdetaan clientin ja palvelimen välillä
// type Query = Määrittelee mitä kyselyitä API:n voidaan tehdä
const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!  
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    createUser (
      username: String!
      favoriteGenre: String!
    ): User
      login(
        username: String!
        password: String!
      ): Token
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor (
      name: String!
      born: Int!
    ): Author
  }
`
// root = Olio, eli mistä etsitään (Books, Authors)
// args = argumentit, eli kyselyn parametrit
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let booksFiltered = Book.find({})
      /*  
      // Onko turha? mitä tekeee???
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        console.log ('aatho0ri ja genrepi mäkkyy')
        return Book.find({ author: author.id, genres: [args.genre] })
      }
        */
      if (args.author) {
        const filterAuthors = await Author.findOne({name: args.author})
        if (filterAuthors) {
          return Book.find({author: filterAuthors._id})
        }
        return []
      }
      if (args.genre) {
        const filterGenre = await Book.find({genres: args.genre})
        console.log('filtteri genrepi')
        return filterGenre
      }
      return booksFiltered
    },
    allAuthors: async (root, args) => Author.find({}),
      me: (root, args, context) => {
        console.log(context.currentUser, "rivi 100 AllAuthoori ME")
        return context.currentUser
      },
    },

    Author: {
      bookCount: async (root) => {
        const authorsBooks = await Book.countDocuments({author: root._id})
        return authorsBooks
      }
    },
    Book: {
      author: async (root) => {
        return Author.findById(root.author)
      }
    },

    Mutation: {
      createUser: async (root, args) => {
        try {
          const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
          await user.save()
        }
        catch (error) {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        }
      }, 
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.SECRET) }
      },

      addBook: async (root, args, context) => {
      // TSEKATAAN ONKO KÄYTTÄJÄ KIRJAUTUNUT
        const currentUser = context.currentUser
        if (!currentUser) {      
          throw new GraphQLError('not authenticated', {        
            extensions: {          
              code: 'BAD_USER_INPUT',
            }      
          })
        }

        const checkAuthor = await Author.findOne({ name: args.author })
      // TSEKATAAN ONKO KÄYTTÄJÄ OLEMASSA JA JOS EI NIIN LUODAAN UUSI
        if (!checkAuthor) {
          try {
            const author = new Author({ name: args.author })
            await author.save()
          } 
          catch (error) {
            throw new GraphQLError('Saving author failed in add book', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error,
              }
            })
          }
        }
        const author = await Author.findOne({ name: args.author })
        try {
          const book = new Book({ ...args, author: author })
          return book.save()
        }
        catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            }
          })
        }
      },
      editAuthor: async (root, args, context) => {
      // TSEKATAAN ONKO KÄYTTÄJÄ KIRJAUTUNUT
        const currentUser = context.currentUser
        if (!currentUser) {      
          throw new GraphQLError('not authenticated', {        
            extensions: {          
              code: 'BAD_USER_INPUT',
            }      
          })
        }

        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.born
        await author.save()
        return author
      }
    }
}

// NÄMÄ PAKOLLISET LOPUSSA JOTTA SAADAAN APOLLO SERVER TOIMIMAAN
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
// Contextilla suoritetaan kaikille kyselyille ja mutaatioille jtn yhteistä, nyt käyttäjän tunnistaminen
// Se annetaan resolvereille 3. parametri context
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {    
    const auth = req 
    ? req.headers.authorization 
    : null    
    if (auth && auth.startsWith('Bearer ')) {   
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)      
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }  
  },
}).then(({ url }) => {
  console.log(`ApolloServer ready at ${url}`)
})