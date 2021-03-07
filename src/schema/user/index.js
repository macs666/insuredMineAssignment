const { gql } = require('apollo-server-express');

// Define User schema
const typeDefs = gql`
  type User {
    firstName: String!
    dob: String
    address: String
    phoneNumber: String
    state: String
    zipCode: String
    email: String
    gender: String
    userType: String
  }

  type Agent {
    name: String
  }

  type Account {
    name: String
  }

  input CreateUserInput {
    firstName: String!
    dob: String
    address: String
    phoneNumber: String
    state: String
    zipCode: String
    email: String
    gender: String
  }

  extend type Query {
    users: [User]
  }
  extend type Mutation {
    createUser(user: CreateUserInput): String
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
