var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  });

router.get('/summary', function(req, res, next) {
    Promise.all([si.wifiInterfaces(), si.wifiConnections()]).then((messages) => {
        res.status(200);
        res.json({"summary": {"wifiInterfaces": messages[0], "wifiConnections": messages[1]}});
    })
});

router.get('/networks', function(req, res, next) {
    si.wifiNetworks().then(data =>{
        res.status(200);
        res.json({"wifiNetworks": data});
    }).catch(error =>{

    })
})


router.get('/interfaces', function(req, res, next) {
    si.wifiInterfaces().then(data =>{
        res.status(200);
        res.json({"wifiInterfaces": data});
    }).catch(error =>{

    })
})

router.get('/connections', function(req, res, next) {
    si.wifiConnections().then(data =>{
        res.status(200);
        res.json({"wifiConnections": data});
    }).catch(error =>{

    })
})
module.exports = router;