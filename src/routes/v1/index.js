const express = require('express');
const healthCheck = require('./health.route');

const router = express.Router();

router.use('/health', healthCheck);

module.exports = router;
