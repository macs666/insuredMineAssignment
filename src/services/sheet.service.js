// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads');
const path = require('path');

/**
 * Run service to initiate worker thread for upload operation
 * @param {Object} workerData
 * @returns {Promise}
 */
const runService = (workerData) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, './workers/', 'sheet.worker.js');

    const worker = new Worker(filePath, { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

/**
 * Run service promise
 * @param {Array.<Object>} rows
 * @returns {Promise<string>}
 */
const run = async (rows) => {
  const result = await runService({ rows });
  return result;
};

module.exports = run;
