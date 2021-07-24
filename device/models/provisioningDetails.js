const { Sequelize, Model, DataTypes } = require('sequelize');
class DeviceProvisioingDetails extends Model { }

module.exports = (sequelize) => {
    RFMLogger.debug("Init Device Model")
    DeviceProvisioingDetails.init({
        deviceId: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        host: {
            allowNull: false,
            type: DataTypes.STRING
        },
        port: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: "8000"
        },
        enabled: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { sequelize, modelName: 'device' });
    Device.sync();
}
