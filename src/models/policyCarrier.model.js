const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const policyCarrierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
policyCarrierSchema.plugin(toJSON);
policyCarrierSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The policy carrier's name
 * @param {ObjectId} [excludePolicyCarrierId] - The id of the policy carrier to be excluded
 * @returns {Promise<boolean>}
 */
policyCarrierSchema.statics.isNameTaken = async function (name, excludePolicyCarrierId) {
  const policyCarrier = await this.findOne({ name, _id: { $ne: excludePolicyCarrierId } });
  return !!policyCarrier;
};

/**
 * @typedef PolicyCarrier
 */
const PolicyCarrier = mongoose.model('PolicyCarrier', policyCarrierSchema);

module.exports = PolicyCarrier;
