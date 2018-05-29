"use strict";

const winston = require('winston');
const libbitcoincrypo = require('libbitcoincrypo');

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

const HEXSTR = '0123456789abcdef';

function outputUint8Arr(ui8arr) {
    let str = '';
    for (let i = 0; i < ui8arr.length; ++i) {
        let h = Math.floor(ui8arr[i] / 16);
        let l = ui8arr[i] % 16;
        str += HEXSTR[h];
        str += HEXSTR[l];
    }

    return str;
}

function genPriKey() {
    let prikey;
    do {
        // random buf
        let rarr = new Uint8Array(32);
        for (let i = 0; i < 32; ++i) {
            rarr[i] = Math.floor(Math.random() * 255);
        }
    
        // console.log(outputUint8Arr(rarr));
    
        // sha256 buf
        prikey = libbitcoincrypo.sha256(rarr);
        // console.log(outputUint8Arr(prikey));
    } while (!libbitcoincrypo.isValidPriKey(prikey));

    return outputUint8Arr(prikey);
}

exports.makeHostAddr = makeHostAddr;
exports.log = log;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.setLogger = setLogger;
exports.genPriKey = genPriKey;