const express = require('express');
const healthCheck = require('./health.route');
const sheetRoutes = require('./sheet.route');
const messageRoutes = require('./message.route');

const router = express.Router();

router.use('/health', healthCheck);
router.use('/sheets', sheetRoutes);
router.use('/message', messageRoutes);

module.exports = router;
