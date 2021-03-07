const { workerData, isMainThread, parentPort } = require('worker_threads');
const mongoose = require('mongoose');
const { userService, policyService } = require('..');
const { User, Agent, PolicyCarrier, PolicyCategory } = require('../../models');

const config = require('../../config/config');
const logger = require('../../config/logger');

/**
 * Save row data to each collection in DB
 * @param {Object} data
 * @returns {Promise<Boolean>}
 */
async function createDataFromSheetRow(data) {
  // Fetch existing user else create new user
  let user;
  let status = await User.isEmailTaken(data.email);
  if (status) {
    user = await userService.getUserByEmail(data.email);
  } else {
    user = await userService.createUser({
      firstName: data.firstname,
      email: data.email,
      dob: data.dob,
      address: data.address,
      phoneNumber: data.phone,
      state: data.state,
      zipCode: data.zip,
      gender: data.gender,
      userType: data.userType,
    });
  }
  if (!user) {
    throw new Error('user empty');
  }
  await userService.createAccount({ name: data.account_name, user: user.id });

  // Fetch existing agent else create new agent
  let agent;
  status = await Agent.isNameTaken(data.agent);
  if (status) {
    agent = await userService.getAgentByName(data.agent);
  } else {
    agent = await userService.createAgent({ name: data.agent });
  }
  if (!agent) {
    throw new Error('agent empty');
  }

  // Fetch existing policy carrier else create new agent
  let carrier;
  status = await PolicyCarrier.isNameTaken(data.company_name);
  if (status) {
    carrier = await policyService.getPolicyCarrierByName(data.company_name);
  } else {
    carrier = await policyService.createPolicyCarrier({ name: data.company_name });
  }
  if (!carrier) {
    throw new Error('Policy Carrier empty');
  }

  // Fetch existing policy category else create new agent
  let category;
  status = await PolicyCategory.isNameTaken(data.category_name);
  if (status) {
    category = await policyService.getPolicyCategoryByName(data.category_name);
  } else {
    category = await policyService.createPolicyCategory({ name: data.category_name });
  }
  if (!category) {
    throw new Error('Policy Category empty');
  }

  // create new policy
  const policy = {
    policyNumber: data.policy_number,
    policyStartDate: data.policy_end_date,
    policyEndDate: data.policy_start_date,
    category: category.id,
    carrier: carrier.id,
    agent: agent.id,
    user: user.id,
  };
  const savedPolicy = await policyService.createPolicy(policy);
  if (!savedPolicy) {
    throw new Error('Policy empty');
  }
  user.policies.push(savedPolicy);
  await user.save();
}

// Perform worker process
if (!isMainThread) {
  mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      let count = 0;
      logger.info('Worker thread connected to MongoDB');
      // This code is executed in the worker and not in the main thread.
      const actions = workerData.rows.map(async (row) => {
        try {
          await createDataFromSheetRow(row);
          count += 1;
        } catch (error) {
          logger.error(error);
        }
      });
      const results = Promise.all(actions);

      results
        .then(() => {
          // Send message to the main thread.
          if (count > 0) {
            parentPort.postMessage({
              status: true,
              rowsSaved: count,
              message: 'Successfully saved data from sheet',
            });
          } else {
            parentPort.postMessage({
              status: false,
              message: 'Failed to save data from sheet',
            });
          }
        })
        .catch((error) => {
          parentPort.postMessage({
            status: false,
            message: 'Failed to save data from sheet',
            errorMessage: error,
          });
        });
    })
    .catch((error) => {
      parentPort.postMessage({
        status: false,
        message: 'Failed at connecting to DB in worker thread',
        errorMessage: error,
      });
    });
}
