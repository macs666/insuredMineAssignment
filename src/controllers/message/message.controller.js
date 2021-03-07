const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { messageService } = require('../../services');

const createMessage = catchAsync(async (req, res) => {
  const message = {
    text: req.body.message,
    postDate: Date(req.body.day.concat('T', req.body.time)),
  };
  const createdMessage = await messageService.createMessage(message);
  res.status(httpStatus.CREATED).send(createdMessage);
});

module.exports = {
  createMessage,
};
