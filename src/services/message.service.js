const cron = require('node-cron');
const { Message, PostedMessage } = require('../models');

/**
 * Create a message
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const createMessage = async (messageBody) => {
  const message = await Message.create(messageBody);
  return message;
};

/**
 * Get message by date
 * @param {date} date
 * @returns {Promise<Message>}
 */
const getMessageByDate = async (date) => {
  return Message.findOne({ postDate: date });
};

// Run a cron job every second to perform posting to different collection
const runCronJob = async () => {
  // Schedule tasks to be run on the server every min.
  cron.schedule('* * * * *', async () => {
    const date = Date.now();
    const messageBody = await Message.findOne({ postDate: date });
    await PostedMessage.create(messageBody);
  });
};

module.exports = {
  createMessage,
  getMessageByDate,
  runCronJob,
};
