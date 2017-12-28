"use strict";

const { ProtoMgr } = require('./lib/protomgr');
const { JarvisServ } = require('./lib/jarvis_serv');
const { PROTO_JARVISTASK } = require('./lib/protodef');
const { makeHostAddr } = require('./lib/util');

require('./lib/proto_task');

exports.ProtoMgr = ProtoMgr;
exports.JarvisServ = JarvisServ;

exports.PROTO_JARVISTASK = PROTO_JARVISTASK;

exports.makeHostAddr = makeHostAddr;