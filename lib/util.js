"use strict";

var winston = require('winston');

// default logger is only console
var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});

function log(level, msg) {
    logger.log(level, msg);
}

function initDailyRotateFileLog(path, level = 'level') {
    // let transport = new (winston.transports.DailyRotateFile)({
    //     filename: path,
    //     datePattern: 'yyyy-MM-dd.',
    //     prepend: true,
    //     level: level
    // });

    logger = winston.createLogger({
        level: level,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path })
        ]
    });
}

// obj is like logger.log(level, msg)
function setLogger(obj) {
    logger = obj;
}

function makeHostAddr(host, port) {
    return host + ':' + port;
}

exports.makeHostAddr = makeHostAddr;
exports.log = log;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.setLogger = setLogger;