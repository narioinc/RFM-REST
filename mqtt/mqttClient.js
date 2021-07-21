var mqtt = require('mqtt');
var client;

var mqttClient = {
    isMqttLogsEnabled: RFMConfig.getMqttConfig().logger.enabled,
    initClient: function () {
        if(this.isMqttLogsEnabled){
            process.env["DEBUG"] = process.env["DEBUG"] + ' mqttjs* '
        }
        if (!client) {
            var mqttConfig = RFMConfig.getMqttConfig();
            var mqttUrl = 'mqtt://' + mqttConfig.broker_url + ":" + mqttConfig.broker_port
            RFMLogger.info("connecting to " + mqttUrl)
            client = mqtt.connect(mqttUrl)
        }
        this.startListener();
    },

    getClient: function(){
        return client;
    },

    restartClient: function () {
        if (client) {
            client.reconnect();
        }
    },

    disconnectClient: function () {
        if (client) {
            client.close();
        }
    },

    getConnectedStatus: function () {
        if (client) {
            return client.connected;
        } else {
            return false;
        }
    },

    subscribeToTopic: function(topic, cb){
        if(client){
            if(topic){
                client.subscribe(topic, (err) => {cb(err)})
            }else{
                RFMLogger.error("please provide a topic")
            }
        }else{
            RFMLogger.error("mqtt client is not initialized")
        }
    },

    unsubscribeFromTopic: function(topic, cb){
        if(client){
            if(topic){
                client.unsubscribe(topic, cb(err))
            }else{
                RFMLogger.info("please provide a topic")
            }
        }else{
            RFMLogger.info("mqtt client is not initialized")
        }
    },

    startListener: function(){
        provision.listen();
    }

}

module.exports = mqttClient;