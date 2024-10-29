// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
    books: [Book]
  }

  type Mutation {
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }
`;

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      // Resolve the 'me' query based on logged-in user
    },
    books: async () => {
      // Resolve the 'books' query
    },
  },
  Mutation: {
    saveBook: async (_, { bookData }, context) => {
      // Logic for saving a book
    },
    removeBook: async (_, { bookId }, context) => {
      // Logic for removing a book
    },
  },
};

module.exports = { typeDefs, resolvers };
