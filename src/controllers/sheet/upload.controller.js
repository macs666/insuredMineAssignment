const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { sheetService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const upload = catchAsync(async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }

    const rows = [];
    const filePath = path.join(__dirname, '../../../assets/uploads/', req.file.filename);

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        sheetService(rows)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            throw error.message;
          });
      });
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`,
    });
  }
});

module.exports = {
  upload,
};
