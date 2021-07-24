var deviceDiscovery = require('./deviceDiscovery')
const { v4: uuidv4 } = require('uuid');
const RFMStorage = require('../data/database');
sequelize = RFMStorage.getSQLInstance();

var discoveredDevices = {};
discoveredDevices["devices"] = {}

var deviceManager = {
    discoveredDevices: [],
    initDeviceManager: function () {
        deviceDiscovery.discoverDevices(this);
    },
    serviceUp: function (device) {
        RFMLogger.info(device)
        discoveredDevices["devices"][device.host] = device
    },
    serviceDown: function (device) {
        RFMLogger.info(device)
        delete discoveredDevices["devices"][device.host];
    },
    getDiscoveredDevices: function () {
        //console.log(discoveredDevices)
        return discoveredDevices;
    },
    getRegisteredDevices: function(){
        return new Promise((resolve, reject) => {
            sequelize.models.device.findAll().then(data => {
                resolve(data);
            }).catch(err => {
                reject({ "status": "fail" })
            })
        });
    },
    getRegisteredDevice: function(deviceId){
        return new Promise((resolve, reject) => {
            sequelize.models.device.findAll({
                where: {
                    deviceId: deviceId
                }
            }).then(data => {
                resolve(data[0].dataValues);
            }).catch(err => {
                reject({"status": "fail", "message": "Device Not Found"})
            })
        })
    },

    registerDevice: function (deviceDetails) {
        var device = sequelize.models.device.build(deviceDetails)
        return new Promise((resolve, reject) => {
            device.save().then(data => {
                RFMLogger.info("Device created successfully with id " + device.deviceId)
                resolve(data.dataValues);
            }).catch(err => {
                RFMLogger.error("Error while creating a device" + err)
                reject({ "status": "fail", "message" : "Device could not be created"})
            })
        })

    },
    removeDevice: function (deviceId) {      
        return new Promise((resolve, reject) => {
            sequelize.models.device.findAll({
                where: {
                    deviceId: deviceId
                }
            }).then(deviceData => {
                var device = sequelize.models.device.build(deviceData[0].dataValues);
                device.destroy().then(data => {
                    console.log(data)
                    RFMLogger.info("Device deleted successfully with id " + data)
                    resolve(data.dataValues)
                }).catch(err => {
                    RFMLogger.error("Error while deleting a device with deviceId :" + deviceDetails.deviceId)
                    reject({"status": "fail", "message": "Device could not be deletes"})
                })
            }).catch(err => {
                RFMLogger.error("Error while deleting a device with deviceId :" + deviceDetails.deviceId);
                reject({"status": "fail", "message": "Device not found"})
            })
           
        })
    },
    updateDevice: function(deviceDetails){
        var device = sequelize.models.device.build(deviceDetails);
        return new Promise((resolve, reject) => {
            sequelize.models.device.update(device, {
                where: {
                    deviceId: device.deviceId
                }
            }).then(data => {
                resolve(data.dataValues)
            }).catch(err => {
                reject({"status": "fail", "message": "Device could not be updated"})
            })
        })
       
    }
}

module.exports = deviceManager;