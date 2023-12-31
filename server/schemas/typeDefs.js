const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    user: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String): User
    login(username: String!, email: String!, password: String): User
    saveBook(authors: String, description: String!, bookId: String!, image: String, link: String, title: String!): User
    deleteBook(authors: String, description: String!, bookId: String!, image: String, link: String, title: String!): User
  }
`;

module.exports = typeDefs;
