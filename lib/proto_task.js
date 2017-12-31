"use strict";

const { ProtoMgr } = require('./protomgr');
const { PROTO_JARVISTASK } = require('./protodef');
const { makeHostAddr } = require('./util');

const PROTO_PATH = __dirname + '/../proto/task.proto';

const grpc = require('grpc');
const task_proto = grpc.load(PROTO_PATH).jarvistask;

function chgTaskState(call, callback) {
    callback(null, {isOK: true});
}

function taskLog(call, callback) {
    callback(null, {isOK: true});
}

ProtoMgr.singleton.regProto(PROTO_JARVISTASK, (grpcserv) => {
    grpcserv.addService(task_proto.JarvisTask.service, {
        chgTaskState: chgTaskState,
        taskLog: taskLog
    });
}, (cfg) => {
    return new task_proto.JarvisTask(makeHostAddr(cfg.host, cfg.port), grpc.credentials.createInsecure());
}, task_proto);