var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
});

router.get('/cpu', function(req, res, next) {

})

router.get('/mem', function(req, res, next) {

})

router.get('/config', function(req, res, next) {

})

router.post('/config', function(req, res, next) {

})

module.exports = router;
