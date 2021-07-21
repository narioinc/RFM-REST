var deviceDiscovery = require('./deviceDiscovery')
var discoveredDevices = [];

var deviceManager = {
    discoveredDevices: [],
    initDeviceManager: function(){
        deviceDiscovery.discoverDevices(this);
    },
    serviceUp: function(device){
       RFMLogger.info(device)
       discoveredDevices[device.host] = device
    },
    serviceDown: function(device){
        RFMLogger.info(device)
    },
    getDiscoveredDevices: function(){
        //console.log(discoveredDevices)
        return discoveredDevices;
    }

}

module.exports = deviceManager;