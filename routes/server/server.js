var express = require('express');
var router = express.Router();
var pjson = require('../../package.json');
var mqttClient = require('../../mqtt/mqttClient');
process.env["NODE_CONFIG_DIR"] = "~/.rfm/";
const merge = require('deepmerge')

router.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

/**
 * @swagger
 * /server/health:
 *   get:
 *     description: server system health
 *     tags: [RFM Server]
 *     responses:
 *       200:
 *         description: Returns the current health of the server and its subsystems.
 */
router.get('/health', function (req, res, next) {
    try {
        mqttConnected = mqttClient ? mqttClient.getConnectedStatus() : false;
        res.status(200);
        res.json({ "health": { "server": "up", "mqtt": mqttConnected ? "up" : "down" } });
    } catch (err) {
        RFMLogger.error(err)
        res.json({ "health": { "server": "up", "mqtt": mqttConnected ? "up" : "down", "influx": "down" } });
    }
})

/**
 * @swagger
 * /server/info:
 *   get:
 *     description: server system info
 *     tags: [RFM Server]
 *     responses:
 *       200:
 *         description: Returns the extended information about the server.
 */
router.get('/info', function (req, res, next) {
    var serverVersion = pjson.version;
    var nodeVersion = process.version;
    var processUid = process.pid;
    var processArch = process.arch;
    var processPlatfrom = process.platform;
    var processMem = process.memoryUsage();
    var processUptime = process.uptime();
    var serverInfo = {
        version: serverVersion,
        node: nodeVersion,
        pUid: processUid,
        arch: processArch,
        platform: processPlatfrom,
        mem: processMem,
        uptime: processUptime
    }
    res.status(200)
    res.json(serverInfo)
})

/**
 * @swagger
 * /server/config:
 *   get:
 *     description: server system config
 *     tags: [RFM Server]
 *     responses:
 *       200:
 *         description: Returns the RFM server's current config.
 */
router.get('/config', function (req, res, next) {
    res.status(200);
    res.json(RFMConfig.getRFMConfig())
})

/**
 * @swagger
 * /server/config:
 *   put:
 *     description: Update RFM server's system config
 *     tags: [RFM Server]
 *     responses:
 *       200:
 *         description: Returns success if the the RFM server's current config was updated correctly.
 */
router.put('/config', function (req, res, next) {
    var mergedConfig = merge(RFMConfig.getRFMConfig(), req.body);
    serverConfig.setRFMConfig(mergedConfig)
    res.status(200);
    res.json({ "result": "config updated" });
})



module.exports = router;