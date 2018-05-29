"use strict";

const { ProtoMgr } = require('./lib/protomgr');
const { JarvisServ } = require('./lib/jarvis_serv');
const { JarvisNode } = require('./lib/jarvis_node');
const { PROTO_JARVISTASK, PROTO_JARVISNETCORE } = require('./lib/protodef');
const { makeHostAddr, log, initDailyRotateFileLog, setLogger, genPriKey } = require('./lib/util');

require('./lib/proto_task');
require('./lib/proto_netcore');

exports.ProtoMgr = ProtoMgr;
exports.JarvisServ = JarvisServ;
exports.JarvisNode = JarvisNode;

exports.PROTO_JARVISTASK = PROTO_JARVISTASK;
exports.PROTO_JARVISNETCORE = PROTO_JARVISNETCORE;

exports.makeHostAddr = makeHostAddr;
exports.log = log;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.setLogger = setLogger;
exports.genPriKey = genPriKey;