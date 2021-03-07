const { makeExecutableSchemaFromModules } = require('../utils/module');

const user = require('./user');
const policy = require('./policyInfo');

module.exports = makeExecutableSchemaFromModules({
  modules: [user, policy],
});
