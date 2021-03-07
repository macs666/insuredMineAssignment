const httpStatus = require('http-status');
const { Policy, PolicyCarrier, PolicyCategory } = require('../models');
const ApiError = require('../utils/APIError');

/**
 * Create a policy
 * @param {Object} policyBody
 * @returns {Promise<Policy>}
 */
const createPolicy = async (policyBody) => {
  const policy = await Policy.create(policyBody);
  return policy;
};

/**
 * Create a policy carrier
 * @param {Object} policyCarrierBody
 * @returns {Promise<PolicyCarrier>}
 */
const createPolicyCarrier = async (policyCarrierBody) => {
  if (await PolicyCarrier.isNameTaken(policyCarrierBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const policyCarrier = await PolicyCarrier.create(policyCarrierBody);
  return policyCarrier;
};

/**
 * Create a policy
 * @param {Object} policyBody
 * @returns {Promise<PolicyCategory>}
 */
const createPolicyCategory = async (policyCategoryBody) => {
  if (await PolicyCategory.isNameTaken(policyCategoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const policyCategory = await PolicyCategory.create(policyCategoryBody);
  return policyCategory;
};

/**
 * Get Policy Carrier by name
 * @param {string} name
 * @returns {Promise<User>}
 */
const getPolicyCarrierByName = async (name) => {
  return PolicyCarrier.findOne({ name });
};

/**
 * Get Policy Category by name
 * @param {string} name
 * @returns {Promise<User>}
 */
const getPolicyCategoryByName = async (name) => {
  return PolicyCategory.findOne({ name });
};

module.exports = {
  createPolicy,
  createPolicyCarrier,
  createPolicyCategory,
  getPolicyCarrierByName,
  getPolicyCategoryByName,
};
