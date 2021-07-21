pubSubConfig = require('./clientPubSub.json');

var mqttUtils = {
    getSubscriptionTopic: function(topic){
        if(topic){
            //TODO
            //get deviceid after it is provisioned
            deviceId = "xxx";
            var subscriptionTopic = pubSubConfig.subscribe[topic];
            subscriptionTopic = subscriptionTopic.replace("{deviceid}", deviceId)
            return subscriptionTopic;
        }else{
            RFMLogger.error("please provide a valid topic")
            return null;
        }
    }
}

module.exports = mqttUtils;