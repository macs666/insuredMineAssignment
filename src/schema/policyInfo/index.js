const { gql } = require('apollo-server-express');

// Define User schema
const typeDefs = gql`
  type Policy {
    policyNumber: String
    policyStartDate: String
    policyEndDate: String
    user: User
    category: PolicyCategory
    company: PolicyCarrier
  }
  type PolicyCategory {
    name: String
  }
  type PolicyCarrier {
    name: String
  }
  extend type Query {
    policies: [Policy]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
