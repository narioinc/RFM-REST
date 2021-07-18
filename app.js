var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const config = require('config');
const provideDatabase = require("./database");
var crypto = require('crypto');
var cors = require('cors')

const port = 8000

var authRouter = require('./routes/auth');
var metricsRouter = require('./routes/metrics');
var systemInfoRouter = require('./routes/system/systeminfo');
var wifiRouter = require('./routes/system/wifi');
var bluetoothRouter = require('./routes/system/bluetooth');
var diskRouter = require('./routes/system/disks');
var fsRouter = require('./routes/system/fs');
const serverConfig = config.get("server")
const database = provideDatabase();

var app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/systeminfo', systemInfoRouter);
app.use('/wifi', wifiRouter);
app.use('/disk', diskRouter);
app.use('/fs', fsRouter);
app.use('/metrics', metricsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//passportJS middleware
app.use(passport.initialize());

app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(port, () => {
  console.log('Welcome to Raspberry-Pi F\leet manager');
  console.log('RFM REST API listening at http://localhost:' + serverConfig.port);
})
app.use(cors());

//Configure PassportJS

passport.use(new LocalStrategy(async function(username, password, done) {
  const db = await database;
  db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const db = await database;
  db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

module.exports = app;
