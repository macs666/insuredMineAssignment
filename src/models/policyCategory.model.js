const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const policyCategorySchema = mongoose.Schema(
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
policyCategorySchema.plugin(toJSON);
policyCategorySchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The policy category's name
 * @param {ObjectId} [excludePolicyCategoryId] - The id of the policy category to be excluded
 * @returns {Promise<boolean>}
 */
policyCategorySchema.statics.isNameTaken = async function (name, excludePolicyCategoryId) {
  const policyCategory = await this.findOne({ name, _id: { $ne: excludePolicyCategoryId } });
  return !!policyCategory;
};

/**
 * @typedef PolicyCategory
 */
const PolicyCategory = mongoose.model('PolicyCategory', policyCategorySchema);

module.exports = PolicyCategory;
