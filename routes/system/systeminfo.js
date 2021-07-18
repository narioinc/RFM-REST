var express = require('express');
var router = express.Router();
const si = require('systeminformation');

const SYSTEM_SUMMARY = 0;
const CPU_SUMMARY = 1 

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

/* GET system basic summary page. */
router.get('/summary', function(req, res, next) {
   getSystemSummaryInfo().then(data => {
    var systemSummaryInfo = {"summary": {}}
    systemSummaryInfo["summary"]["system"] = data[SYSTEM_SUMMARY];
    systemSummaryInfo["summary"]["cpu"] = data[CPU_SUMMARY];
    res.status(200)
    res.send(systemSummaryInfo);
   })
});

router.get('/system', function(req, res, next) {
    si.system().then(data =>{
        res.status(200);
        res.json({"system": data});
    }).catch(error =>{

    });
});

router.get('/cpu', function(req, res, next) {
    Promise.all([si.cpu(), si.cpuFlags(), si.cpuCurrentSpeed(), si.cpuTemperature()]).then(messages =>{
        res.status(200);
        res.json({"cpu": {"cpuInfo": messages[0], "cpuFlags": messages[1],"cpuCurrentSpeed": messages[2], "cpuTemperature": messages[3]}});
    }).catch(error =>{

    });
});

router.get('/bios', function(req, res, next) {
    si.bios().then(data =>{
        res.status(200);
        res.json({"bios": data});
    }).catch(error =>{

    })
})
router.get('/baseboard', function(req, res, next) {
    si.baseboard().then(data =>{
        res.status(200);
        res.json({"baseboard": data});
    }).catch(error =>{

    })
})
router.get('/mem', function(req, res, next) {
    si.mem().then(data =>{
        res.status(200);
        res.json({"mem": data});
    }).catch(error =>{

    })
})
router.get('/osinfo', function(req, res, next) {
    si.osInfo().then(data =>{
        res.status(200);
        res.json({"osinfo": data});
    }).catch(error =>{

    })
})

router.get('/processes', function(req, res, next) {
    si.processes().then(data =>{
        res.status(200);
        res.json({"processes": data});
    }).catch(error =>{

    })
});

router.get('/current_load', function(req, res, next) {
    si.currentLoad().then(data =>{
        res.status(200);
        res.json({"currentLoad": data});
    }).catch(error =>{

    })
});


router.get('/network', function(req, res, next) {
    Promise.all([si.networkInterfaces(), si.networkStats()]).then((messages) =>{
        res.status(200);
        res.json({"network": {"interfaces": messages[0], "networkstats": messages[1]}});
    })
});

router.get('/network_connections', function(req, res, next) {
    si.networkConnections().then(data =>{
        res.status(200);
        res.json({"networkConnections": data});
    }).catch(error =>{

    })
});

router.get('/usb', function(req, res, next) {
    si.usb().then(data =>{
        res.status(200);
        res.json({"usb": data});
    }).catch(error =>{

    })
})

function getSystemSummaryInfo(){    
    return Promise.all([si.system(), si.cpu()])
}

module.exports = router;
