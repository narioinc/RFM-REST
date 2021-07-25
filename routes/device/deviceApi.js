var express = require('express');
var router = express.Router();

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
    deviceManager.getRegisteredDevices().then(data => {
        res.status(200)
        res.json(data)
    }).catch(err => {
        res.status(404)
        res.json()
    })
    
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
router.get('/:deviceId', function (req, res, next) {
    deviceId = req.params.deviceId
    deviceManager.getRegisteredDevice(deviceId).then(data => {
        res.status(200);
        res.json(data)
    }).catch(err=> {
        res.status(404);
        res.json(err) 
    })
})

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
router.post('/', function (req, res, next) { 
    deviceDetails = req.body
    deviceManager.registerDevice(deviceDetails).then(data => {
        res.status(200);
        res.json(data)
    }).catch(err=>{
        res.status(400);
        res.json(err)
    })
    
})

/**
 * @swagger
 * /device:
 *   delete:
 *     description: Delete a new devices
 *     tags: [Device Provisioning]
 *     responses:
 *       200:
 *         description: Returns success if a device got deleted successfully.
 */
 router.delete('/:deviceId', function (req, res, next) { 
    deviceId = req.params.deviceId
    deviceManager.removeDevice(deviceId).then(data => {
        res.status(200);
        res.json(data)
    }).catch(err=> {
        res.status(400)
        res.json(err)
    })
    
})

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
router.put('/:deviceId', function (req, res, next) { 
    deviceDetails = req.body;
    deviceManager.updateDevice(deviceDetails).then(data=>{
        res.status(200);
        res.json(data);
    }).catch(err =>{
        res.status(400)
        res.json(err)
    })
})


module.exports = router