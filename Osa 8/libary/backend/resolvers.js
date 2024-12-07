const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let booksFiltered = Book.find({})
        if (args.author) {
          const filterAuthors = await Author.findOne({name: args.author})
          if (filterAuthors) {
            return Book.find({author: filterAuthors._id})
          }
          return []
        }
        if (args.genre) {
          const filterGenre = await Book.find({genres: args.genre})
          return filterGenre
        }
        return booksFiltered
      },
      allAuthors: async () => Author.find({}),
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
          const currentUser = context.currentUser
          if (!currentUser) {      
            throw new GraphQLError('not authenticated', {        
              extensions: {          
                code: 'BAD_USER_INPUT',
              }      
            })
          }
  
          const checkAuthor = await Author.findOne({ name: args.author })
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
          const book = new Book({ ...args, author: author })
          try {
            book.save()
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
          pubsub.publish('BOOK_ADDED', {bookAdded: book })
          return book
        },
        editAuthor: async (root, args, context) => {
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
        },
      },
    Subscription: {
      bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
}
  
module.exports = resolvers