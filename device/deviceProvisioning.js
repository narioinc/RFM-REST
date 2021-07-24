const axios = require('axios');
const deviceDiscovery = require('./deviceDiscovery');

var deviceProvisioning = {
    provisionDevice: function(device){

    },
    deprovisionDevice: function(device){

    },
    getDeviceServer: function(device){
        //TODO return by looking up the database for details
        return "http://127.0.0.1:8000"
    }

}

module.exports = deviceProvisioning;