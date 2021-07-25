const { Sequelize, Model, DataTypes } = require('sequelize');
class Device extends Model { }

module.exports = (sequelize) => {
  RFMLogger.debug("Init Device Model")
  Device.init({
    deviceId: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    deviceName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deviceDesc: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    mqttHealth: {
      type: DataTypes.STRING,
      defaultValue: "disconnected"
    },
    agentHealth:{
      type: DataTypes.STRING,
      defaultValue: "disconnected"
    },
    host:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    port:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    }
  }, { sequelize, modelName: 'device' });
  Device.sync({ alter: true });
}

