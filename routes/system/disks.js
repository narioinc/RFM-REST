var express = require('express');
var router = express.Router();
const si = require('systeminformation');

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

router.get('/summary', function(req, res, next) {
    Promise.all([si.diskLayout(), si.disksIO()]).then((messages) => {
        res.status(200);
        res.json({"summary": {"diskLayout": messages[0], "disksIO": messages[1]}});
    })
});


router.get('/disk_layout', function(req, res, next) {
    si.diskLayout().then(data =>{
        res.status(200);
        res.json({"diskLayout": data});
    }).catch(error =>{

    })
})

router.get('/block_devices', function(req, res, next) {
    si.blockDevices().then(data =>{
        res.status(200);
        res.json({"blockDevices": data});
    }).catch(error =>{

    })
})

router.get('/disks_io', function(req, res, next) {
    si.disksIO().then(data =>{
        res.status(200);
        res.json({"disksIO": data});
    }).catch(error =>{

    })
})

module.exports = router;