const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
agentSchema.plugin(toJSON);
agentSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The agent's name
 * @param {ObjectId} [excludeAgentId] - The id of the agent to be excluded
 * @returns {Promise<boolean>}
 */
agentSchema.statics.isNameTaken = async function (name, excludeAgentId) {
  const agent = await this.findOne({ name, _id: { $ne: excludeAgentId } });
  return !!agent;
};

/**
 * @typedef Agent
 */
const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
