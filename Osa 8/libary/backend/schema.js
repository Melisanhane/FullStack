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
  type Subscription {
    bookAdded: Book!
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
module.exports = typeDefs