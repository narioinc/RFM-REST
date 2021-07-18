var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

router.get('/summary', function(req, res, next) {
    Promise.all([si.fsSize(), si.fsStats()]).then((messages) => {
        res.status(200);
        res.json({"summary": {"fsSize": messages[0], "fsStats": messages[1]}});
    })
});

router.get('/size', function(req, res, next) {
    si.fsSize().then(data =>{
        res.status(200);
        res.json({"fsSize": data});
    }).catch(error =>{

    })
})

router.get('/open_files', function(req, res, next) {
    si.fsOpenFiles().then(data =>{
        res.status(200);
        res.json({"fsOpenFiles": data});
    }).catch(error =>{

    })
})


router.get('/stats', function(req, res, next) {
    si.fsStats().then(data =>{
        res.status(200);
        res.json({"fsStats": data});
    }).catch(error =>{

    })
})

module.exports = router;