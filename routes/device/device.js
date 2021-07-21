var express = require('express');
var router = express.Router();
var deviceManager = require('./deviceManager');

deviceManager.initDeviceManager();

/**
* @swagger
* /device/discover:
*   get:
*     description: Discover devices advertising in the local network
*     tags: [Device Provisioning]
*     responses:
*       200:
*         description: Returns list of RFM agent devices advertising themselves in the local network.
*/
router.get('/discover', function (req, res, next) { 
    console.log("lasjdhfjkhsdfjkdh")
    res.status(200)
    res.json({})
    //res.json(deviceManager.getDiscoveredDevices())
})

/**
 * @swagger
 * /device:
 *   get:
 *     description: Provisioned Devices
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns the list of all provisioned devices with their details.
 */
router.get('/', function (req, res, next) { 
    res.status(200)
    res.json({})
})

/**
* @swagger
* /device/{deviceId}:
*   get:
*     description: Provisioned Devices
*     parameters:
*       - in: path
*         name: deviceId
*         schema:
*           type: string
*         required: true
*         description: Device ID of the provisioned device
*     tags: [Device Provisioning]
*     responses:
*       200:
*         description: Returns the details of trhe device with id {deviceId}.
*/
router.get('/:deviceId', function (req, res, next) {})

/**
 * @swagger
 * /device:
 *   post:
 *     description: Provision a new devices
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns success if a new device got provisoned successfully.
 */
router.post('/', function (req, res, next) { })

/**
* @swagger
* /device/{deviceId}:
*   put:
*     description: Update device details
*     parameters:
*       - in: path
*         name: deviceId
*         schema:
*           type: string
*         required: true
*         description: Device ID of the provisioned device
*     tags: [Device Provisioning]
*     responses:
*       200:
*         description: Returns success if the device got updated successfully.
*/
router.put('/:deviceId', function (req, res, next) { })

/**
 * @swagger
 * /device/{deviceId}:
 *   delete:
 *     description: Delete a provisioned device from the server
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID of the provisioned device
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns success if the device got deleted successfully.
 */
router.put('/:deviceId', function (req, res, next) { })


module.exports = router