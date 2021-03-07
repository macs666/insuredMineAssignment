const { userService } = require('../../services');

// Define resolvers
const resolvers = {
  Query: {
    async users() {
      console.log('something');
    },
  },
  Mutation: {
    /**
     * Create user mutation resolver
     * @param {Object} userData - User object to save
     * @returns {Promise<User>}
     */
    async createUser(_, inputData) {
      const user = await userService.createUser(inputData.user);
      return user;
    },
  },
};

module.exports = resolvers;
