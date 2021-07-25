var winston = require('winston');
const homedir = require('os').homedir();
var configDirPath = require('path').join(homedir, '.rfm/server');

process.env["NODE_CONFIG_DIR"] = configDirPath
config = require('config');
RFMConfig = config.get('rfm');
logLevel = RFMConfig.server.logger.loglevel
logEnabled = RFMConfig.server.logger.enabled

RFMLogger = winston.createLogger({
    silent: !logEnabled,
    transports: [
        new winston.transports.File({
            level: logLevel,
            filename: require('path').join(homedir, '.rfm') + '/rfm.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: logLevel,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

RFMLogger.stream = {
    write: function (message, encoding) {
        RFMLogger.info(message);
    }
};

module.exports = RFMLogger;