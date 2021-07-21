var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})


module.exports = router