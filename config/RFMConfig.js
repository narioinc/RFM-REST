const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
var configDirPath = require('path').join(homedir, '.rfm/server');
RFMLogger = require('../utils/logger');

var RFMFullConfig;
var config;
const appRoot = path.resolve(__dirname);

var RFMConfig = {

  initConfig: function () {

    if (!fs.existsSync(configDirPath)) {
      fs.mkdir(configDirPath,
        { recursive: true }, (err) => {
          if (err) {
            RFMLogger.error('Config directory already exists!');
          } else {
            RFMLogger.info('Config directory created successfully!');
          }
        });
    }
    
    if(!fs.existsSync(configDirPath + '/default.json')){
      RFMLogger.info("copying default config file to " + configDirPath + '/default.json');
      copyDefaultConfig();
    }

    RFMLogger.info("loading server configuration from " + configDirPath);
    process.env["NODE_CONFIG_DIR"] = configDirPath
    config = require('config');
    RFMFullConfig = config.get('rfm');

  },

  getRFMConfig: function () {
    return RFMFullConfig;
  },

  getMqttConfig: function () {
    return RFMFullConfig['mqtt'];
  },

  getServerConfig: function () {
    return RFMFullConfig['server']
  },

  setRFMConfig: function (config) {
    RFMFullConfig = config;
    writeConfigFile(config)
  }

}

function writeConfigFile(config) {
  try {
    fs.writeFile(configDirPath + '/default.json', JSON.stringify({ "rfm": config }), {
      // flag: 'a' // 'a' flag for append
    }, (err) => {
      RFMLogger.error("ERROR: ", err)
    })
  } catch (err) {
    RFMLogger.error(err);
  }

}

function copyDefaultConfig() {
  fs.copyFileSync(appRoot + "/default.json", require('path').join(homedir, '.rfm') + "/default.json", fs.constants.COPYFILE_EXCL);
}



module.exports = RFMConfig;