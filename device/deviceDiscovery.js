const mdns = require('mdns');
var bonjour = require('bonjour')()
var serviceDiscoveryHandler;
var browser = bonjour.find({ type: 'http' })

var deviceDiscovery = {
    discoverDevices: function (discoverHandler) {
        serviceDiscoveryHandler = discoverHandler;
        browser.start()
    }
}

browser.on('up', service => {
    if (service.name == 'rfmagent') {
        serviceDiscoveryHandler.serviceUp(service);
    }
});
browser.on('down', service => {
    if(service.name == 'rfmagent'){
        serviceDiscoveryHandler.serviceDown(service)
    }
});

module.exports = deviceDiscovery