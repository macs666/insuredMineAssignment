const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);
/**
 * @typedef PostedMessage
 */
const PostedMessage = mongoose.model('PostedMessage', messageSchema);

module.exports = {
  Message,
  PostedMessage,
};
