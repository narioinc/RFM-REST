const swaggerJsdoc = require('swagger-jsdoc');

const jsDocOptions = {
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        title: 'RFM API',
        version: '1.0.0',
        description: 'API documentation for the Raspberry-Pi Fleet Manager agent',
      },
      "tags": [
        {
          "name": "RFM Server",
          "description": "Everything about your RFM Agent's system"
        },
        {

          "name": "Device Provisioning",
          "description": "Device provisionign workflows including add, delete, modify and others"
        }
        
      ],
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/server/*.js', './routes/device/*.js'],
  };
  const specs = swaggerJsdoc(jsDocOptions);

  module.exports = specs