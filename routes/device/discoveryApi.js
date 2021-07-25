var express = require('express');
var router = express.Router();

/**
* @swagger
* /discover:
*   get:
*     description: Discover devices advertising in the local network
*     tags: [Device Provisioning]
*     responses:
*       200:
*         description: Returns list of RFM agent devices advertising themselves in the local network.
*/
router.get('/', function (req, res, next) { 
    var result = deviceManager.getDiscoveredDevices()
    res.status(200)
    res.json(result)
})

module.exports = router