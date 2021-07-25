var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
RFMConfig = require('./config/RFMConfig')
RFMConfig.initConfig();
var cors = require('cors')
RFMLogger = require('./utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./utils/swaggerDocs');
RFMStorage = require('./data/database');
deviceManager = require('./device/deviceManager');

RFMStorage.initDatabase().then(data => {
  deviceManager.initDeviceManager(RFMStorage);
});


//var systemInfoRouter = require('./routes/system/systeminfo');
var serverRouter = require('./routes/server/server')
var deviceRouter = require('./routes/device/deviceApi')
var discoveryRouter = require('./routes/device/discoveryApi');

var app = express();

app.use(logger('combined', { "stream": RFMLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/server', serverRouter);
app.use('/device', deviceRouter)
app.use('/discover', discoveryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(RFMConfig.getServerConfig().port, '0.0.0.0', () => {
  RFMLogger.info('Welcome to Raspberry-Pi Fleet manager');
  RFMLogger.info('RFM Server REST API listening on port : ' + RFMConfig.getServerConfig().port);
})
app.use(cors());

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
 
  server.close(() => {
    debug('HTTP server closed')
  })
})

process.on('SIGINT', function () {
  RFMLogger.info("Shutting down server database connection");
  RFMStorage.closeDatabase();
  if (true)
  RFMLogger.info("Shutting down RFM");
    process.exit();
});

module.exports = app;
