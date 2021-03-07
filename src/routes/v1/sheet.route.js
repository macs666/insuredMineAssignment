const express = require('express');
const upload = require('../../middlewares/upload');

const router = express.Router();
const { uploadController } = require('../../controllers/index');

router.route('/upload').post(upload.single('file'), uploadController.upload);

module.exports = router;
