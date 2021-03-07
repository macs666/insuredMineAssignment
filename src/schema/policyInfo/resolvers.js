// Define resolvers
const resolvers = {
  Query: {
    async policies() {
      console.log('something');
    },
  },
};

module.exports = resolvers;
