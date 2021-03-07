const express = require('express');

const router = express.Router();
const { messageController } = require('../../controllers/index');

router.route('/').post(messageController.createMessage);

module.exports = router;
