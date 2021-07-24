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
    }
  }, { sequelize, modelName: 'device' });
  Device.sync();
}

