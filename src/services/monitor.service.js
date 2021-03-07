const os = require('os-utils');
// eslint-disable-next-line security/detect-child-process
const childProcess = require('child_process');
const config = require('../config/config');
const logger = require('../config/logger');

const runMonitor = () =>
  setInterval(() => {
    os.cpuUsage(function (v) {
      if (v > 70) {
        // pm2 will automatically restart the app in production
        if (config.env === 'production') {
          process.exit(1);
        } else {
          // Manually restart without pm2
          process.on('exit', function () {
            childProcess.spawn(process.argv.shift(), process.argv, {
              cwd: process.cwd(),
              detached: true,
              stdio: 'inherit',
            });
          });
          process.exit();
        }
      }
    });
  }, 1000);

module.exports = runMonitor;
