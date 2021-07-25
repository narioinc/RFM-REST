const { Sequelize } = require('sequelize');
RFMLogger = require('../utils/logger');
Device = require('../device/models/device')

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  freezeTableName: true,
  logging: false, 
});

var RFMStorage = {
  initDatabase: function () {
    return new Promise((resolve, reject) => {
      sequelize.authenticate().then(data => {
        RFMLogger.info('Connection to the database has been established successfully.');
        this.syncAllModel();
        resolve("database initialised")
      }).catch(err => {
        RFMLogger.error('Unable to connect to the RFM database:', err);
        reject("error initializing database")
      });
    })
    
  },
  closeDatabase: function () {
    if (sequelize) {
      sequelize.close().then(data => {
        RFMLogger.info("closing the RFM database")
      }).catch(err => {
        RFMLogger.error("Error whiel closing the database connection")
      });

    }
  },
  syncAllModel: function () {
    if (sequelize) {
      Device(sequelize);
    }
  },
  getSQLInstance() {
    return sequelize;
  }
}

module.exports = RFMStorage;