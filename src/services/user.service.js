const httpStatus = require('http-status');
const { User, Agent, Account } = require('../models');
const ApiError = require('../utils/APIError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Create an agent
 * @param {Object} agentBody
 * @returns {Promise<Agent>}
 */
const createAgent = async (agentBody) => {
  if (await Agent.isNameTaken(agentBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const agent = await Agent.create(agentBody);
  return agent;
};

/**
 * Get agent by name
 * @param {string} name
 * @returns {Promise<User>}
 */
const getAgentByName = async (name) => {
  return Agent.findOne({ name });
};

/**
 * Create an account
 * @param {Object} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  const account = await Account.create(accountBody);
  return account;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryAllUsers = async (filter) => {
  const users = await User.find(filter).populate('policies');
  return users;
};

module.exports = {
  createUser,
  createAgent,
  createAccount,
  queryUsers,
  getUserByEmail,
  getAgentByName,
  queryAllUsers,
};
