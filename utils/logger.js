var winston = require('winston');
const homedir = require('os').homedir();

RFMLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: require('path').join(homedir, '.rfm') + '/rfm.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
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