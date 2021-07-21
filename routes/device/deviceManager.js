var deviceDiscovery = require('./deviceDiscovery')
discoveredDevices = [];

var deviceManager = {
    initDeviceManager: function(){
        deviceDiscovery.discoverDevices(this);
    },
    serviceUp: function(device){
       RFMLogger.info(device)
    },
    serviceDown: function(device){
        RFMLogger.info(device)
    }
}



module.exports = deviceManager;