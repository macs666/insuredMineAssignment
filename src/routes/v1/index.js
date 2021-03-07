const express = require('express');
const healthCheck = require('./health.route');
const sheetRoutes = require('./sheet.route');

const router = express.Router();

router.use('/health', healthCheck);
router.use('/sheets', sheetRoutes);

module.exports = router;
