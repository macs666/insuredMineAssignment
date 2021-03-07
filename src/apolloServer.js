const { ApolloServer } = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const schema = require('./schema');
const { env } = require('./config/config');

const apolloServer = new ApolloServer({
  schema,
  introspection: env !== 'production',
  validationRules: [depthLimit(7)],
  formatError: (err) => {
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }

    return err;
  },
});

module.exports = apolloServer;
