RFMLogger = require('../utils/logger');
var deviceTracker = {}
const axios = require('axios');
const device = require('./models/device');

var connectivityTracker = {
    mqttClient: {},
    RFMStorage: {},
    initTracker: function (mqttClient, RFMStorage) {
        RFMLogger.info("Starting device tracker")
        this.mqttClient = mqttClient;
        this.RFMStorage = RFMStorage;
        this.getRegisteredDevices().then(data => {
            data.forEach(deviceData => {
                this.createDeviceTrackerEntry(deviceData)
            })
            this.registerMqttTrackerListener(data)
            this.registerHTTPTrackerListener(data);
            this.runTrackerScheduler();
        }).catch(err => {
            RFMLogger.error(err);
            RFMLogger.error("Failed to fetch devices to initiate device tracking")
        })
        this.mqttClient.getClient().on('message', function (topic, message) {
            handleMqttMessage(topic, message)
        })
    },
    registerMqttTrackerListener: function (devices) {
        devices.forEach(device => {
            trackedDevice = device.dataValues
            RFMLogger.debug("Registering mqtt tracker for device with deviceId : " + trackedDevice.deviceId);
            this.mqttClient.subscribeToTopic("/" + trackedDevice.deviceId + '/health')
        })
    },
    addDeviceToMqttTracker: function(device){
        this.createDeviceTrackerEntry(device)
        this.mqttClient.subscribeToTopic("/" + device.deviceId + '/health')
    },
    registerHTTPTrackerListener: function () {
        setInterval(() => {
            this.getRegisteredDevices().then(data => {
                data.forEach(deviceData => {
                    var device = deviceData.dataValues;
                    deviceTracker[device.deviceId] ? {} : deviceTracker[device.deviceId] = {}
                    RFMLogger.debug("Getting RFM Agent health for device with deviceId : " + device.deviceId)
                    deviceHealthUrl = "http://" + device.host + ":" + device.port + "/health";
                    axios.get(deviceHealthUrl).then(function (response) {
                        RFMLogger.debug(response);
                        deviceTracker[device.deviceId]['httpLastHealthCheck'] = Date.now();
                    })
                        .catch(function (error) {
                            RFMLogger.error(error);
                            deviceTracker[device.deviceId]['httpLastHealthCheck'] = 0
                        })

                })
            })
        }, 10000);


    },
    getRegisteredDevices: function () {
        sequelize = this.RFMStorage.getSQLInstance();
        return new Promise((resolve, reject) => {
            sequelize.models.device.findAll().then(data => {
                resolve(data);
            }).catch(err => {
                RFMLogger.error(err)
                reject({ "status": "fail" })
            })
        });
    },
    runTrackerScheduler: function () {

        sequelize = this.RFMStorage.getSQLInstance();
        setInterval(() => {
            for (const key in deviceTracker) {
                deviceTrackerData = deviceTracker[key];
                var mqttHealth, httpHealth
                //TODO  make the seconds as configurable for the agent
                if (!deviceTrackerData.mqttLastHealthCheck || deviceTrackerData.mqttLastHealthCheck <= 0 ) {
                    RFMLogger.debug("mqtt last health check not present for deviceId : " + key);
                    sequelize.models.device.update({ "mqttHealth": "disconnected" }, {
                        where: {
                            deviceId: key
                        }
                    })
                }
                else if (Date.now() - deviceTrackerData['mqttLastHealthCheck'] > 60000) {
                    RFMLogger.debug("mqtt last health greater than health timeout for deviceId : " + key);
                    sequelize.models.device.update({ "mqttHealth": "disconnected" }, {
                        where: {
                            deviceId: key
                        }
                    })
                } else {
                    RFMLogger.debug("mqtt last health has passed for deviceId : " + key);
                    sequelize.models.device.update({ "mqttHealth": "connected" }, {
                        where: {
                            deviceId: key
                        }
                    })
                }
            }
        }, 10000);
    },
    createDeviceTrackerEntry: function(device){
        RFMLogger.debug("adding device with device id : " + device.deviceId + " to the tracker entries")
        deviceTracker[device.deviceId] ? {} : deviceTracker[device.deviceId] = {}
        deviceTracker[device.deviceId]['mqttLastHealthCheck'] = 0
        deviceTracker[device.deviceId]['httpLastHealthCheck'] = 0;
    }
}

function handleMqttMessage(topic, message) {
    if (topic.includes('/health')) {
        deviceId = topic.substring(1, topic.indexOf('/health'))
        deviceTracker[deviceId] ? {} : deviceTracker[deviceId] = {}
        deviceTracker[deviceId]['mqttLastHealthCheck'] = Date.now();
        RFMLogger.debug("the device with id" + deviceId + " is connected to MQTT bridge")
        RFMLogger.debug(deviceTracker)
    }
}

function handleHttpMessage(device) {
    deviceId = device.deviceId;
    deviceTracker[deviceId] ? deviceTracker[deviceId] = {} : {}
    deviceTracker[deviceId]['httpLastHealthCheck'] = Date.now();
    RFMLogger.debug("the device with id" + deviceId + " is serving HTTP via RFM Agent")
}

module.exports = connectivityTracker