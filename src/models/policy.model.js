const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const policySchema = mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
    },
    policyStartDate: {
      type: Date,
    },
    policyEndDate: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PolicyCategory',
    },
    carrier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PolicyCarrier',
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
policySchema.plugin(toJSON);
policySchema.plugin(paginate);

/**
 * @typedef Policy
 */
const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
