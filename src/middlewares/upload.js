const multer = require('multer');
const path = require('path');

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(__dirname, '../../assets/uploads/');
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

const uploadFile = multer({ storage, fileFilter: csvFilter });
module.exports = uploadFile;
