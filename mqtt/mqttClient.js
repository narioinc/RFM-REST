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
            RFMLogger.info("Mqtt client connecting to " + mqttUrl)
            client = mqtt.connect(mqttUrl)
        }
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

    subscribeToTopic: function(topic){
        if(client){
            if(topic){
                client.subscribe(topic, (err) => {
                   if(err) RFMLogger.error("Error subscribing to mqtt topic")
                })
            }else{
                RFMLogger.error("Please provide a topic")
            }
        }else{
            RFMLogger.error("MQTT client is not initialized")
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
    }
}

module.exports = mqttClient;